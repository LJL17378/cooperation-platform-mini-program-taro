import { View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.scss'
import NavigationBar from '../../components/navigationbar/NavigationBar'
import CustomTabBar from '../../customer-tab-bar/index'
import Achievement from '../../components/Achievement/Achievement'
import Activity from '../../components/Activity/Activity'
import Datum from '../../components/Datum/Datum'
import News from '../../components/News/News'

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <>
      <NavigationBar
        search={false}
        isBack={false}
        jump={false}
        onSearch={(value) => console.log('Search value:', value)} />
      <View className='page-container'>
        <Achievement
          cover="https://www.wetools.com/imgplaceholder/800x240"
          title="Achievement Title"
          time="2023-10-01" />
        <Activity
          state={true}
          cover="https://www.wetools.com/imgplaceholder/800x240"
          title="2023年度技术交流会"
          location="北京国家会议中心"
          theme="人工智能"
          timeLine="2023-10-15 至 2023-10-17"
        />
        <Activity
          state={false}
          cover="https://www.wetools.com/imgplaceholder/800x240"
          title="前端开发工作坊"
          location="上海科技馆"
          theme="React与Taro开发"
          timeLine="2023-08-20 至 2023-08-22"
        />
        <View className='datums'>
          <Datum
            cover="https://www.wetools.com/imgplaceholder/800x240"
            title="2023年度技术报告"
            theme="人工智能与机器学习"
          />

          <Datum
            cover="https://www.wetools.com/imgplaceholder/800x240"
            title="前端开发最佳实践"
            theme="React与Taro框架"
          />

          <Datum
            cover="https://www.wetools.com/imgplaceholder/800x240"
            title="企业数字化转型指南"
            theme="云计算与大数据"
          />
        </View>
        <View className="news-list">
      <News
        title="2023年度技术峰会圆满结束"
        content="本次峰会邀请了多位行业专家分享前沿技术，吸引了超过500名开发者参与。"
        cover="https://www.wetools.com/imgplaceholder/800x240"
      />
      
      <News
        title="新产品发布会即将举行"
        content="我们将在下个月推出全新产品线，敬请期待。发布会将在公司官网同步直播。"
        cover="https://www.wetools.com/imgplaceholder/800x240"
      />
      
      <News
        title="开源项目获得社区贡献奖"
        content="感谢所有贡献者，我们的开源项目获得了年度最佳社区贡献奖。"
        cover="https://www.wetools.com/imgplaceholder/800x240"
      />
    </View>
      </View>
      <CustomTabBar />
    </>
  )
}
