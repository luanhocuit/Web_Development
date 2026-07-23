import admin from 'firebase-admin';
import { createRequire } from 'module';

// Thiết lập require để đọc file JSON trong môi trường ES Modules
const require = createRequire(import.meta.url);

// Đọc file khóa bí mật (Thấy trong hình bạn để file .json ở thư mục gốc backend)
const serviceAccount = require('../web-register-55260-firebase-adminsdk-fbsvc-448441837d.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export const auth = admin.auth();
export const db = admin.firestore();