import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from storage import get_all_logs
import strings as txt
from datetime import datetime

def calculate_average_stay(df):
    try:
        ins = df[df['Action'].str.contains('IN')]['DateTime']
        outs = df[df['Action'].str.contains('OUT')]['DateTime']
        if not ins.empty and not outs.empty:
            avg_stay = outs.mean() - ins.mean()
            minutes = abs(avg_stay.total_seconds() / 60)
            return f"{int(minutes)} min"
        return "--"
    except: return "--"

def show():
    st.title("📊 " + txt.get("DASH_TITLE"))

    df = get_all_logs()
    max_cap = st.session_state.get('cfg_max_cap', 20)

    if df.empty:
        st.info(txt.get("NO_DATA"))
        return

    df['DateTime'] = pd.to_datetime(df['Date'] + ' ' + df['Time'])
    today_date = datetime.now().strftime('%Y-%m-%d')
    df_today = df[df['Date'] == today_date].copy()

    total_in_today = len(df_today[df_today['Action'].str.contains('IN')])
    total_out_today = len(df_today[df_today['Action'].str.contains('OUT')])
    current_occupancy = max(0, total_in_today - total_out_today)
    occupancy_percent = (current_occupancy / max_cap) * 100
    avg_stay = calculate_average_stay(df_today)

    st.markdown(f"### {txt.get('SUMMARY_TITLE')}")
    k1, k2, k3, k4 = st.columns(4)
    k1.metric(txt.get("TOTAL_VISITORS"), total_in_today)
    k2.metric(txt.get("CURRENT_OCCUPANTS"), current_occupancy, delta=f"{int(occupancy_percent)}%")
    k3.metric(txt.get("OCCUPANCY_RATE"), f"{int(occupancy_percent)}%")
    k4.metric(txt.get("AVG_STAY"), avg_stay)

    if 'cam_stats' in st.session_state:
        st.divider()
        st.markdown(f"### {txt.get('LIVE_GATES')}")
        active_names = []
        for i in range(10):
            if f"n_{i}" in st.session_state: active_names.append(st.session_state[f"n_{i}"])
        display_list = active_names if active_names else list(st.session_state.cam_stats.keys())

        if display_list:
            cols = st.columns(len(display_list))
            for idx, name in enumerate(display_list):
                stats = st.session_state.cam_stats.get(name, {"in": 0, "out": 0})
                with cols[idx]:
                    st.markdown(f"""
                    <div style="background-color: #262730; padding: 20px; border-radius: 10px; border-top: 4px solid #00CC96;">
                        <p style="color: #808495; margin-bottom: 5px;">📍 {name}</p>
                        <h3 style="margin: 0; color: #00CC96;">📥 {stats['in']} <span style="font-size:0.6em">{txt.get('IN')}</span></h3>
                        <h4 style="margin: 0; color: #EF553B;">📤 {stats['out']} <span style="font-size:0.6em">{txt.get('OUT')}</span></h4>
                    </div>
                    """, unsafe_allow_html=True)

    st.divider()
    col_main, col_side = st.columns([2, 1])

    with col_main:
        st.subheader(txt.get("FLOW_CHART"))
        df_today['Hour'] = df_today['DateTime'].dt.hour
        # ترجمة القيم داخل البيانات للرسم
        df_today['DisplayAction'] = df_today['Action'].apply(lambda x: txt.get('IN') if 'IN' in x else txt.get('OUT'))

        hourly_data = df_today.groupby(['Hour', 'DisplayAction']).size().unstack(fill_value=0).reset_index()

        if not hourly_data.empty:
            fig_area = px.area(hourly_data, x='Hour', y=[c for c in [txt.get('IN'), txt.get('OUT')] if c in hourly_data.columns],
                               color_discrete_map={txt.get('IN'): '#00CC96', txt.get('OUT'): '#EF553B'},
                               template="plotly_dark",
                               labels={'value': txt.get('AXIS_COUNT'), 'Hour': txt.get('AXIS_HOUR')})
            st.plotly_chart(fig_area, use_container_width=True)
        else:
            st.write(txt.get("NO_DATA"))

    with col_side:
        st.subheader(txt.get("GAUGE_CHART"))
        fig_gauge = go.Figure(go.Indicator(
            mode = "gauge+number", value = current_occupancy,
            gauge = {'axis': {'range': [None, max_cap]}, 'bar': {'color': "#3498db"},
                     'threshold': {'line': {'color': "red", 'width': 4}, 'value': max_cap}}))
        fig_gauge.update_layout(height=300, margin=dict(l=20, r=20, t=50, b=20))
        st.plotly_chart(fig_gauge, use_container_width=True)

    st.divider()
    c_left, c_right = st.columns(2)
    with c_left:
        st.subheader(txt.get("PEAK_CHART"))
        peak_df = df_today[df_today['Action'].str.contains('IN')].groupby('Hour').size().reset_index(name='counts')
        if not peak_df.empty:
            fig_bar = px.bar(peak_df, x='Hour', y='counts', color='counts', color_continuous_scale='Reds',
                             labels={'counts': txt.get('AXIS_COUNT'), 'Hour': txt.get('AXIS_HOUR')})
            st.plotly_chart(fig_bar, use_container_width=True)
    with c_right:
        st.subheader(txt.get("RECENT_LOGS"))
        display_df = df_today.sort_values(by='DateTime', ascending=False).head(10)[['Time', 'Action']]
        st.dataframe(display_df, use_container_width=True)

    if occupancy_percent >= 100: st.error(txt.get("DANGER").format(int(occupancy_percent)))
    elif occupancy_percent > 85: st.warning(txt.get("WARNING").format(int(occupancy_percent)))
    else: st.success(txt.get("NORMAL").format(int(occupancy_percent)))

    st.divider()
    st.header(txt.get("DETAILED_ANALYSIS"))
    if not df_today.empty:
        df_today['CamName'] = df_today['Action'].apply(lambda x: x.replace('_IN', '').replace('_OUT', ''))
        available_cams = sorted(df_today['CamName'].unique())
        col_sel, col_sp = st.columns([1, 2])
        with col_sel:
            selected_cam = st.selectbox(txt.get("SELECT_CAM"), available_cams, key="detailed_cam_sel")

        df_cam = df_today[df_today['CamName'] == selected_cam].copy()
        c_in = len(df_cam[df_cam['Action'].str.contains('IN')])
        c_out = len(df_cam[df_cam['Action'].str.contains('OUT')])

        st.subheader(f"{selected_cam}")
        m1, m2, m3 = st.columns(3)
        m1.metric(txt.get("CAM_IN"), c_in)
        m2.metric(txt.get("CAM_OUT"), c_out)
        m3.metric(txt.get("NET_MOVE"), c_in - c_out)

        df_cam['Hour'] = df_cam['DateTime'].dt.hour
        df_cam['Type'] = df_cam['Action'].apply(lambda x: txt.get('IN') if 'IN' in x else txt.get('OUT'))
        cam_hourly = df_cam.groupby(['Hour', 'Type']).size().unstack(fill_value=0).reset_index()

        if not cam_hourly.empty:
            fig_cam = px.bar(cam_hourly, x='Hour', y=[c for c in [txt.get('IN'), txt.get('OUT')] if c in cam_hourly.columns],
                             barmode='group', title=txt.get("CAM_ACTIVITY").format(selected_cam),
                             color_discrete_map={txt.get('IN'): '#00CC96', txt.get('OUT'): '#EF553B'},
                             template="plotly_dark",
                             labels={'value': txt.get('AXIS_COUNT'), 'Hour': txt.get('AXIS_HOUR')})
            st.plotly_chart(fig_cam, use_container_width=True)