import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Layout from '../components/Layout'

export default function Home() {
  const navigate = useNavigate()
  const { profile } = useApp()
  const hasProfile = profile && profile.shopName

  function handleGenerate() {
    if (!hasProfile) {
      navigate('/profile')
    } else {
      navigate('/generate')
    }
  }

  return (
    <Layout>
      <div className="flex flex-col items-center text-center pt-16 pb-8">
        <div className="text-4xl mb-6">✦</div>
        <h1 className="text-2xl font-semibold text-brown leading-snug mb-4">
          每天不知道发什么？<br />帮你生成今天能直接发的朋友圈。
        </h1>
        <p className="text-brown/60 text-sm mb-12">
          适合卖中古首饰、珠宝、玉石、饰品的人。
        </p>
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <button
            onClick={handleGenerate}
            className="bg-rose text-white rounded-2xl py-3 text-base font-medium hover:opacity-90 transition-opacity"
          >
            开始生成今天内容
          </button>
          <button
            onClick={() => navigate('/profile')}
            className="border border-rose text-rose rounded-2xl py-3 text-base font-medium hover:bg-rose/5 transition-colors"
          >
            {hasProfile ? '修改我的资料' : '先设置我的资料'}
          </button>
          {hasProfile && (
            <button
              onClick={() => navigate('/history')}
              className="text-brown/50 text-sm py-2 hover:text-brown transition-colors"
            >
              查看历史记录
            </button>
          )}
        </div>
      </div>
    </Layout>
  )
}
