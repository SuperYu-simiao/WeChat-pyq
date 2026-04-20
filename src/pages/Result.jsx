import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { generateContent } from '../services/aiService'
import { useApp } from '../context/AppContext'
import Layout from '../components/Layout'
import CopyButton from '../components/CopyButton'

export default function Result() {
  const navigate = useNavigate()
  const location = useLocation()
  const { profile, addHistory } = useApp()
  const [result, setResult] = useState(location.state?.result)
  const dailyInput = location.state?.dailyInput
  const [loading, setLoading] = useState(false)

  if (!result) {
    return (
      <Layout>
        <div className="text-center pt-20 text-brown/50">
          <p>没有内容，请先生成。</p>
          <button onClick={() => navigate('/generate')} className="mt-4 text-rose text-sm">去生成</button>
        </div>
      </Layout>
    )
  }

  async function refine(direction) {
    setLoading(true)
    try {
      const modified = { ...dailyInput, tone: direction === 'natural' ? '更自然随意' : '更有成交感' }
      const newResult = await generateContent(profile, modified)
      setResult(newResult)
      const item = {
        id: Date.now().toString(),
        date: new Date().toISOString().slice(0, 10),
        dailyInput: modified,
        result: newResult
      }
      addHistory(item)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="mb-6">
        <button onClick={() => navigate(-1)} className="text-brown/50 text-sm mb-4">← 返回</button>
        <h1 className="text-xl font-semibold text-brown">今天的朋友圈</h1>
      </div>

      <div className="flex flex-col gap-4">
        <ResultCard title="今日发圈定位" content={result.positioning} />

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-brown">朋友圈正文</span>
            <CopyButton text={result.content} />
          </div>
          <p className="text-brown text-sm leading-relaxed whitespace-pre-line">{result.content}</p>
          <div className="flex gap-2 mt-4">
            <button onClick={() => refine('natural')} disabled={loading}
              className="flex-1 border border-brown/20 text-brown/70 rounded-xl py-2 text-sm hover:border-rose hover:text-rose transition-colors disabled:opacity-40">
              更自然一点
            </button>
            <button onClick={() => refine('sales')} disabled={loading}
              className="flex-1 border border-brown/20 text-brown/70 rounded-xl py-2 text-sm hover:border-rose hover:text-rose transition-colors disabled:opacity-40">
              更有成交感一点
            </button>
          </div>
        </div>

        <ResultCard title="配图顺序建议" content={result.imageOrder} />

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <span className="text-sm font-medium text-brown block mb-3">评论区补充话术</span>
          <div className="flex flex-col gap-3">
            <CommentCard label="温和版" text={result.comments.soft} />
            <CommentCard label="轻成交版" text={result.comments.sales} />
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button onClick={() => navigate('/generate')}
          className="flex-1 border border-rose text-rose rounded-2xl py-3 text-sm font-medium hover:bg-rose/5 transition-colors">
          重新生成
        </button>
        <button onClick={() => navigate('/history')}
          className="flex-1 bg-rose text-white rounded-2xl py-3 text-sm font-medium hover:opacity-90 transition-opacity">
          查看历史
        </button>
      </div>
    </Layout>
  )
}

function ResultCard({ title, content }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-medium text-brown">{title}</span>
        <CopyButton text={content} />
      </div>
      <p className="text-brown/80 text-sm leading-relaxed whitespace-pre-line">{content}</p>
    </div>
  )
}

function CommentCard({ label, text }) {
  return (
    <div className="flex justify-between items-start gap-3 bg-cream rounded-xl p-3">
      <div>
        <span className="text-xs text-brown/40 block mb-1">{label}</span>
        <p className="text-brown text-sm">{text}</p>
      </div>
      <CopyButton text={text} />
    </div>
  )
}
