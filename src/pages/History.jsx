import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Layout from '../components/Layout'
import CopyButton from '../components/CopyButton'

export default function History() {
  const navigate = useNavigate()
  const { history } = useApp()
  const [expanded, setExpanded] = useState(null)

  return (
    <Layout>
      <div className="mb-6">
        <button onClick={() => navigate(-1)} className="text-brown/50 text-sm mb-4">← 返回</button>
        <h1 className="text-xl font-semibold text-brown">历史记录</h1>
        <p className="text-brown/50 text-sm mt-1">最近 7 天生成过的内容</p>
      </div>

      {history.length === 0 ? (
        <div className="text-center pt-20 text-brown/40">
          <p className="text-4xl mb-4">✦</p>
          <p className="text-sm">还没有生成过内容</p>
          <button onClick={() => navigate('/generate')}
            className="mt-4 text-rose text-sm border border-rose rounded-xl px-4 py-2 hover:bg-rose/5 transition-colors">
            去生成今天的内容
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {history.map(item => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === item.id ? null : item.id)}
                className="w-full text-left p-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs text-brown/40 block mb-1">{item.date}</span>
                    <span className="text-sm font-medium text-brown">
                      {item.dailyInput.productName || '未命名产品'}
                    </span>
                    <p className="text-xs text-brown/60 mt-1 line-clamp-2">
                      {item.result.content.slice(0, 50)}…
                    </p>
                  </div>
                  <span className="text-brown/30 text-sm ml-2">{expanded === item.id ? '▲' : '▼'}</span>
                </div>
              </button>

              {expanded === item.id && (
                <div className="border-t border-brown/10 p-4 flex flex-col gap-3">
                  <ExpandedSection title="今日发圈定位" content={item.result.positioning} />
                  <ExpandedSection title="朋友圈正文" content={item.result.content} />
                  <ExpandedSection title="配图顺序建议" content={item.result.imageOrder} />
                  <div>
                    <span className="text-xs text-brown/40 block mb-2">评论区话术</span>
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-start bg-cream rounded-xl p-3">
                        <div>
                          <span className="text-xs text-brown/40 block mb-1">温和版</span>
                          <p className="text-sm text-brown">{item.result.comments.soft}</p>
                        </div>
                        <CopyButton text={item.result.comments.soft} />
                      </div>
                      <div className="flex justify-between items-start bg-cream rounded-xl p-3">
                        <div>
                          <span className="text-xs text-brown/40 block mb-1">轻成交版</span>
                          <p className="text-sm text-brown">{item.result.comments.sales}</p>
                        </div>
                        <CopyButton text={item.result.comments.sales} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Layout>
  )
}

function ExpandedSection({ title, content }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-brown/40">{title}</span>
        <CopyButton text={content} />
      </div>
      <p className="text-sm text-brown whitespace-pre-line">{content}</p>
    </div>
  )
}
