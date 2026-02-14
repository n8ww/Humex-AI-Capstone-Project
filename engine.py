from ultralytics import YOLO
import cv2

class DetectionEngine:
    def __init__(self):
        # تحميل الموديل بدقة s (Small) لضمان دقة رصد أعلى
        try:
            self.model = YOLO('models/yolov8s.pt')
        except:
            # في حال عدم وجود مجلد models، سيتم تحميله في المجلد الرئيسي
            self.model = YOLO('yolov8s.pt')
        self.tracker = {}

    def run_inference(self, frame, conf=0.5):
        """
        تشغيل الرصد والتتبع:
        persist=True: للحفاظ على رقم التعريف (ID) لكل شخص.
        classes=0: لرصد الأشخاص فقط وتجاهل باقي الأجسام.
        tracker="botsort.yaml": أقوى خوارزمية لربط المسارات.
        """
        results = self.model.track(
            frame,
            persist=True,
            classes=0,
            verbose=False,
            conf=conf,
            tracker="botsort.yaml"
        )
        return results

    def clean_old_ids(self, current_ids):
        """تنظيف الذاكرة من الـ IDs التي غادرت الكادر"""
        all_tracked_ids = list(self.tracker.keys())
        for p_id in all_tracked_ids:
            if p_id not in current_ids:
                del self.tracker[p_id]