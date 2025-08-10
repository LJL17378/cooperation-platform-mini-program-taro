import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { tourist, user } from '../utils/tabBarUrl';

interface TabItem {
  pagePath: string;
  text: string;
  iconPath: string;
  selectedIconPath: string;
}

const CustomTabBar: React.FC = () => {
  const [selected, setSelected] = useState<number>(0);
  const [list, setList] = useState<TabItem[]>([]);
  const [color] = useState<string>('#7A7E83');
  const [selectedColor] = useState<string>('#3cc51f');

  // 检查用户身份并设置对应的tabbar列表
  const checkRole = () => {
    const token = Taro.getStorageSync('token');
    if (token && token !== '') {
      setList(user);
    } else {
      setList(tourist);
    }
  };

  // 获取tabbar高度并存储
  const getTabBarHeight = () => {
    setTimeout(() => {
      const query = Taro.createSelectorQuery();
      query
        .select('.custom-tab-bar')
        .boundingClientRect((rect: any) => {
          if (rect) {
            console.log('获取tabBar元素的高度', rect.height);
            Taro.setStorageSync('tabBarHeight', rect.height);
          }
        })
        .exec();
    }, 100);
  };

  // 更新选中状态
  const updateSelected = () => {
    const pages = Taro.getCurrentPages();
    if (pages.length > 0) {
      const currentPage = pages[pages.length - 1];
      const route = currentPage?.route || '';
      
      // 处理分包路径：移除 "packages/" 前缀
      const normalizedRoute = route.replace(/^packages\//, '');
      const currentPath = `/${normalizedRoute}`;
      
      const index = list.findIndex(item => 
        item.pagePath === currentPath || 
        item.pagePath.includes(currentPath)
      );
      
      if (index !== -1) {
        setSelected(index);
      }
    }
  };

  // tab切换处理 - 仅负责跳转
  const switchTab = (item: TabItem) => {
    Taro.switchTab({ url: item.pagePath });
  };

  // 组件挂载时执行
  useEffect(() => {
    checkRole();
    getTabBarHeight();
  }, []);

  // 当list更新后，更新选中状态
  useEffect(() => {
    if (list.length > 0) {
      updateSelected();
    }
  }, [list]);

  // 监听路由变化事件，确保状态同步
  useEffect(() => {
    const handleRouteChange = () => {
      if (list.length > 0) {
        updateSelected();
      }
    };

    // 同时监听常规路由变化和Tab切换事件
    Taro.eventCenter.on('__taroRouterChange', handleRouteChange);
    Taro.eventCenter.on('__taroSwitchTab', handleRouteChange);
    
    return () => {
      Taro.eventCenter.off('__taroRouterChange', handleRouteChange);
      Taro.eventCenter.off('__taroSwitchTab', handleRouteChange);
    };
  }, [list]);

  return (
    <View className="custom-tab-bar">
      <View className="tab-bar-border" />
      {list.map((item, index) => (
        <View
          key={index}
          className="tab-bar-item"
          onClick={() => switchTab(item)}
        >
          <Image
            src={selected === index ? item.selectedIconPath : item.iconPath}
            className="tab-icon"
          />
          <View
            className="tab-text"
            style={{ color: selected === index ? selectedColor : color }}
          >
            {item.text}
          </View>
          {selected === index && <View className="tab-indicator" />}
        </View>
      ))}
    </View>
  );
};

export default CustomTabBar;