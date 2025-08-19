export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/aboutMe/index',
    'pages/function/index',
    'pages/login/index',
    'pages/editInfo/index',
    'pages/plate/index',
    'pages/achievement/index',
    'pages/datum/index',
    'pages/news/index',
    'pages/activity/index',
    'pages/myActivity/index',
    'pages/searchPage/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    // navigationBarBackgroundColor: '#fff',
    // navigationBarTitleText: 'WeChat',
    // navigationBarTextStyle: 'black',
    navigationStyle: 'custom'
  },
  tabBar: {
    custom: true,
    color: '#7A7E83',
    selectedColor: '#3cc51f',
    backgroundColor: '#fff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '主页',
        iconPath: 'image/主页.png',
        selectedIconPath: 'image/主页-选中.png'
      },
      {
        pagePath: 'pages/function/index',
        text: '功能',
        iconPath: 'image/功能.png',
        selectedIconPath: 'image/功能-选中.png'
      },
      {
        pagePath: 'pages/aboutMe/index',
        text: '我的',
        iconPath: 'image/我的.png',
        selectedIconPath: 'image/我的-选中.png'
      }
    ]
  }
})
