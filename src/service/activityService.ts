// TODO: 替换为实际API请求

// 获取项目列表
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

// 获取活动列表
export const fetchActivities = async (plateId: number, projectId?: number) => {
  // 模拟API请求 - 根据projectId过滤数据
  return new Promise((resolve) => {
    setTimeout(() => {
      // 所有活动的模拟数据
      const allActivities = [
        {
          projectId: 1,
          projectName: "社区宣讲",
          activityList: [
            {
              id: 1,
              title: "社区环保宣传活动",
              coverURL: "https://www.wetools.com/imgplaceholder/800x240",
              activity_address: "北京社区中心",
              activity_date: "2023-10-01 至 2023-10-03",
            },
            {
              id: 2,
              title: "健康生活讲座",
              coverURL: "https://www.wetools.com/imgplaceholder/800x240",
              activity_address: "上海科技馆",
              activity_date: "2023-09-15 至 2023-09-17",
            },
          ],
        },
        {
          projectId: 2,
          projectName: "青鸟计划",
          activityList: [
            {
              id: 3,
              title: "青年创业大赛",
              coverURL: "https://www.wetools.com/imgplaceholder/800x240",
              activity_address: "杭州创业园区",
              activity_date: "2023-11-01 至 2023-11-05",
            },
            {
              id: 4,
              title: "职业规划工作坊",
              coverURL: "https://www.wetools.com/imgplaceholder/800x240",
              activity_address: "广州青年中心",
              activity_date: "2023-08-10 至 2023-08-12",
            },
          ],
        },
        {
          projectId: 3,
          projectName: "传统文化",
          activityList: [
            {
              id: 5,
              title: "传统节日庆典",
              coverURL: "https://www.wetools.com/imgplaceholder/800x240",
              activity_address: "成都文化中心",
              activity_date: "2023-12-01 至 2023-12-03",
            },
            {
              id: 6,
              title: "书法艺术展览",
              coverURL: "https://www.wetools.com/imgplaceholder/800x240",
              activity_address: "西安博物馆",
              activity_date: "2023-07-15 至 2023-07-20",
            },
          ],
        },
      ];

      // 如果没有指定项目ID或项目ID为-1，返回所有活动
      if (!projectId || projectId === -1) {
        resolve({
          code: 200,
          data: allActivities,
        });
      } else {
        // 过滤指定项目的活动
        const filteredData = allActivities.filter(
          (project) => project.projectId === projectId
        );
        resolve({
          code: 200,
          data: filteredData,
        });
      }
    }, 800);
  });
};

// 搜索活动
export const searchActivities = async (params: any) => {
  // 模拟API请求 - 根据项目ID和关键词过滤
  return new Promise((resolve) => {
    setTimeout(() => {
      const { projectId, keyword } = params;
      
      // 所有活动的模拟数据
      const allActivities = [
        {
          id: 1,
          title: "社区环保宣传活动",
          coverURL: "https://www.wetools.com/imgplaceholder/800x240",
          activity_address: "北京社区中心",
          activity_date: "2023-10-01 至 2023-10-03",
          projectName: "社区宣讲",
        },
        {
          id: 2,
          title: "健康生活讲座",
          coverURL: "https://www.wetools.com/imgplaceholder/800x240",
          activity_address: "上海科技馆",
          activity_date: "2023-09-15 至 2023-09-17",
          projectName: "社区宣讲",
        },
        {
          id: 3,
          title: "青年创业大赛",
          coverURL: "https://www.wetools.com/imgplaceholder/800x240",
          activity_address: "杭州创业园区",
          activity_date: "2023-11-01 至 2023-11-05",
          projectName: "青鸟计划",
        },
        {
          id: 4,
          title: "职业规划工作坊",
          coverURL: "https://www.wetools.com/imgplaceholder/800x240",
          activity_address: "广州青年中心",
          activity_date: "2023-08-10 至 2023-08-12",
          projectName: "青鸟计划",
        },
        {
          id: 5,
          title: "传统节日庆典",
          coverURL: "https://www.wetools.com/imgplaceholder/800x240",
          activity_address: "成都文化中心",
          activity_date: "2023-12-01 至 2023-12-03",
          projectName: "传统文化",
        },
        {
          id: 6,
          title: "书法艺术展览",
          coverURL: "https://www.wetools.com/imgplaceholder/800x240",
          activity_address: "西安博物馆",
          activity_date: "2023-07-15 至 2023-07-20",
          projectName: "传统文化",
        },
      ];

      // 根据项目ID和关键词过滤
      let filteredActivities = allActivities;
      
      if (projectId && projectId !== -1) {
        filteredActivities = filteredActivities.filter(
          (activity) => {
            // 这里需要根据实际数据结构调整
            // 假设projectName是"社区宣讲"、"青鸟计划"、"传统文化"
            const projectNames = ["社区宣讲", "青鸟计划", "传统文化"];
            return activity.projectName === projectNames[projectId - 1];
          }
        );
      }
      
      if (keyword) {
        filteredActivities = filteredActivities.filter(
          (activity) => 
            activity.title.includes(keyword) || 
            activity.activity_address.includes(keyword)
        );
      }
      
      resolve({
        code: 200,
        data: {
          list: filteredActivities,
        },
      });
    }, 800);
  });
};