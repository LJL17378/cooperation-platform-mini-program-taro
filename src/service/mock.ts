// service/mock.ts
export async function mockFetchCarousel(num = 4) {
  // 模拟网络延迟
  await new Promise((r) => setTimeout(r, 300))
  const items = Array.from({ length: num }).map((_, i) => ({
    id: `c-${i + 1}`,
    title: `轮播标题 ${i + 1}`,
    coverURL: `https://www.wetools.com/imgplaceholder/750x240?text=carousel+${i + 1}`,
  }))
  return items
}

export async function mockFetchNewsPage(page = 1, num = 2) {
  await new Promise((r) => setTimeout(r, 400))
  // 模拟总共 3 页
  const totalPages = 3
  const list = Array.from({ length: num }).map((_, idx) => {
    const id = `n-${(page - 1) * num + idx + 1}`
    return {
      id,
      title: `示例新闻114514191911451419191145141919 ${id}`,
      introduction: `这是新闻 ${id} 的简介，来自 mock 数据。来自 mock 数据。来自 mock 数据。来自 mock 数据。来自 mock 数据。来自 mock 数据。来自 mock 数据。来自 mock 数据。来自 mock 数据。来自 mock 数据。来自 mock 数据。来自 mock 数据。来自 mock 数据。`,
      coverURL: `https://www.wetools.com/imgplaceholder/400x240?text=news+${id}`,
    }
  })
  return {
    code: 200,
    data: { list },
    isEnd: page >= totalPages,
  }
}
