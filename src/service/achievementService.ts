// TODO: 替换为实际API请求
export const fetchProjects = async (plateId: number) => {
  // 模拟API请求
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: {
          classificationList: [
            { id: 1, classifyName: "社区宣讲", classifyRank: 0 },
            { id: 2, classifyName: "青鸟计划", classifyRank: 1 },
            { id: 3, classifyName: "传统文化", classifyRank: 2 },
          ],
        },
      });
    }, 500);
  });
};

export const fetchTimeLines = async () => {
  // 模拟API请求
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

export const fetchAchievements = async (params: any) => {
  // 模拟API请求
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: {
          list: [
            {
              id: 1,
              title: "社区环保宣传活动",
              coverURL: "https://www.wetools.com/imgplaceholder/800x240",
              launchTime: "2023-10-01",
            },
            {
              id: 2,
              title: "传统文化传承项目",
              coverURL: "https://www.wetools.com/imgplaceholder/800x240",
              launchTime: "2023-09-15",
            },
          ],
        },
      });
    }, 800);
  });
};