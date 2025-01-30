// تعریف type برای مقادیر ذخیره شده
type StoredValue = string | number | boolean | object | null;

// این فایل برای مدیریت state های موقت استفاده میشه
export const tempDB = {
  data: new Map<string, StoredValue>(),
  set: (key: string, value: StoredValue) => tempDB.data.set(key, value),
  get: (key: string) => tempDB.data.get(key),
  delete: (key: string) => tempDB.data.delete(key),
  clear: () => tempDB.data.clear(),
};

export default tempDB;
