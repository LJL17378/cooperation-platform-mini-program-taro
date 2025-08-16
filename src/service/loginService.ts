// TODO: 替换为真实API端点
const MOCK_API = 'https://mockapi.com/login'

// 用户数据类型
interface UserData {
  token: string;
  user: {
    authority: string;
    phoneAccount: string;
    gender: string;
    qqAccount: string;
    realName: string;
    sid: string;
    uid: string;
    registerDate: string;
    avatar: string;
    avatarUrl: string;
    orgName: string;
  };
}

// 响应类型
interface ApiResponse {
  code: number;
  message: string;
  data: UserData;
}

// TODO: 替换为真实登录实现
export const login = async (credentials: { sid: string; password: string }): Promise<ApiResponse> => {
  // 模拟网络请求
  return new Promise((resolve) => {
    setTimeout(() => {
      // 模拟成功响应
      if (credentials.sid && credentials.password) {
        resolve({
          code: 200,
          message: '登录成功',
          data: {
            token: 'mock-token-123456',
            user: {
              authority: 'user',
              phoneAccount: '13800138000',
              gender: 'male',
              qqAccount: '123456789',
              realName: '张三',
              sid: credentials.sid,
              uid: 'mock-uid-001',
              registerDate: '2023-01-01',
              avatar: '',
              avatarUrl: 'https://via.placeholder.com/100/00794C/FFFFFF?text=Avatar',
              orgName: '计算机科学与技术学院'
            }
          }
        })
      } else {
        // 模拟失败响应
        resolve({
          code: 400,
          message: '学号或密码不能为空',
          data: null
        })
      }
    }, 800)
  })
}