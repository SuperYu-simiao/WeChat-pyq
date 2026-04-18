const TEMPLATE = `你是一个"卖货朋友圈内容助手"，服务对象是做私域卖货的人，当前行业是：中古首饰 / 珠宝饰品。

【用户基础资料】
店铺/账号名称：{shopName}
主要售卖行业：{industry}
常卖品类：{categories}
主要客户：{customers}
价格带：{priceRange}
朋友圈整体风格：{styles}
主要卖点方向：{sellingPoints}
不希望出现的问题：{avoidIssues}
偏好文案长度：{contentLength}
常见素材来源：{materialSources}
平时最常发的内容类型：{contentTypes}
常说的话：{commonPhrases}
绝对不想出现的话：{forbiddenPhrases}
其他个性要求：{otherRequirements}

【今天的输入】
今天发的内容类型：{contentType}
今天的产品名称：{productName}
今天的产品品类：{category}
今天的价格：{price}
这件货的一句话亮点：{highlight}
今天的真实素材：{realSituations}
今天的真实补充：{realNote}
今天这条内容的目标：{goal}
今天想要的语气：{tone}

【输出格式】
请严格按以下格式输出：

一、今日发圈定位
用1-2句话说明今天这条朋友圈适合承担什么作用。

二、朋友圈正文
输出1条可以直接复制发朋友圈的内容。

三、配图顺序建议
按"图1、图2、图3、图4"列出建议。

四、评论区补充话术
1. 温和版
2. 轻成交版`

export function buildPrompt(profile, dailyInput) {
  const arr = (v) => Array.isArray(v) ? v.join('、') : (v || '未填写')
  const str = (v) => v || '未填写'

  return TEMPLATE
    .replace('{shopName}', str(profile.shopName))
    .replace('{industry}', str(profile.industry))
    .replace('{categories}', arr(profile.categories))
    .replace('{customers}', arr(profile.customers))
    .replace('{priceRange}', str(profile.priceRange))
    .replace('{styles}', arr(profile.styles))
    .replace('{sellingPoints}', arr(profile.sellingPoints))
    .replace('{avoidIssues}', arr(profile.avoidIssues))
    .replace('{contentLength}', str(profile.contentLength))
    .replace('{materialSources}', arr(profile.materialSources))
    .replace('{contentTypes}', arr(profile.contentTypes))
    .replace('{commonPhrases}', str(profile.commonPhrases))
    .replace('{forbiddenPhrases}', str(profile.forbiddenPhrases))
    .replace('{otherRequirements}', str(profile.otherRequirements))
    .replace('{contentType}', str(dailyInput.contentType))
    .replace('{productName}', str(dailyInput.productName))
    .replace('{category}', str(dailyInput.category))
    .replace('{price}', str(dailyInput.price))
    .replace('{highlight}', str(dailyInput.highlight))
    .replace('{realSituations}', arr(dailyInput.realSituations))
    .replace('{realNote}', str(dailyInput.realNote))
    .replace('{goal}', str(dailyInput.goal))
    .replace('{tone}', str(dailyInput.tone))
}
