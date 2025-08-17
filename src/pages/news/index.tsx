import Taro, { useLoad, useRouter } from "@tarojs/taro";
import { View, ScrollView, Image, Text } from "@tarojs/components";
import { useState, useEffect } from "react";
import { Switch, Notify } from "@taroify/core";
import "@taroify/core/switch/style";
import "@taroify/core/notify/style";

import NavigationBar from "../../components/navigationbar/NavigationBar";
import CustomTabBar from "../../customer-tab-bar/index";
import NewsItem from "../../components/News/News";
import { useScrollAreaHeight } from "../../hooks/useScrollAreaHeight";
import { fetchNews } from "../../service/newsService";

import newsTitle from "../../image/新闻公告.png";
import placeholderIcon from "../../image/虚位以待.png";

import "./index.scss";

export default function NewsPage() {
  const scrollHeight = useScrollAreaHeight();
  const router = useRouter();
  const searchText = router.params?.searchText || "";
  
  const [isEnd, setIsEnd] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedThemeIds, setSelectedThemeIds] = useState<number[]>([1, 2, 3]);
  
  // 主题筛选数据
  const [themes, setThemes] = useState([
    { id: 1, name: "社会服务", choosed: true },
    { id: 2, name: "献血", choosed: true },
    { id: 3, name: "会议", choosed: true },
  ]);

  // 初始化数据
  const initData = async () => {
    setLoading(true);
    try {
      await loadNews();
    } catch (error) {
      Notify.open({ color: "danger", message: "数据加载失败" });
    } finally {
      setLoading(false);
    }
  };

  // 加载新闻数据
  const loadNews = async (isLoadMore = false) => {
    try {
      const params = {
        themeIds: selectedThemeIds,
        page: isLoadMore ? page + 1 : 1,
        num: 10,
        keyword: searchText,
      };
      
      const res: any = await fetchNews(params);
      if (res.code === 200) {
        if (isLoadMore) {
          setNews(prev => [...prev, ...res.data.list]);
          setPage(prev => prev + 1);
          setIsEnd(res.data.list.length < 10);
        } else {
          setNews(res.data.list);
          setPage(1);
          setIsEnd(res.data.list.length < 10);
        }
      }
    } catch (error) {
      Notify.open({ color: "danger", message: "加载数据失败" });
    }
  };

  // 切换主题筛选
  const handleThemeChange = (index: number) => {
    const newThemes = [...themes];
    newThemes[index].choosed = !newThemes[index].choosed;
    setThemes(newThemes);
    
    // 更新选中的主题ID
    const selectedIds = newThemes
      .filter(item => item.choosed)
      .map(item => item.id);
    
    setSelectedThemeIds(selectedIds);
  };

  // 重置筛选条件
  const resetFilters = () => {
    const resetThemes = themes.map(t => ({ ...t, choosed: true }));
    setThemes(resetThemes);
    setSelectedThemeIds([1, 2, 3]);
  };

  // 应用筛选条件
  const applyFilters = () => {
    setIsFilterOpen(false);
    loadNews();
  };

  // 跳转到新闻详情
  const toNewsContent = (id: number) => {
    Taro.navigateTo({
      url: `/pages/achievementContent/index?id=${id}&type=news`,
    });
  };

  // 上拉加载更多
  const handleReachBottom = () => {
    if (!isEnd) {
      loadNews(true);
    }
  };

  useLoad(() => {
    initData();
  });

  useEffect(() => {
    if (selectedThemeIds.length > 0) {
      loadNews();
    }
  }, [selectedThemeIds]);

  return (
    <>
      <NavigationBar
        isBack
        search
        type="新闻公告"
        value={searchText}
        onSearch={(value) => console.log("Search value:", value)}
      />

        <ScrollView
          className="news-scroll"
          style={{ height: `${scrollHeight}px` }}
          scrollY
          onScrollToLower={handleReachBottom}
        >
          <View className="news-page">
            <View className="news-page__header">
              <Image 
                src={newsTitle} 
                className="news-page__title-img"
                mode="heightFix"
              />

              <View 
                className="news-page__filter-button"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Text className="news-page__filter-text">筛选</Text>
              </View>
            </View>

            {/* 筛选面板 */}
            {isFilterOpen && (
              <View className="news-page__filter-panel">
                <View className="news-page__filter-title">主题筛选</View>
                <View className="news-page__theme-options">
                  {themes.map((item, index) => (
                    <View 
                      key={item.id} 
                      className="news-page__theme-option"
                    >
                      <View className="news-page__theme-label">
                        {item.name}
                      </View>
                      <Switch
                        checked={item.choosed}
                        size="16px"
                        onChange={() => handleThemeChange(index)}
                      />
                    </View>
                  ))}
                </View>
                <View className="news-page__filter-actions">
                  <View 
                    className="news-page__filter-reset"
                    onClick={resetFilters}
                  >
                    重置
                  </View>
                  <View 
                    className="news-page__filter-confirm"
                    onClick={applyFilters}
                  >
                    确定
                  </View>
                </View>
              </View>
            )}

            {loading ? (
              <View className="news-page__loading">加载中...</View>
            ) : (
              <>
                <View className="news-page__list">
                  {news.map((item) => (
                    <NewsItem
                      key={item.id}
                      title={item.title}
                      content={item.introduction}
                      cover={item.coverURL}
                      onClick={() => toNewsContent(item.id)}
                    />
                  ))}
                </View>

                {isEnd && news.length > 0 && (
                  <View className="news-page__end">
                    到底啦~
                  </View>
                )}

                {news.length === 0 && !isEnd && (
                  <View className="news-page__empty">
                    <Image 
                      src={placeholderIcon} 
                      className="news-page__empty-img"
                    />
                    <View className="news-page__empty-text">
                      暂无新闻数据
                    </View>
                  </View>
                )}
              </>
            )}
          </View>
        </ScrollView>

      <CustomTabBar />
      <Notify id="notify" />
    </>
  );
}