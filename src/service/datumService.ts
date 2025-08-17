// TODO: 替换为实际API请求
export const fetchTimeLines = async () => {
  // 模拟获取时间线数据
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: [
          { id: -1, classifyName: "不限", classifyRank: -1 },
          { id: 1, classifyName: "2024暑假", classifyRank: 0 },
          { id: 2, classifyName: "2024春季学期", classifyRank: 1 },
          { id: 3, classifyName: "2024寒假", classifyRank: 2 },
        ],
      });
    }, 500);
  });
};

// TODO: 替换为实际API请求
export const fetchDatums = async (params: any) => {
  // 模拟获取资料数据
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: {
          list: [
            {
              id: 1,
              title: "前端开发最佳实践",
              introduction: "React与Taro框架",
              coverURL: "https://www.wetools.com/imgplaceholder/800x240",
            },
            {
              id: 2,
              title: "企业数字化转型指南",
              introduction: "云计算与大数据",
              coverURL: "https://www.wetools.com/imgplaceholder/800x240",
            },
            {
              id: 3,
              title: "人工智能入门教程",
              introduction: "机器学习基础",
              coverURL: "https://www.wetools.com/imgplaceholder/800x240",
            },
            {
              id: 4,
              title: "项目管理方法论",
              introduction: "敏捷开发实践",
              coverURL: "https://www.wetools.com/imgplaceholder/800x240",
            },
          ],
        },
      });
    }, 800);
  });
};