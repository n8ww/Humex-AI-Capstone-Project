import streamlit as st
import pandas as pd
from datetime import datetime
from storage import get_all_logs, get_daily_summaries, save_daily_summary
import strings as txt

def show():
    st.title(txt.get("REPORTS_TITLE"))

    st.subheader(txt.get("HISTORY_HEADER"))
    summary_df = get_daily_summaries()

    if not summary_df.empty:
        st.dataframe(summary_df.sort_values(by=summary_df.columns[0], ascending=False), use_container_width=True)

        if st.button(txt.get("BTN_UPDATE_HISTORY")):
            total_in = st.session_state.get('total_in', 0)
            max_cap = st.session_state.get('cfg_max_cap', 20)
            current_occupancy = max(0, total_in - st.session_state.get('total_out', 0))
            occ_rate = (current_occupancy / max_cap) * 100
            save_daily_summary(total_in, occ_rate, "Active")
            st.success(txt.get("MSG_HISTORY_UPDATED"))
    else:
        st.info(txt.get("NO_HISTORY"))

    st.divider()

    st.subheader(txt.get("DETAILS_HEADER"))
    df = get_all_logs()

    if not df.empty:
        st.sidebar.download_button(
            txt.get("BTN_EXPORT"),
            df.to_csv().encode('utf-8'),
            'report.csv',
            'text/csv'
        )

        selected_date = st.date_input(txt.get("FILTER_DATE"), datetime.now())
        df['DateObj'] = pd.to_datetime(df['Date']).dt.date
        df_filtered = df[df['DateObj'] == selected_date]

        if not df_filtered.empty:
            st.dataframe(df_filtered.sort_values(by='Time', ascending=False), use_container_width=True)
        else:
            st.warning(txt.get("NO_DETAILS_DATE"))
    else:
        st.info(txt.get("NO_DATA"))