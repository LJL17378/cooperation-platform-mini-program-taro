import { ScrollView, View, Swiper, SwiperItem, Image } from '@tarojs/components';
import Taro, { useLoad } from '@tarojs/taro';
import { useState, useEffect } from 'react';
import './index.scss';
import NavigationBar from '../../components/navigationbar/NavigationBar';
import CustomTabBar from '../../customer-tab-bar/index';
import { useScrollAreaHeight } from '../../hooks/useScrollAreaHeight';
import { Divider } from '@taroify/core';
import '@taroify/core/divider/style';

// 导入自定义组件
import Achievement from '../../components/Achievement/Achievement';
import Activity from '../../components/Activity/Activity';
import News from '../../components/News/News';

// 导入图片
import achievementIcon from '../../image/历史成就.png';
import activityIcon from '../../image/活动申请.png';
import newsIcon from '../../image/新闻公告.png';
import rightArrowIcon from '../../image/右_右.svg';
import placeholderIcon from '../../image/虚位以待.png';

// 导入服务
import { fetchSwiperItems, fetchActivities, fetchNews } from '../../service/functionService';

export default function FunctionPage() {
  const scrollHeight = useScrollAreaHeight();
  const [swiperItems, setSwiperItems] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);

  useLoad(() => {
    loadData();
  });

  const loadData = async () => {
    try {
      const [swiperRes, activitiesRes, newsRes] = await Promise.all([
        fetchSwiperItems(),
        fetchActivities(),
        fetchNews(),
      ]);
      setSwiperItems(swiperRes);
      setActivities(activitiesRes);
      setNews(newsRes);
    } catch (error) {
      console.error('数据加载失败', error);
    }
  };

  const navigateTo = (url: string) => {
    Taro.navigateTo({ url });
  };

  const navigateToAchievementContent = (id: number) => {
    navigateTo(`/pages/achievementContent/index?id=${id}&type=achievement`);
  };

  const navigateToActivityContent = (id: number) => {
    navigateTo(`/pages/activityContent/index?id=${id}`);
  };

  const navigateToNewsContent = (id: number) => {
    navigateTo(`/pages/achievementContent/index?id=${id}&type=news`);
  };

  return (
    <>
      <NavigationBar
        search={false}
        isBack={false}
        jump={false}
        onSearch={(value) => console.log('Search value:', value)}
      />

      <ScrollView
        className="function-page__scrollview"
        style={{ height: `${scrollHeight}px` }}
        scrollY
        onScrollToLower={() => console.log('触底了')}
      >
        <View className="function-page__container">
          {/* 历史成就 - 轮播图 */}
          <View className="function-page__section">
            <View className="function-page__title-group">
              <Image src={achievementIcon} className="function-page__title-icon" mode="heightFix" />
              <View 
                className="function-page__more" 
                onClick={() => navigateTo('/pages/plate/index?type=历史成就')}
              >
                <View className="function-page__more-text">查看更多</View>
                <Image src={rightArrowIcon} className="function-page__more-icon" mode="heightFix" />
              </View>
            </View>
            
            <Swiper
              className="function-page__swiper"
              autoplay
              circular
              duration={1000}
            >
              {swiperItems.map((item) => (
                <SwiperItem 
                  key={item.id}
                  className="function-page__swiper-item"
                  onClick={() => navigateToAchievementContent(item.id)}
                >
                  <View className="function-page__swiper-item-inner">
                  <Image
                    src={item.coverURL}
                    mode="aspectFill"
                    className="function-page__swiper-image"
                  />
                </View>
                </SwiperItem>
              ))}
            </Swiper>
          </View>

          {/* 活动申请 - 使用Activity组件 */}
          <View className="function-page__section">
            <View className="function-page__title-group">
              <Image src={activityIcon} className="function-page__title-icon" mode="heightFix" />
              <View 
                className="function-page__more" 
                onClick={() => navigateTo('/pages/plate/index?type=活动申请')}
              >
                <View className="function-page__more-text">查看更多</View>
                <Image src={rightArrowIcon} className="function-page__more-icon" mode="heightFix" />
              </View>
            </View>
            
            {activities.length === 0 ? (
              <View className="function-page__empty">
                <Image src={placeholderIcon} className="function-page__empty-icon" />
                <View className="function-page__empty-text">暂无活动数据</View>
              </View>
            ) : (
              activities.map((item) => (
                <View 
                  key={item.id}
                  onClick={() => navigateToActivityContent(item.id)}
                >
                  <Activity
                    state={item.ongoing} // 使用自定义组件
                    cover={item.coverURL}
                    title={item.title}
                    location={item.activity_address}
                    theme={item.projectName}
                    timeLine={item.activity_date}
                  />
                  <Divider className="function-page__divider" />
                </View>
              ))
            )}
          </View>

          {/* 新闻公告 - 使用News组件 */}
          <View className="function-page__section">
            <View className="function-page__title-group">
              <Image src={newsIcon} className="function-page__title-icon" mode="heightFix" />
              <View 
                className="function-page__more" 
                onClick={() => navigateTo('/pages/news/index')}
              >
                <View className="function-page__more-text">查看更多</View>
                <Image src={rightArrowIcon} className="function-page__more-icon" mode="heightFix" />
              </View>
            </View>
            
            {news.length === 0 ? (
              <View className="function-page__empty">
                <Image src={placeholderIcon} className="function-page__empty-icon" />
                <View className="function-page__empty-text">暂无新闻数据</View>
              </View>
            ) : (
              news.map((item) => (
                <View 
                  key={item.id}
                  className="function-page__news-item"
                  onClick={() => navigateToNewsContent(item.id)}
                >
                  <News
                    title={item.title} // 使用自定义组件
                    content={item.introduction}
                    cover={item.coverURL}
                  />
                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView>
      <CustomTabBar />
    </>
  );
}