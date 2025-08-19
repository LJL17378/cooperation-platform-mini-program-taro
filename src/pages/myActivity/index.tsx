import Taro, { useLoad, useRouter } from "@tarojs/taro";
import { View, ScrollView, Image } from "@tarojs/components";
import { useState, useEffect } from "react";
import { Notify } from "@taroify/core";
import "@taroify/core/notify/style";

import NavigationBar from "../../components/navigationbar/NavigationBar";
import CustomTabBar from "../../customer-tab-bar/index";
import Activity from "../../components/Activity/Activity";
import { useScrollAreaHeight } from "../../hooks/useScrollAreaHeight";
import { fetchMyActivities } from "../../service/myActivityService";

import myActivityIcon from "../../image/我的活动.png";
import placeholderIcon from "../../image/虚位以待.png";
import "./index.scss";

export default function MyActivityPage() {
  const scrollHeight = useScrollAreaHeight();
  const router = useRouter();
  const plateId = Number(router.params?.id || 0);
  
  const [isEnd, setIsEnd] = useState(false);
  const [page, setPage] = useState(1);
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 加载活动数据
  const loadActivities = async (isLoadMore = false) => {
    try {
      const params = {
        page: isLoadMore ? page + 1 : 1,
        num: 10,
      };
      
      const res: any = await fetchMyActivities(params);
      if (res.code === 200) {
        if (isLoadMore) {
          setActivities(prev => [...prev, ...res.data.list]);
          setPage(prev => prev + 1);
          setIsEnd(res.data.list.length < 10);
        } else {
          setActivities(res.data.list);
          setPage(1);
          setIsEnd(res.data.list.length < 10);
        }
      }
    } catch (error) {
      Notify.open({ color: "danger", message: "加载数据失败" });
    }
  };

  // 检查内容高度，如果不足则加载更多
  const checkContentHeight = async () => {
    if (loading || isEnd) return;
    
    try {
      const query = Taro.createSelectorQuery();
      query.select('#content').boundingClientRect();
      query.exec((res) => {
        if (res && res[0]) {
          const rect = res[0];
          if (rect.height < scrollHeight) {
            loadActivities(true);
          }
        }
      });
    } catch (error) {
      console.error('检查内容高度失败:', error);
    }
  };

  // 跳转到活动详情
  const toActivityContent = (id: number) => {
    Taro.navigateTo({
      url: `/pages/activityContent/index?id=${id}`,
    });
  };

  // 上拉加载更多
  const handleReachBottom = () => {
    if (!isEnd) {
      loadActivities(true);
    }
  };

  useLoad(() => {
    loadActivities();
  });

  useEffect(() => {
    if (activities.length > 0) {
      setTimeout(() => {
        checkContentHeight();
      }, 300);
    }
  }, [activities]);

  return (
    <>
      <NavigationBar
        isBack
        search={false}
        jump={false}
        onSearch={(value) => console.log('Search value:', value)}
      />

      <View className="scroll-container">
        <ScrollView
          className="my-activity-scroll"
          style={{ height: `${scrollHeight}px` }}
          scrollY
          onScrollToLower={handleReachBottom}
        >
          <View id="content" className="my-activity-page">
            <View className="my-activity-page__header">
              <Image 
                src={myActivityIcon} 
                className="my-activity-page__title-img"
                mode="heightFix"
              />
            </View>

            <View className="my-activity-page__list">
              {activities.map((item) => (
                <Activity
                  key={item.activity_id}
                  state={true}
                  cover={item.coverURL}
                  title={item.title}
                  location={item.activity_address}
                  theme={item.classify_name}
                  timeLine={item.activity_date}
                  onClick={() => toActivityContent(item.activity_id)}
                />
              ))}
            </View>

            {isEnd && activities.length > 0 && (
              <View className="my-activity-page__end">
                到底啦~
              </View>
            )}

            {activities.length === 0 && !loading && (
              <View className="my-activity-page__empty">
                <Image 
                  src={placeholderIcon} 
                  className="my-activity-page__empty-img"
                />
                <View className="my-activity-page__empty-text">
                  暂无活动数据
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </View>

      <CustomTabBar />
      <Notify id="notify" />
    </>
  );
}