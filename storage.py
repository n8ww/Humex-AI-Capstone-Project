import pandas as pd
import os
from datetime import datetime

LOG_DIR = "logs"
LOG_FILE = f"{LOG_DIR}/history.csv"
SUMMARY_FILE = f"{LOG_DIR}/daily_summary.csv"

def init_storage():
    if not os.path.exists(LOG_DIR): os.makedirs(LOG_DIR)

def add_entry(direction):
    now = datetime.now()
    data = [[now.strftime("%Y-%m-%d"), now.strftime("%H:%M:%S"), direction]]
    df = pd.DataFrame(data, columns=['Date', 'Time', 'Action'])
    df.to_csv(LOG_FILE, mode='a', header=not os.path.exists(LOG_FILE), index=False)

def get_all_logs():
    return pd.read_csv(LOG_FILE) if os.path.exists(LOG_FILE) else pd.DataFrame()

def save_daily_summary(total_in, occupancy_rate, avg_stay):
    today = datetime.now().strftime("%Y-%m-%d")
    summary_data = {'تاريخ اليوم': [today], 'إجمالي الزوار': [total_in], 'أعلى نسبة إشغال': [f"{int(occupancy_rate)}%"], 'متوسط البقاء التقديري': [avg_stay]}
    new_df = pd.DataFrame(summary_data)
    if os.path.exists(SUMMARY_FILE):
        existing_df = pd.read_csv(SUMMARY_FILE)
        if today in existing_df['تاريخ اليوم'].values:
            existing_df.loc[existing_df['تاريخ اليوم'] == today, ['إجمالي الزوار', 'أعلى نسبة إشغال', 'متوسط البقاء التقديري']] = [total_in, f"{int(occupancy_rate)}%", avg_stay]
            existing_df.to_csv(SUMMARY_FILE, index=False)
        else:
            new_df.to_csv(SUMMARY_FILE, mode='a', header=False, index=False)
    else:
        new_df.to_csv(SUMMARY_FILE, index=False)

def get_daily_summaries():
    return pd.read_csv(SUMMARY_FILE) if os.path.exists(SUMMARY_FILE) else pd.DataFrame()