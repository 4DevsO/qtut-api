import dotenv from 'dotenv';
dotenv.config();

const keys = {
  b4a_app_id: process.env.QTUT_B4A_APP_ID,
  b4a_js_key: process.env.QTUT_B4A_JAVASCRIPT_KEY,
  b4a_master_key: process.env.QTUT_B4A_MASTER_KEY,
  imgur_client_id: process.env.QTUT_IMGUR_CLIENT_ID
};

export default keys;
