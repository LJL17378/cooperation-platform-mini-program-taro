import Taro from "@tarojs/taro";
// TODO: 网络请求部分需要替换为实际API
export interface SearchResult {
  id: string;
  title: string;
  type: string;
  // 可根据实际需求扩展字段
}

// 模拟搜索API
export const searchApi = async (keyword: string, type: string): Promise<SearchResult[]> => {
  // TODO: 替换为实际API调用
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '1', title: `${type}结果1: ${keyword}`, type },
        { id: '2', title: `${type}结果2: ${keyword}`, type },
        { id: '3', title: `${type}结果3: ${keyword}`, type },
      ]);
    }, 500);
  });
};

// 获取搜索历史
export const getSearchHistory = (): string[] => {
  try {
    return Taro.getStorageSync('history') || [];
  } catch (error) {
    console.error('获取搜索历史失败:', error);
    return [];
  }
};

// 保存搜索历史
export const saveSearchHistory = (history: string[]): boolean => {
  try {
    Taro.setStorageSync('history', history);
    return true;
  } catch (error) {
    console.error('保存搜索历史失败:', error);
    return false;
  }
};

// 清空搜索历史
export const clearSearchHistory = (): boolean => {
  try {
    Taro.setStorageSync('history', []);
    return true;
  } catch (error) {
    console.error('清空搜索历史失败:', error);
    return false;
  }
};