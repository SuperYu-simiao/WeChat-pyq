import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { generateContent } from '../services/aiService'
import Layout from '../components/Layout'
import MultiSelect from '../components/MultiSelect'

const CONTENT_TYPES = ['新品上架','客户反馈/买家秀','佩戴分享','直播预告','日常种草','限时优惠']
const REAL_SITUATIONS = ['刚到货','只剩最后一件','有客户刚买走','今天拍了新图','刚直播过','有人问过这件','天气/节日契机']
const GOALS = ['种草/让人感兴趣','建立信任','引导咨询','促成成交','直播预热','唤醒沉默客户']
const TONES = ['自然随意','温柔细腻','低调克制','轻松幽默','真诚分享']

export default function Generate() {
  const navigate = useNavigate()
  const { profile, addHistory } = useApp()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    contentType: '', productName: '', category: '',
    price: '', highlight: '', realSituations: [],
    realNote: '', goal: '', tone: ''
  })

  function update(key, val) {
    setForm(f => ({ ...f, [key]: val }))
  }

  async function handleGenerate() {
    setLoading(true)
    try {
      const result = await generateContent(profile, form)
      const item = {
        id: Date.now().toString(),
        date: new Date().toISOString().slice(0, 10),
        dailyInput: form,
        result
      }
      addHistory(item)
      navigate('/result', { state: { result, dailyInput: form } })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="mb-6">
        <button onClick={() => navigate(-1)} className="text-brown/50 text-sm mb-4">← 返回</button>
        <h1 className="text-xl font-semibold text-brown">今天发什么？</h1>
        <p className="text-brown/50 text-sm mt-1">填得越真实，生成的越像你自己写的。</p>
      </div>

      <div className="flex flex-col gap-6">
        <Field label="今天想发哪类内容">
          <SingleSelect options={CONTENT_TYPES} value={form.contentType} onChange={v => update('contentType', v)} />
        </Field>

        <Field label="今天想推哪件货">
          <input value={form.productName} onChange={e => update('productName', e.target.value)}
            className="input-base" placeholder="例如：老银蝴蝶戒指" />
        </Field>

        <Field label="这件货属于什么品类">
          <input value={form.category} onChange={e => update('category', e.target.value)}
            className="input-base" placeholder="例如：老银饰" />
        </Field>

        <Field label="价格">
          <input value={form.price} onChange={e => update('price', e.target.value)}
            className="input-base" placeholder="例如：680" />
        </Field>

        <Field label="一句话亮点">
          <input value={form.highlight} onChange={e => update('highlight', e.target.value)}
            className="input-base" placeholder="例如：年代感很足，上手显气质" />
        </Field>

        <Field label="今天有什么真实情况">
          <MultiSelect options={REAL_SITUATIONS} value={form.realSituations} onChange={v => update('realSituations', v)} />
        </Field>

        <Field label="今天的真实补充" hint="可以不填，但填了会更像你">
          <textarea value={form.realNote} onChange={e => update('realNote', e.target.value)}
            className="input-base h-20 resize-none" placeholder="例如：今天试戴了一下，感觉比图片好看很多" />
        </Field>

        <Field label="今天这条内容的目标">
          <SingleSelect options={GOALS} value={form.goal} onChange={v => update('goal', v)} />
        </Field>

        <Field label="今天想要什么语气">
          <SingleSelect options={TONES} value={form.tone} onChange={v => update('tone', v)} />
        </Field>

        <button onClick={handleGenerate} disabled={loading}
          className="bg-rose text-white rounded-2xl py-3 text-base font-medium hover:opacity-90 transition-opacity disabled:opacity-50 mt-2">
          {loading ? '生成中…' : '生成今天的朋友圈'}
        </button>
      </div>
    </Layout>
  )
}

function Field({ label, hint, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-brown mb-1">{label}</label>
      {hint && <p className="text-xs text-brown/40 mb-2">{hint}</p>}
      {children}
    </div>
  )
}

function SingleSelect({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <button key={opt} type="button" onClick={() => onChange(opt)}
          className={`px-3 py-1 rounded-full text-sm border transition-colors ${
            value === opt ? 'bg-rose text-white border-rose' : 'bg-white text-brown border-brown/30 hover:border-rose'
          }`}>
          {opt}
        </button>
      ))}
    </div>
  )
}
