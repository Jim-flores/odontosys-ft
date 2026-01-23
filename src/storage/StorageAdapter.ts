class StorageAdapter {
  static getItem(key: string): string | null {
    try {
      const value = localStorage.getItem(key);
      return value ? value : null;
    } catch (error) {
      console.error(`Error getting item ${key}:`, error);
      return null;
    }
  }

  static setItem(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error setting item ${key}:`, error);
      throw new Error(`Error setting item ${key} ${value}`);
    }
  }

  static removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item ${key}:`, error);
      throw new Error(`Error removing item ${key}`);
    }
  }
}

export default StorageAdapter;
