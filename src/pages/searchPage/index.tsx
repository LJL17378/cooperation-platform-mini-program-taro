import { ScrollView, View, Image } from '@tarojs/components';
import Taro, { useLoad } from '@tarojs/taro';
import { Divider, Notify } from '@taroify/core';
import { useState } from 'react';

import '@taroify/core/divider/style';
import '@taroify/core/notify/style';

import NavigationBar from '../../components/navigationbar/NavigationBar';
import CustomTabBar from '../../customer-tab-bar/index';
import { useScrollAreaHeight } from '../../hooks/useScrollAreaHeight';
import { clearSearchHistory, getSearchHistory, saveSearchHistory } from '../../service/searchPage';

import historyIcon from '../../image/history.png';
import './index.scss';

export default function SearchPage() {
  const scrollHeight = useScrollAreaHeight();
  const [searched, setSearched] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [pageType, setPageType] = useState('');
  const [pageId, setPageId] = useState('');

  useLoad((options) => {
    console.log('Search page loaded with options:', options);
    
    const historyData = getSearchHistory();
    setHistory(historyData);
    setPageType(options?.type || '');
    setPageId(options?.id || '');
  });

  const clearHistory = () => {
    if (clearSearchHistory()) {
      setHistory([]);
      Notify.open({ type: 'success', message: '已清空搜索历史' });
    } else {
      Notify.open({ type: 'danger', message: '清空搜索历史失败' });
    }
  };

  const handleSearch = (value: string) => {
    if (!value.trim()) return;
    
    // 更新搜索历史
    const newHistory = [value, ...history.filter(item => item !== value)].slice(0, 10);
    setHistory(newHistory);
    saveSearchHistory(newHistory);
    setSearched(true);
    
    // 根据类型跳转到不同页面
    let url = '';
    switch (pageType) {
      case '历史成就':
        url = '/pages/achievement/index';
        break;
      case '活动申请':
        url = '/pages/activity/index';
        break;
      case '培训资料':
        url = '/pages/datum/index';
        break;
      case '新闻公告':
        url = '/pages/news/index';
        break;
      default:
        // 默认跳转或处理未知类型
        return;
    }
    
    Taro.redirectTo({
      url: `${url}?id=${pageId}&searchText=${value}`
    });
  };

  const handleHistorySearch = (value: string) => {
    handleSearch(value);
  };

  return (
    <>
      <NavigationBar
        search={true}
        isBack={true}
        jump={false}
        onSearch={handleSearch}
      />
      <Notify id="notify" />
      
        <ScrollView
          style={{ height: `${scrollHeight}px` }}
          scrollY
          className="search-page__scrollview"
        >
          <View className="search-page__content">
            {!searched && (
              <View className="search-page__history">
                <View className="search-page__history-title">历史记录</View>
                <Divider className="search-page__divider" />
                
                {history.map((item, index) => (
                  <View key={index}>
                    <View 
                      className="search-page__history-item"
                      onClick={() => handleHistorySearch(item)}
                    >
                      <Image 
                        className="search-page__history-icon"
                        src={historyIcon} 
                        mode="aspectFill"
                      />
                      <View className="search-page__history-text">{item}</View>
                    </View>
                    <Divider className="search-page__divider" />
                  </View>
                ))}
                
                {history.length > 0 && (
                  <View 
                    className="search-page__clear-history"
                    onClick={clearHistory}
                  >
                    清空历史搜索记录
                  </View>
                )}
              </View>
            )}
          </View>
        </ScrollView>
      
      <CustomTabBar />
    </>
  );
}