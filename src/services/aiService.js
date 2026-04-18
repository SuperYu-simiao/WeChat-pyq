import { buildPrompt } from './promptBuilder'

function mockGenerate() {
  return {
    positioning: '今天这条适合做种草 + 建立信任，用真实佩戴感带出产品气质。',
    content: '最近收到一枚老银戒指，年代感很足，戴上去有点像从外婆首饰盒里翻出来的那种。\n\n不是很张扬的款，但上手很好看，适合平时随手戴。\n\n价格不高，有喜欢的来问我。',
    imageOrder: '图1：整体平铺\n图2：上手特写\n图3：细节纹路\n图4：搭配场景',
    comments: {
      soft: '喜欢的可以来问我，我发你更多细节图。',
      sales: '今天只有这一枚，有意向的早点来，先到先得。'
    }
  }
}

async function callRealAPI(profile, dailyInput) {
  const prompt = buildPrompt(profile, dailyInput)
  const apiKey = import.meta.env.VITE_API_KEY
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    }),
  })
  const data = await res.json()
  const text = data.content[0].text
  return parseResponse(text)
}

function parseResponse(text) {
  const get = (label) => {
    const re = new RegExp(`${label}[\\s\\S]*?\\n([\\s\\S]*?)(?=\\n[一二三四]、|$)`)
    const m = text.match(re)
    return m ? m[1].trim() : ''
  }
  return {
    positioning: get('一、今日发圈定位'),
    content: get('二、朋友圈正文'),
    imageOrder: get('三、配图顺序建议'),
    comments: {
      soft: (text.match(/1\.\s*温和版\s*\n([\s\S]*?)(?=\n2\.|$)/) || [])[1]?.trim() || '',
      sales: (text.match(/2\.\s*轻成交版\s*\n([\s\S]*?)$/) || [])[1]?.trim() || '',
    }
  }
}

export async function generateContent(profile, dailyInput) {
  if (import.meta.env.VITE_USE_REAL_AI === 'true') {
    return callRealAPI(profile, dailyInput)
  }
  return mockGenerate()
}
