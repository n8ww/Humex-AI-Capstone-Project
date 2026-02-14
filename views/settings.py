import streamlit as st
import strings as txt

def show():
    st.title(txt.get("SET_TITLE"))
    st.subheader(txt.get("SET_PARAMS"))

    # إعداد الطاقة الاستيعابية القصوى
    new_cap = st.number_input(txt.get("SET_CAP"), value=st.session_state.get('cfg_max_cap', 20))
    st.session_state.cfg_max_cap = new_cap

    # إعداد مستوى الثقة للرصد (Confidence Level)
    new_conf = st.slider(txt.get("SET_CONF"), 0.1, 1.0, st.session_state.get('cfg_conf_level', 0.5))
    st.session_state.cfg_conf_level = new_conf

    st.divider()
    # تم حذف قسم "منطقة الخطر" وزر التصفير نهائياً بناءً على طلبك