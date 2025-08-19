import Taro, { useLoad, useRouter } from "@tarojs/taro";
import { View, ScrollView, Image } from "@tarojs/components";
import { useState, useEffect } from "react";
import { DropdownMenu, Notify } from "@taroify/core";
import "@taroify/core/dropdown-menu/style";
import "@taroify/core/notify/style";

import NavigationBar from "../../components/navigationbar/NavigationBar";
import CustomTabBar from "../../customer-tab-bar/index";
import Activity from "../../components/Activity/Activity";
import { useScrollAreaHeight } from "../../hooks/useScrollAreaHeight";
import { fetchProjects, fetchActivities, searchActivities } from "../../service/activityService";

import activityApply from "../../image/活动申请.png";
import "./index.scss";

export default function ActivityPage() {
  const scrollHeight = useScrollAreaHeight();
  const router = useRouter();
  const searchText = router.params?.searchText || "";
  const plateId = Number(router.params?.id || 0);
  
  const [isEnd, setIsEnd] = useState(false);
  const [page, setPage] = useState(1);
  const [projectId, setProjectId] = useState(-1);
  const [projects, setProjects] = useState<any[]>([
    { text: "不限", value: 0, id: -1 }
  ]);
  const [activities, setActivities] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState(0);
  const [loading, setLoading] = useState(true);
  
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

      // 加载活动数据
      await loadActivities();
    } catch (error) {
      Notify.open({ color: "danger", message: "数据加载失败" });
    } finally {
      setLoading(false);
    }
  };

  // 加载活动数据
  const loadActivities = async (isLoadMore = false) => {
    try {
      let res: any;
      
      if (searchText) {
        // 搜索模式
        res = await searchActivities({
          projectId,
          page: isLoadMore ? page + 1 : 1,
          num: 10,
          keyword: searchText,
          ongoing: true
        });
      } else {
        // 正常模式 - 传入projectId参数
        res = await fetchActivities(plateId, projectId);
      }
      
      if (res.code === 200) {
        if (isLoadMore) {
          setActivities(prev => [...prev, ...res.data.list || res.data]);
          setPage(prev => prev + 1);
          setIsEnd((res.data.list || res.data).length < 10);
        } else {
          // 处理数据结构差异
          if (searchText) {
            setActivities(res.data.list);
          } else {
            // 处理原接口返回的数据结构
            const allActivities: any[] = [];
            res.data.forEach((project: any) => {
              project.activityList.forEach((item: any) => {
                item.projectName = project.projectName;
              });
              allActivities.push(...project.activityList);
            });
            setActivities(allActivities);
          }
          setPage(1);
          setIsEnd(false);
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
  };

  // 监听projectId变化，重新加载数据
  useEffect(() => {
    if (projectId !== -1 || activities.length > 0) {
      loadActivities();
    }
  }, [projectId]);

  // 跳转到活动详情
  const toActivityContent = (id) => {
    Taro.navigateTo({
      url: `/pages/activityContent/index?id=${id}`,
    });
  };

  // 上拉加载更多
  const handleReachBottom = () => {
    if (!isEnd && searchText) {
      loadActivities(true);
    }
  };

  useLoad(() => {
    initData();
  });

  return (
    <>
      <NavigationBar
        isBack
        search
        type="活动申请"
        plateId={plateId.toString()}
        value={searchText}
        onSearch={(value) => console.log("Search value:", value)}
      />

      <View className="scroll-container">
        <ScrollView
          className="activity-scroll"
          style={{ height: `${scrollHeight}px` }}
          scrollY
          onScrollToLower={handleReachBottom}
        >
          <View className="activity-page">
            <View className="activity-page__header">
              <Image 
                src={activityApply} 
                className="activity-page__title-img"
                mode="heightFix"
              />

              <View className="activity-page__filter">
                <DropdownMenu className="activity-page__dropdown">
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
              </View>
            </View>

            {loading ? (
              <View className="activity-page__loading">加载中...</View>
            ) : (
              <>
                <View className="activity-page__list">
                  {activities.map((item) => (
                    <Activity
                      key={item.id}
                      state={true} // 根据实际数据调整
                      cover={item.coverURL}
                      title={item.title}
                      location={item.activity_address}
                      theme={item.projectName}
                      timeLine={item.activity_date}
                      onClick={() => toActivityContent(item.id)}
                    />
                  ))}
                </View>

                {isEnd && activities.length > 0 && (
                  <View className="activity-page__end">
                    到底啦~
                  </View>
                )}

                {activities.length === 0 && !loading && (
                  <View className="activity-page__empty">
                    <View className="activity-page__empty-text">
                      暂无活动数据
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