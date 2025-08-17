// TODO: 替换为真实API请求
export type PlateItem = {
  id: number;
  coverURL: string;
  title?: string;
};

export const fetchPlates = async (type: string): Promise<PlateItem[]> => {
  // 模拟网络请求延迟
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // TODO: 实际API地址为 "/tang-org/classify/section/all"
  // 这里直接返回模拟数据
  return [
    { id: 1, coverURL: 'https://www.wetools.com/imgplaceholder/800x600' },
    { id: 2, coverURL: 'https://www.wetools.com/imgplaceholder/800x600' },
    { id: 3, coverURL: 'https://www.wetools.com/imgplaceholder/800x600' },
  ];
};