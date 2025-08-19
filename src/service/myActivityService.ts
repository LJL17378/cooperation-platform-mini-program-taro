// TODO: 替换为实际API请求
export const fetchMyActivities = async (params: any) => {
  // 模拟API请求
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: {
          list: [
            {
              activity_id: 1,
              title: "2023年度技术交流会",
              coverURL: "https://www.wetools.com/imgplaceholder/800x240",
              activity_address: "北京国家会议中心",
              classify_name: "人工智能",
              activity_date: "2023-10-15 至 2023-10-17"
            },
            {
              activity_id: 2,
              title: "前端开发工作坊",
              coverURL: "https://www.wetools.com/imgplaceholder/800x240",
              activity_address: "上海科技馆",
              classify_name: "React与Taro开发",
              activity_date: "2023-08-20 至 2023-08-22"
            },
            {
              activity_id: 3,
              title: "社区环保宣传活动",
              coverURL: "https://www.wetools.com/imgplaceholder/800x240",
              activity_address: "社区中心广场",
              classify_name: "环保",
              activity_date: "2023-07-10"
            }
          ],
        },
      });
    }, 800);
  });
};