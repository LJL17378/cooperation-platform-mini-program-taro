// TODO: 需要替换为真实API请求

// 用户活动数据接口
interface ActivityItem {
  activity_id: string;
  ongoing: boolean;
  coverURL: string;
  title: string;
  activity_address: string;
  classify_name: string;
  activity_date: string;
}

// 培训资料数据接口
interface DatumItem {
  id: string;
  coverURL: string;
  title: string;
  introduction: string;
}

// 用户信息接口
interface UserInfo {
  gender: 'MALE' | 'FEMALE' | 'UNKNOWN';
  uid: string;
  sid: string;
  realName: string;
  qqAccount: string;
  phoneAccount: string;
  avatarUrl: string;
}

// 模拟获取用户信息
export const getUserInfo = (): Promise<UserInfo> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        gender: 'MALE',
        uid: '123456',
        sid: '20230001',
        realName: '张三',
        qqAccount: '123456789',
        phoneAccount: '13800138000',
        avatarUrl: 'https://www.wetools.com/imgplaceholder/180x180',
      });
    }, 500);
  });
};

// 模拟获取用户活动
export const getUserActivities = (): Promise<ActivityItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          activity_id: '1',
          ongoing: true,
          coverURL: 'https://www.wetools.com/imgplaceholder/800x240',
          title: '2023年度技术交流会',
          activity_address: '北京国家会议中心',
          classify_name: '人工智能',
          activity_date: '2023-10-15 至 2023-10-17',
        },
        {
          activity_id: '2',
          ongoing: false,
          coverURL: 'https://www.wetools.com/imgplaceholder/800x240',
          title: '前端开发工作坊',
          activity_address: '上海科技馆',
          classify_name: 'React与Taro开发',
          activity_date: '2023-08-20 至 2023-08-22',
        },
      ]);
    }, 700);
  });
};

// 模拟获取培训资料
export const getDatums = (): Promise<DatumItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          coverURL: 'https://www.wetools.com/imgplaceholder/800x240',
          title: '2023年度技术报告',
          introduction: '人工智能与机器学习',
        },
        {
          id: '2',
          coverURL: 'https://www.wetools.com/imgplaceholder/800x240',
          title: '前端开发最佳实践前端开发最佳实践前端开发最佳实践前端开发最佳实践前端开发最佳实践',
          introduction: 'React与Taro框架',
        },
        {
          id: '3',
          coverURL: 'https://www.wetools.com/imgplaceholder/800x240',
          title: '企业数字化转型指南',
          introduction: '云计算与大数据',
        },
        {
          id: '4',
          coverURL: 'https://www.wetools.com/imgplaceholder/800x240',
          title: 'UI设计规范',
          introduction: '设计系统与组件库',
        },
      ]);
    }, 600);
  });
};