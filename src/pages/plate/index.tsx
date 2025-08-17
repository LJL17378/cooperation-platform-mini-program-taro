import { ScrollView, View, Image } from '@tarojs/components';
import Taro, { useLoad, useRouter } from '@tarojs/taro';
import { useState, useEffect } from 'react';
import NavigationBar from '../../components/navigationbar/NavigationBar';
import CustomTabBar from '../../customer-tab-bar/index';
import { useScrollAreaHeight } from '../../hooks/useScrollAreaHeight';
import { fetchPlates } from '../../service/plateService';
import historyAchievement from '../../image/历史成就.png';
import activityApply from '../../image/活动申请.png';
import trainingData from '../../image/培训资料.png';
import placeholderIcon from '../../image/虚位以待.png';
import './index.scss';

export default function PlatePage() {
  const scrollHeight = useScrollAreaHeight();
  const router = useRouter();
  const [type, setType] = useState('');
  const [plates, setPlates] = useState<PlateItem[]>([]);
  const [loading, setLoading] = useState(true);

  useLoad(() => {
    const { type: routeType } = router.params;
    setType(routeType || '');
    loadPlates(routeType);
  });

  const loadPlates = async (plateType: string) => {
    try {
      setLoading(true);
      const data = await fetchPlates(plateType);
      setPlates(data);
    } catch (error) {
      Taro.showToast({ title: '数据加载失败', icon: 'none' });
      console.error('加载板块数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = (id: number) => {
    let url = '';
    switch (type) {
      case '历史成就':
        url = '/pages/achievement/index';
        break;
      case '活动申请':
        url = '/pages/activity/index';
        break;
      case '培训资料':
        url = '/pages/datum/index';
        break;
      default:
        return;
    }
    Taro.navigateTo({ url: `${url}?id=${id}` });
  };

  const getTitleImage = () => {
    switch (type) {
      case '历史成就':
        return historyAchievement;
      case '活动申请':
        return activityApply;
      case '培训资料':
        return trainingData;
      default:
        return placeholderIcon;
    }
  };

  return (
    <>
      <NavigationBar
        isBack={true}
        search={false}
        jump={false}
        onSearch={() => { }}
      />

      <ScrollView
        scrollY
        className="plate-page__scrollview"
        style={{ height: `${scrollHeight}px` }}
      >
        <View className="plate-page__container">
          <View className="plate-page__title-group">
            <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
            <Image
              src={getTitleImage()}
              className="plate-page__title-image"
              mode="heightFix"
            />
          </View>


          {loading ? (
            <View className="plate-page__loading">加载中...</View>
          ) : plates.length > 0 ? (
            plates.map((item) => (
              <Image
                key={item.id}
                src={item.coverURL || placeholderIcon}
                className="plate-page__image"
                mode="widthFix"
                onClick={() => handleNavigate(item.id)}
              />
            ))
          ) : (
            <View className="plate-page__empty">
              <Image
                src={placeholderIcon}
                className="plate-page__empty-icon"
                mode="aspectFit"
              />
              <View className="plate-page__empty-text">暂无数据</View>
            </View>
          )}
        </View>
      </View>
    </ScrollView >

      <CustomTabBar />
    </>
  );
}

// 定义PlateItem类型
type PlateItem = {
  id: number;
  coverURL: string;
  title?: string;
};