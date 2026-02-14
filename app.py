import streamlit as st
import threading
import time
import cv2
import math
import numpy as np
from datetime import datetime
import strings as txt
from ui_config import apply_ui
from storage import init_storage, add_entry
from auth import check_authentication
from views import live_feed, dashboard, reports, settings
from engine import DetectionEngine
import logging
# إيقاف تنبيهات ستريم ليت الخاصة بالخيوط (Threads)
logging.getLogger("streamlit.runtime.scriptrunner_utils").setLevel(logging.ERROR)
logging.getLogger("streamlit.runtime.scriptrunner").setLevel(logging.ERROR)
# إعداد الصفحة
st.set_page_config(page_title="Crowd Analytics", layout="wide")
apply_ui()
init_storage()

# 1. تهيئة اللغة أول شيء في الكود
if 'language' not in st.session_state:
    st.session_state.language = 'ar'

# 2. دالة تحديث اللغة (عشان التغيير يصير فوري)
def update_language():
    # نأخذ القيمة من الراديو ونحدث المتغير الرئيسي
    sel = st.session_state.lang_radio_selection
    st.session_state.language = 'ar' if sel == "العربية" else 'en'

@st.cache_resource
class SystemCore:
    def __init__(self):
        self.engine = DetectionEngine()
        self.running = False
        self.configs = {}
        self.caps = {}
        self.frames = {}
        self.stats = {}
        self.camera_threads = {}
        self.frame_counts = {}
        self.lock = threading.Lock()

    def cleanup_unused_cameras(self, active_count):
        with self.lock:
            existing_indices = list(self.caps.keys())
            for idx in existing_indices:
                if idx >= active_count:
                    if self.caps[idx] is not None: self.caps[idx].release()
                    del self.caps[idx]
                    if idx in self.configs: del self.configs[idx]
                    keys_to_remove = [k for k in self.frames.keys() if f"Cam {idx}" in k]
                    for k in keys_to_remove:
                        if k in self.frames: del self.frames[k]
                        if k in self.stats: del self.stats[k]

    def update_config(self, index, config):
        with self.lock:
            old_config = self.configs.get(index)
            new_name = config.get('name', f"Cam {index}")
            if old_config:
                old_name = old_config.get('name')
                if old_name != new_name:
                    if old_name in self.stats: self.stats[new_name] = self.stats.pop(old_name)
                    if old_name in self.frames: del self.frames[old_name]
                    if old_name in self.frame_counts: self.frame_counts[new_name] = self.frame_counts.pop(old_name)
                if old_config['source'] != config['source']:
                    if index in self.caps:
                        self.caps[index].release()
                        del self.caps[index]
            self.configs[index] = config
            if new_name not in self.stats: self.stats[new_name] = {"in": 0, "out": 0}
            if new_name not in self.frame_counts: self.frame_counts[new_name] = 0

    def camera_worker(self, idx):
        while self.running:
            cfg = self.configs.get(idx)
            if not cfg: break
            cam_name = cfg.get('name', f"Cam {idx}")
            cap = self.caps.get(idx)

            if cap is None or not cap.isOpened():
                try:
                    cap = cv2.VideoCapture(cfg['source'])
                    cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)
                    self.caps[idx] = cap
                except:
                    time.sleep(2)
                    continue

            ret, frame = cap.read()
            if not ret or frame is None:
                time.sleep(0.1)
                continue

            # حسابات الخط والاتجاه
            h, w, _ = frame.shape
            center_y, center_x = int(cfg["y_perc"] * h), w // 2
            angle_rad = math.radians(cfg["angle"])
            line_len = cfg["width_perc"] * w

            x1 = int(center_x - (line_len / 2) * math.cos(angle_rad))
            y1 = int(center_y - (line_len / 2) * math.sin(angle_rad))
            x2 = int(center_x + (line_len / 2) * math.cos(angle_rad))
            y2 = int(center_y + (line_len / 2) * math.sin(angle_rad))

            flip = cfg.get('flip', False)
            arrow_offset = 40 if not flip else -40
            perp_angle = angle_rad + (math.pi / 2)
            arrow_end = (int(center_x + arrow_offset * math.cos(perp_angle)),
                         int(center_y + arrow_offset * math.sin(perp_angle)))

            self.frame_counts[cam_name] += 1
            if self.frame_counts[cam_name] % 2 == 0:
                try:
                    results = self.engine.run_inference(frame)
                    if results[0].boxes.id is not None:
                        boxes = results[0].boxes.xyxy.cpu().numpy()
                        ids = results[0].boxes.id.int().cpu().tolist()
                        for box, p_id in zip(boxes, ids):
                            cx, cy = int((box[0] + box[2]) / 2), int((box[1] + box[3]) / 2)
                            current_pos = (cy - y1) * (x2 - x1) - (cx - x1) * (y2 - y1)
                            with self.lock:
                                if p_id not in self.engine.tracker:
                                    self.engine.tracker[p_id] = current_pos
                                else:
                                    prev_pos = self.engine.tracker[p_id]
                                    if prev_pos < 0 <= current_pos:
                                        act = "IN" if not flip else "OUT"
                                        self.stats[cam_name][act.lower()] += 1
                                        add_entry(f"{cam_name}_{act}")
                                    elif prev_pos > 0 >= current_pos:
                                        act = "OUT" if not flip else "IN"
                                        self.stats[cam_name][act.lower()] += 1
                                        add_entry(f"{cam_name}_{act}")
                                    self.engine.tracker[p_id] = current_pos
                except: pass

            # الرسم والنصوص
            cv2.line(frame, (x1, y1), (x2, y2), (0, 255, 255), 3)
            cv2.arrowedLine(frame, (center_x, center_y), arrow_end, (0, 255, 0), 3, tipLength=0.5)
            # استخدام txt.get لترجمة النص اللي فوق الفيديو
            cv2.putText(frame, txt.get("ENTRY_SIDE"), (arrow_end[0]-20, arrow_end[1]-10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

            self.frames[cam_name] = frame
            time.sleep(0.01)

    def run_loop(self):
        while True:
            if not self.running:
                with self.lock:
                    for cap in self.caps.values():
                        if cap is not None: cap.release()
                    self.caps = {}
                    self.frames = {}
                    self.camera_threads = {}
                time.sleep(1)
                continue
            active_indices = list(self.configs.keys())
            for idx in active_indices:
                if idx not in self.camera_threads or not self.camera_threads[idx].is_alive():
                    t = threading.Thread(target=self.camera_worker, args=(idx,), daemon=True)
                    t.start()
                    self.camera_threads[idx] = t
            time.sleep(1)

system = SystemCore()
if not any(t.name == "CoreLoop" for t in threading.enumerate()):
    threading.Thread(target=system.run_loop, name="CoreLoop", daemon=True).start()

if check_authentication():
    # 🔥🔥🔥 منطقة تغيير اللغة (بداية السايدبار) 🔥🔥🔥
    st.sidebar.markdown(f"### 🌐 {txt.get('LANG_SELECT')}")

    # نحدد القيمة الحالية عشان نعرضها في الزر
    current_index = 0 if st.session_state.language == 'ar' else 1

    # زر الراديو مع Callback
    st.sidebar.radio(
        "Language",
        options=["العربية", "English"],
        index=current_index,
        key="lang_radio_selection", # مفتاح خاص للودجت
        on_change=update_language,  # استدعاء الدالة فور التغيير
        label_visibility="collapsed"
    )

    st.sidebar.divider()

    # باقي السايدبار
    st.sidebar.title(txt.get("SIDEBAR_HEADER"))
    run_toggle = st.sidebar.toggle(txt.get("RUN_SYSTEM"), value=system.running)
    if run_toggle != system.running:
        system.running = run_toggle
        st.rerun()

    st.session_state.cam_stats = system.stats
    st.sidebar.markdown("---")

    if 'current_page' not in st.session_state:
        st.session_state.current_page = txt.get("TAB_LIVE")

    # القائمة
    menu_map = {
        txt.get("TAB_LIVE"): "live",
        txt.get("TAB_DASHBOARD"): "dash",
        txt.get("TAB_REPORTS"): "report",
        txt.get("TAB_SETTINGS"): "settings"
    }

    # حيلة بسيطة: إذا كانت الصفحة المختارة حالياً غير موجودة في القائمة الجديدة (بسبب تغيير اللغة)، نرجع للأولى
    current_selection = st.session_state.current_page
    index_to_use = 0
    if current_selection in list(menu_map.keys()):
        index_to_use = list(menu_map.keys()).index(current_selection)

    selected_label = st.sidebar.radio(txt.get("MENU_LABEL"), list(menu_map.keys()), index=index_to_use)
    st.session_state.current_page = selected_label # تحديث الصفحة الحالية

    # العرض الرئيسي
    main_display = st.empty()
    with main_display.container():
        if menu_map[selected_label] == "live":
            live_feed.show(system)
        elif menu_map[selected_label] == "dash":
            dashboard.show()
        elif menu_map[selected_label] == "report":
            reports.show()
        elif menu_map[selected_label] == "settings":
            settings.show()