import streamlit as st
import cv2
import time
import strings as txt
import os

def show(system):
    # --- 1. إعدادات السايدبار (Sidebar Settings) ---
    if 'num_cams_val' not in st.session_state:
        st.session_state.num_cams_val = len(system.configs) if system.configs else 1

    # مفتاح القاموس: NUM_CAMS
    num_cams = st.sidebar.number_input(txt.get("NUM_CAMS"), 1, 10, key='num_cams_val')
    system.cleanup_unused_cameras(num_cams)

    for i in range(num_cams):
        saved = system.configs.get(i, {})
        d_name = saved.get('name', f"Cam {i+1}")

        # مفتاح القاموس: CAM_EXPANDER
        with st.sidebar.expander(f"{txt.get('CAM_EXPANDER')} {i+1} - {d_name}", expanded=(i==0)):
            # مفتاح القاموس: NAME
            name = st.text_input(txt.get("NAME"), value=d_name, key=f"n_{i}")
            saved_src = saved.get('source', 0)

            # مفتاح القاموس: SOURCE
            src_type = st.selectbox(txt.get("SOURCE"), ["Webcam", "URL/RTSP", "File"],
                                    index=1 if isinstance(saved_src, str) and "http" in saved_src else 0,
                                    key=f"t_{i}")

            if src_type == "Webcam":
                # مفتاح القاموس: CAM_ID
                source = int(st.number_input(txt.get("CAM_ID"), 0, 10, value=int(saved_src) if isinstance(saved_src, int) else 0, key=f"v_{i}"))
            elif src_type == "URL/RTSP":
                # مفتاح القاموس: URL
                source = st.text_input(txt.get("URL"), value=str(saved_src) if isinstance(saved_src, str) else "rtsp://", key=f"u_{i}")
            else:
                # مفتاح القاموس: FILE
                uploaded_file = st.file_uploader(txt.get("FILE"), type=['mp4', 'avi', 'mov', 'mkv'], key=f"up_{i}")
                if uploaded_file is not None:
                    temp_path = os.path.join(os.getcwd(), f"temp_vid_{i}.mp4")
                    with open(temp_path, "wb") as f: f.write(uploaded_file.getbuffer())
                    source = temp_path
                else:
                    # مفتاح القاموس: MANUAL_FILE
                    source = st.text_input(txt.get("MANUAL_FILE"), value=str(saved_src) if saved_src != 0 else "video.mp4", key=f"f_path_{i}")

            # مفاتيح التحكم واللاين: HEIGHT, ANGLE, WIDTH, FLIP
            y_p = st.slider(txt.get("HEIGHT"), 0, 100, int(saved.get('y_perc', 0.5)*100), key=f"y_{i}")
            ang = st.slider(txt.get("ANGLE"), -180, 180, int(saved.get('angle', 0)), key=f"a_{i}")
            wid = st.slider(txt.get("WIDTH"), 10, 100, int(saved.get('width_perc', 0.8)*100), key=f"w_{i}")
            flip = st.checkbox(txt.get("FLIP"), value=saved.get('flip', False), key=f"f_{i}")

            system.update_config(i, {
                "name": name, "source": source,
                "y_perc": y_p / 100.0, "angle": ang, "width_perc": wid / 100.0,
                "flip": flip
            })

    # --- 2. 🚀 العرض المباشر المحسن (Optimized Live Display) ---
    if system.running:
        # مفتاح القاموس: LIVE_TITLE
        st.title(txt.get("LIVE_TITLE"))
        st.divider()

        img_placeholders = []
        info_placeholders = []

        if num_cams > 0:
            cols = st.columns(2)
            for i in range(num_cams):
                with cols[i % 2]:
                    st.markdown(f"**📍 {system.configs.get(i, {}).get('name', 'Camera')}**")
                    img_placeholders.append(st.empty())
                    info_placeholders.append(st.empty())

        while system.running:
            # التحقق من الصفحة الحالية باستخدام مفتاح القاموس: TAB_LIVE
            if st.session_state.get('current_page') != txt.get("TAB_LIVE"):
                break

            current_frames = system.frames.copy()

            for i in range(num_cams):
                cfg = system.configs.get(i)
                if not cfg: continue
                c_name = cfg.get('name')
                frame = current_frames.get(c_name)

                if frame is not None:
                    # ⚡ تحسين الأداء: تصغير الصورة للعرض فقط
                    display_frame = cv2.resize(frame, (640, 360))

                    # ✅ تعديل: استخدام width='stretch' بدل use_container_width للتوافق مع إصدار 2026
                    img_placeholders[i].image(cv2.cvtColor(display_frame, cv2.COLOR_BGR2RGB), width='stretch')

                    # تحديث الأرقام والعدادات (مفاتيح القاموس: IN, OUT)
                    stats = system.stats.get(c_name, {"in": 0, "out": 0})
                    info_placeholders[i].metric(
                        label=f"{c_name}",
                        value=f"{txt.get('IN')}: {stats['in']} | {txt.get('OUT')}: {stats['out']}"
                    )
                else:
                    # مفتاح القاموس: WAITING
                    img_placeholders[i].info(f"{txt.get('WAITING')} {c_name}...")

            time.sleep(0.03)
    else:
        # مفتاح القاموس: LIVE_TITLE, SYSTEM_OFF
        st.title(txt.get("LIVE_TITLE"))
        st.warning(txt.get("SYSTEM_OFF"))