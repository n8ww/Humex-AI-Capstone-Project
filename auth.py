import streamlit as st
import strings as txt

def login_page():
    st.markdown(f"<h2 style='text-align: center;'>{txt.get('LOGIN_HEADER')}</h2>", unsafe_allow_html=True)
    _, col, _ = st.columns([1, 2, 1])
    with col:
        with st.form("login_form"):
            username = st.text_input(txt.get("AUTH_USER"))
            password = st.text_input(txt.get("AUTH_PASS"), type="password")
            submit = st.form_submit_button(txt.get("AUTH_BTN"), use_container_width=True)

            if submit:
                if username == "admin" and password == "1234":
                    st.session_state["logged_in"] = True
                    st.success(txt.get("AUTH_SUCCESS"))
                    st.rerun()
                else:
                    st.error(txt.get("AUTH_ERROR"))

def check_authentication():
    if "logged_in" not in st.session_state:
        st.session_state["logged_in"] = False
    if not st.session_state["logged_in"]:
        login_page()
        st.stop()
        return False
    return True