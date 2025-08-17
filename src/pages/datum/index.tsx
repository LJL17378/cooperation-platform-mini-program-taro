import Taro, { useLoad, useRouter } from "@tarojs/taro";
import { View, ScrollView, Image } from "@tarojs/components";
import { useState, useEffect, useRef } from "react";
import { DropdownMenu, Switch, Notify, Checkbox } from "@taroify/core";
import "@taroify/core/dropdown-menu/style";
import "@taroify/core/switch/style";
import "@taroify/core/notify/style";
import "@taroify/core/checkbox/style";

import NavigationBar from "../../components/navigationbar/NavigationBar";
import CustomTabBar from "../../customer-tab-bar/index";
import DatumItem from "../../components/Datum/Datum";
import { useScrollAreaHeight } from "../../hooks/useScrollAreaHeight";
import { fetchTimeLines, fetchDatums } from "../../service/datumService";

import datumTitle from "../../image/培训资料.png";
import placeholderIcon from "../../image/虚位以待.png";
import "./index.scss";

export default function DatumPage() {
  const scrollHeight = useScrollAreaHeight();
  const router = useRouter();
  const searchText = router.params?.searchText || "";
  const plateId = Number(router.params?.id || 0);
  
  const [isEnd, setIsEnd] = useState(false);
  const [page, setPage] = useState(1);
  const [isSort, setIsSort] = useState(true); // 按时间排序
  const [timeLines, setTimeLines] = useState<any[]>([]);
  const [datums, setDatums] = useState<any[]>([]);
  const [selectedTimeLineIds, setSelectedTimeLineIds] = useState<number[]>([-1]);
  const [loading, setLoading] = useState(true);
  
  const timeLinesBeforeRef = useRef<any[]>([]);

  // 初始化数据
  const initData = async () => {
    setLoading(true);
    try {
      // 获取时间线
      const timeLinesRes: any = await fetchTimeLines();
      if (timeLinesRes.code === 200) {
        const timeLinesData = timeLinesRes.data.map(item => ({
          ...item,
          choosed: item.id === -1
        }));
        setTimeLines(timeLinesData);
        timeLinesBeforeRef.current = [...timeLinesData];
        setSelectedTimeLineIds([-1]);
      }

      // 加载资料数据
      await loadDatums();
    } catch (error) {
      Notify.open({ color: "danger", message: "数据加载失败" });
    } finally {
      setLoading(false);
    }
  };

  // 加载资料数据
  const loadDatums = async (isLoadMore = false) => {
    try {
      const params = {
        projectId: -1, // 固定值
        period: selectedTimeLineIds,
        sectionId: plateId,
        page: isLoadMore ? page + 1 : 1,
        num: 4,
        searchText,
        positiveOrder: isSort,
      };
      
      const res: any = await fetchDatums(params);
      if (res.code === 200) {
        if (isLoadMore) {
          setDatums(prev => [...prev, ...res.data.list]);
          setPage(prev => prev + 1);
          setIsEnd(res.data.list.length < 4);
        } else {
          setDatums(res.data.list);
          setPage(1);
          setIsEnd(res.data.list.length < 4);
        }
      }
    } catch (error) {
      Notify.open({ color: "danger", message: "加载数据失败" });
    }
  };

  // 切换时间线
  const handleTimeLineChange = (index) => {
    const newTimeLines = [...timeLines];
    
    if (index === 0) {
      // 处理"不限"选项
      if (!newTimeLines[0].choosed) {
        newTimeLines[0].choosed = true;
        newTimeLines.slice(1).forEach(item => item.choosed = false);
      }
    } else {
      newTimeLines[index].choosed = !newTimeLines[index].choosed;
      newTimeLines[0].choosed = false;
    }
    
    setTimeLines(newTimeLines);
    
    // 更新选中的时间线ID
    const selectedIds = newTimeLines
      .filter(item => item.choosed)
      .map(item => item.id);
    
    setSelectedTimeLineIds(selectedIds);
  };

  // 时间线关闭时触发数据刷新
  const handleTimeLineClose = () => {
    // 检查时间线是否有变化
    const hasChanged = JSON.stringify(timeLines) !== JSON.stringify(timeLinesBeforeRef.current);
    
    if (hasChanged) {
      timeLinesBeforeRef.current = [...timeLines];
      loadDatums();
    }
  };

  // 切换排序方式
  const handleSortChange = (checked: boolean) => {
    setIsSort(checked);
  };

  // 跳转到资料详情
  const toDatumContent = (id) => {
    Taro.navigateTo({
      url: `/pages/datumContent/index?id=${id}`,
    });
  };

  // 上拉加载更多
  const handleReachBottom = () => {
    if (!isEnd) {
      loadDatums(true);
    }
  };

  useLoad(() => {
    initData();
  });

  useEffect(() => {
    if (selectedTimeLineIds.length > 0) {
      loadDatums();
    }
  }, [selectedTimeLineIds, isSort]);

  return (
    <>
      <NavigationBar
        isBack
        search
        type="培训资料"
        plateId={plateId.toString()}
        value={searchText}
        onSearch={(value) => console.log("Search value:", value)}
      />

      <View className="scroll-container">
        <ScrollView
          className="datum-scroll"
          style={{ height: `${scrollHeight}px` }}
          scrollY
          onScrollToLower={handleReachBottom}
        >
          <View className="datum-page">
            <View className="datum-page__header">
              <Image 
                src={datumTitle} 
                className="datum-page__title-img"
                mode="heightFix"
              />

              <View className="datum-page__filter-group">
                <Checkbox
                  className="datum-page__checkbox"
                  checked={isSort}
                  onChange={handleSortChange}
                >
                  <View className="datum-page__sort-text">按时间排序</View>
                </Checkbox>

                <DropdownMenu className="datum-page__dropdown">
                  <DropdownMenu.Item 
                    title="时间线"
                    onClosed={handleTimeLineClose}
                  >
                    <View className="datum-page__timeline-options">
                      {timeLines.map((item, index) => (
                        <View 
                          key={item.id} 
                          className="datum-page__timeline-option"
                        >
                          <View className="datum-page__timeline-label">
                            {item.classifyName}
                          </View>
                          <Switch
                            checked={item.choosed}
                            size="16px"
                            onChange={() => handleTimeLineChange(index)}
                          />
                        </View>
                      ))}
                    </View>
                  </DropdownMenu.Item>
                </DropdownMenu>
              </View>
            </View>

            {loading ? (
              <View className="datum-page__loading">加载中...</View>
            ) : (
              <>
                <View className="datum-page__list">
                  {datums.map((item) => (
                    <DatumItem
                      key={item.id}
                      cover={item.coverURL}
                      title={item.title}
                      theme={item.introduction}
                      onClick={() => toDatumContent(item.id)}
                    />
                  ))}
                </View>

                {isEnd && datums.length > 0 && (
                  <View className="datum-page__end">
                    到底啦~
                  </View>
                )}

                {datums.length === 0 && !isEnd && (
                  <View className="datum-page__empty">
                    <Image 
                      src={placeholderIcon} 
                      className="datum-page__empty-img"
                    />
                    <View className="datum-page__empty-text">
                      暂无资料数据
                    </View>
                  </View>
                )}
              </>
            )}
          </View>
        </ScrollView>
      </View>

      <CustomTabBar />
      <Notify id="notify" />
    </>
  );
}