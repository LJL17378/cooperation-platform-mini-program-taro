// TODO: 替换为真实API请求
export const fetchSwiperItems = async () => {
  // 模拟轮播图数据
  return Promise.resolve([
    { id: 1, title: '2023年度技术峰会', coverURL: 'https://www.wetools.com/imgplaceholder/800x240' },
    { id: 2, title: '开源项目获奖', coverURL: 'https://www.wetools.com/imgplaceholder/800x240' },
    { id: 3, title: '新产品发布', coverURL: 'https://www.wetools.com/imgplaceholder/800x240' },
  ]);
};

export const fetchActivities = async () => {
  // 模拟活动数据
  return Promise.resolve([
    {
      id: 1,
      title: '2023年度技术交流会',
      activity_address: '北京国家会议中心',
      projectName: '人工智能',
      activity_date: '2023-10-15 至 2023-10-17',
      coverURL: 'https://www.wetools.com/imgplaceholder/800x240',
      ongoing: true,
    },
    {
      id: 2,
      title: '前端开发工作坊',
      activity_address: '上海科技馆',
      projectName: 'React与Taro开发',
      activity_date: '2023-08-20 至 2023-08-22',
      coverURL: 'https://www.wetools.com/imgplaceholder/800x240',
      ongoing: false,
    },
  ]);
};

export const fetchNews = async () => {
  // 模拟新闻数据
  return Promise.resolve([
    {
      id: 1,
      title: '2023年度技术峰会圆满结束',
      introduction: '本次峰会邀请了多位行业专家分享前沿技术，吸引了超过500名开发者参与。',
      launch_time: '2023-10-05',
      coverURL: 'https://www.wetools.com/imgplaceholder/800x240',
    },
    {
      id: 2,
      title: '新产品发布会即将举行',
      introduction: '我们将在下个月推出全新产品线，敬请期待。发布会将在公司官网同步直播。',
      launch_time: '2023-09-20',
      coverURL: 'https://www.wetools.com/imgplaceholder/800x240',
    },
  ]);
};