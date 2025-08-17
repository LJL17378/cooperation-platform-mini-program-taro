import Taro, { useLoad, useRouter } from "@tarojs/taro";
import { View, ScrollView, Image } from "@tarojs/components";
import { useState, useEffect, useRef } from "react";
import { DropdownMenu, Switch, Notify } from "@taroify/core";
import "@taroify/core/dropdown-menu/style";
import "@taroify/core/switch/style";
import "@taroify/core/notify/style";

import NavigationBar from "../../components/navigationbar/NavigationBar";
import CustomTabBar from "../../customer-tab-bar/index";
import AchievementItem from "../../components/Achievement/Achievement";
import { useScrollAreaHeight } from "../../hooks/useScrollAreaHeight";
import { fetchProjects, fetchTimeLines, fetchAchievements } from "../../service/achievementService";

import historyAchievement from "../../image/历史成就.png";
import placeholderIcon from "../../image/虚位以待.png";
import "./index.scss";

export default function AchievementPage() {
  const scrollHeight = useScrollAreaHeight();
  const router = useRouter();
  const searchText = router.params?.searchText || "";
  const plateId = Number(router.params?.id || 0);
  
  const [isEnd, setIsEnd] = useState(false);
  const [page, setPage] = useState(1);
  const [projectId, setProjectId] = useState(-1);
  const [timeLines, setTimeLines] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([
    { text: "不限", value: 0, id: -1 }
  ]);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState(0);
  const [selectedTimeLineIds, setSelectedTimeLineIds] = useState<number[]>([-1]);
  const [loading, setLoading] = useState(true);
  
  const timeLinesBeforeRef = useRef<any[]>([]);

  // 初始化数据
  const initData = async () => {
    setLoading(true);
    try {
      // 获取项目列表
      const projectsRes: any = await fetchProjects(plateId);
      if (projectsRes.code === 200) {
        const projectOptions = [
          { text: "不限", value: 0, id: -1 }
        ].concat(
          projectsRes.data.classificationList.map((item, index) => ({
            text: item.classifyName,
            value: index + 1,
            id: item.id
          }))
        );
        setProjects(projectOptions);
      }

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

      // 加载成就数据
      await loadAchievements();
    } catch (error) {
      Notify.open({ color: "danger", message: "数据加载失败" });
    } finally {
      setLoading(false);
    }
  };

  // 加载成就数据
  const loadAchievements = async (isLoadMore = false) => {
    try {
      const params = {
        projectId,
        period: selectedTimeLineIds,
        sectionId: plateId,
        page: isLoadMore ? page + 1 : 1,
        num: 10,
        searchText,
      };
      
      const res: any = await fetchAchievements(params);
      if (res.code === 200) {
        if (isLoadMore) {
          setAchievements(prev => [...prev, ...res.data.list]);
          setPage(prev => prev + 1);
          setIsEnd(res.data.list.length < 10);
        } else {
          setAchievements(res.data.list);
          setPage(1);
          setIsEnd(res.data.list.length < 10);
        }
      }
    } catch (error) {
      Notify.open({ color: "danger", message: "加载数据失败" });
    }
  };

  // 切换项目
  const handleProjectChange = (value) => {
    const selected = projects.find(p => p.value === value);
    if (!selected) return;
    
    setSelectedProject(value);
    setProjectId(selected.id);
    
    // 重置筛选条件
    setAchievements([]);
    setIsEnd(false);
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

  // 跳转到成就详情
  const toAchievementContent = (id) => {
    Taro.navigateTo({
      url: `/pages/achievementContent/index?id=${id}&type=achievement`,
    });
  };

  // 上拉加载更多
  const handleReachBottom = () => {
    if (!isEnd) {
      loadAchievements(true);
    }
  };

  useLoad(() => {
    initData();
  });

  useEffect(() => {
    if (selectedTimeLineIds.length > 0) {
      loadAchievements();
    }
  }, [projectId, selectedTimeLineIds]);

  return (
    <>
      <NavigationBar
        isBack
        search
        type="历史成就"
        plateId={plateId.toString()}
        value={searchText}
        onSearch={(value) => console.log("Search value:", value)}
      />

      <View className="scroll-container">
        <ScrollView
          className="achievement-scroll"
          style={{ height: `${scrollHeight}px` }}
          scrollY
          onScrollToLower={handleReachBottom}
        >
          <View className="achievement-page">
            <View className="achievement-page__header">
              <Image 
                src={historyAchievement} 
                className="achievement-page__title-img"
                mode="heightFix"
              />

              <View className="achievement-page__filter-group">
                <DropdownMenu className="achievement-page__dropdown">
                  <DropdownMenu.Item 
                    value={selectedProject} 
                    onChange={handleProjectChange}
                  >
                    <DropdownMenu.Option value={0}>不限</DropdownMenu.Option>
                    {projects.slice(1).map((project) => (
                      <DropdownMenu.Option 
                        key={project.value} 
                        value={project.value}
                      >
                        {project.text}
                      </DropdownMenu.Option>
                    ))}
                  </DropdownMenu.Item>
                </DropdownMenu>

                <DropdownMenu className="achievement-page__dropdown">
                  <DropdownMenu.Item title="时间线">
                    <View className="achievement-page__timeline-options">
                      {timeLines.map((item, index) => (
                        <View 
                          key={item.id} 
                          className="achievement-page__timeline-option"
                        >
                          <View className="achievement-page__timeline-label">
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
              <View className="achievement-page__loading">加载中...</View>
            ) : (
              <>
                <View className="achievement-page__list">
                  {achievements.map((item) => (
                    <AchievementItem
                      key={item.id}
                      cover={item.coverURL}
                      title={item.title}
                      time={item.launchTime}
                      onClick={() => toAchievementContent(item.id)}
                    />
                  ))}
                </View>

                {isEnd && achievements.length > 0 && (
                  <View className="achievement-page__end">
                    到底啦~
                  </View>
                )}

                {achievements.length === 0 && !isEnd && (
                  <View className="achievement-page__empty">
                    <Image 
                      src={placeholderIcon} 
                      className="achievement-page__empty-img"
                    />
                    <View className="achievement-page__empty-text">
                      暂无成就数据
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