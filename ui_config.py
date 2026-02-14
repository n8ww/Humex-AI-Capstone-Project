import streamlit as st

def apply_ui():
    st.markdown("""
    <style>
    /* تغيير خلفية الموقع */
    .stApp {
        background-color: #0e1117;
        color: #ffffff;
    }
    
    /* تنسيق الحاويات (Cards) */
    div[data-testid="stMetric"] {
        background-color: #161b22;
        border: 1px solid #30363d;
        border-radius: 15px;
        padding: 15px;
       
        transition: transform 0.3s;
        
        /* اخفاء أي حاوية بلوك تظهر بعد حاوية البث الحية لمنع التراكم */
    div[data-testid="stVerticalBlock"] > div:nth-child(n+10) {
        display: none !important;
    }
    div[data-testid="stMetric"]:hover {
        transform: translateY(-5px);
        border-color: #58a6ff;
    }

    /* تنسيق الأزرار */
    .stButton>button {
        width: 100%;
        border-radius: 8px;
        background-color: #238636;
        color: white;
        border: none;
    }

    /* تنسيق خط العد والفيديو */
    img {
        border-radius: 15px;
        border: 2px solid #30363d;
    }

    /* إخفاء القوائم غير الضرورية */
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    </style>
    """, unsafe_allow_html=True)