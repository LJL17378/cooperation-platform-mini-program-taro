// TODO: 替换为实际API请求
export const fetchNews = async (params: any) => {
  const { page, num, keyword, themeIds } = params;
  
  // 模拟API请求
  return new Promise((resolve) => {
    setTimeout(() => {
      // 所有可能的新闻数据
      const allNews = [
        // 社会服务类新闻
        {
          id: 1,
          title: "社区环保宣传活动圆满成功",
          introduction: "志愿者团队在社区开展环保宣传活动，提高了居民的环保意识。",
          coverURL: "https://www.wetools.com/imgplaceholder/800x240",
          themeId: 1
        },
        {
          id: 2,
          title: "敬老院志愿服务活动",
          introduction: "青年志愿者前往敬老院开展关爱老人活动，送去温暖和关怀。",
          coverURL: "https://www.wetools.com/imgplaceholder/800x240",
          themeId: 1
        },
        {
          id: 3,
          title: "社区垃圾分类推广活动",
          introduction: "组织居民学习垃圾分类知识，提升社区环境质量。",
          coverURL: "https://www.wetools.com/imgplaceholder/800x240",
          themeId: 1
        },
        
        // 献血类新闻
        {
          id: 4,
          title: "春季无偿献血活动顺利举行",
          introduction: "本次活动共有120人参与献血，累计献血量达36000毫升。",
          coverURL: "https://www.wetools.com/imgplaceholder/800x240",
          themeId: 2
        },
        {
          id: 5,
          title: "献血知识科普讲座",
          introduction: "邀请专家开展献血知识科普讲座，解答市民关于献血的疑问。",
          coverURL: "https://www.wetools.com/imgplaceholder/800x240",
          themeId: 2
        },
        {
          id: 6,
          title: "爱心献血车进校园活动",
          introduction: "组织献血车进入校园，方便师生参与无偿献血。",
          coverURL: "https://www.wetools.com/imgplaceholder/800x240",
          themeId: 2
        },
        
        // 会议类新闻
        {
          id: 7,
          title: "2023年度工作总结会议",
          introduction: "召开年度工作总结会议，回顾过去一年的工作成果和经验。",
          coverURL: "https://www.wetools.com/imgplaceholder/800x240",
          themeId: 3
        },
        {
          id: 8,
          title: "新技术研讨会即将召开",
          introduction: "本次研讨会将探讨人工智能在医疗领域的应用前景。",
          coverURL: "https://www.wetools.com/imgplaceholder/800x240",
          themeId: 3
        },
        {
          id: 9,
          title: "青年志愿者协会换届大会",
          introduction: "举行新一届青年志愿者协会换届选举大会。",
          coverURL: "https://www.wetools.com/imgplaceholder/800x240",
          themeId: 3
        }
      ];
      
      // 根据主题筛选
      let filteredNews = allNews;
      if (themeIds && themeIds.length > 0) {
        filteredNews = allNews.filter(item => 
          themeIds.includes(item.themeId)
        );
      }
      
      // 根据关键词筛选
      if (keyword) {
        const lowerKeyword = keyword.toLowerCase();
        filteredNews = filteredNews.filter(item => 
          item.title.toLowerCase().includes(lowerKeyword) || 
          item.introduction.toLowerCase().includes(lowerKeyword)
        );
      }
      
      // 分页处理
      const startIndex = (page - 1) * num;
      const endIndex = startIndex + num;
      const paginatedNews = filteredNews.slice(startIndex, endIndex);
      
      resolve({
        code: 200,
        data: {
          list: paginatedNews,
          total: filteredNews.length,
          currentPage: page,
          totalPages: Math.ceil(filteredNews.length / num)
        }
      });
    }, 800);
  });
};