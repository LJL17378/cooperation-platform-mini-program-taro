// 用户信息相关服务
// TODO: 网络请求部分需要替换为真实接口

/**
 * 用户信息接口
 */
export interface UserInfo {
  uid: number;
  sid: string;
  avatar: string;
  realName: string;
  gender: string;
  qqAccount: string;
  phoneAccount: string;
  authority: number;
  registerDate: string;
}

/**
 * API响应格式
 */
interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

/**
 * 错误处理
 */
const handleError = (error: any): never => {
  console.error('API Error:', error);
  throw new Error(error.message || '网络请求失败');
};

/**
 * 模拟请求延迟
 */
const simulateDelay = (ms: number) => 
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * 获取当前用户信息
 * TODO: 替换为真实API
 */
export const getCurrentUserInfo = async (): Promise<UserInfo> => {
  try {
    // 模拟API请求延迟
    await simulateDelay(500);
    
    // 模拟返回数据
    return {
      uid: 10001,
      sid: "2023123456",
      avatar: "",
      realName: "张三",
      gender: "UNKNOWN",
      qqAccount: "123456789",
      phoneAccount: "13800138000",
      authority: 3,
      registerDate: "2023-01-01"
    };
  } catch (error) {
    return handleError(error);
  }
};

/**
 * 更新用户信息
 * @param data 更新的用户数据
 * TODO: 替换为真实API
 */
export const updateUserInfo = async (data: {
  gender: string;
  qqAccount: string;
  phoneAccount: string;
}): Promise<ApiResponse<null>> => {
  try {
    // 模拟API请求延迟
    await simulateDelay(600);
    
    // 模拟返回数据
    return {
      code: 200,
      message: "修改成功",
      data: null
    };
  } catch (error) {
    return handleError(error);
  }
};

/**
 * 上传用户头像
 * @param filePath 图片本地路径
 * TODO: 替换为真实API
 */
export const uploadAvatar = async (filePath: string): Promise<ApiResponse<{ avatarUrl: string }>> => {
  try {
    // 模拟上传延迟
    await simulateDelay(800);
    
    // 模拟返回数据
    return {
      code: 200,
      message: "头像上传成功",
      data: {
        avatarUrl: "https://via.placeholder.com/150"
      }
    };
  } catch (error) {
    return handleError(error);
  }
};