import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Layout from '../components/Layout'
import MultiSelect from '../components/MultiSelect'

const CATEGORIES = ['老银饰','翡翠','和田玉','珍珠','琥珀蜜蜡','宝石戒指','古董摆件','其他']
const CUSTOMERS = ['25-35岁女性','35-45岁女性','注重气质的职场女性','喜欢中古风的年轻人','送礼需求客户','收藏爱好者']
const PRICE_RANGES = ['500以下','500-1500','1500-5000','5000以上','混合价格带']
const STYLES = ['真实生活感','有点文艺','低调克制','温柔种草','偶尔幽默','专业可信']
const SELLING_POINTS = ['稀缺性/孤品','年代感/故事感','佩戴感/气质感','性价比','工艺细节','来源可信']
const AVOID_ISSUES = ['太像广告','太硬的逼单','浮夸感叹号','重复啰嗦','参数堆砌','假装亲密']
const CONTENT_LENGTHS = ['短（50字以内）','中（50-150字）','长（150字以上）','不限']
const MATERIAL_SOURCES = ['自己拍的实物图','买家秀/反馈截图','佩戴视频','文字描述','直播截图']
const CONTENT_TYPES = ['新品上架','客户反馈','佩戴分享','直播预告','日常种草','限时优惠']

export default function Profile() {
  const navigate = useNavigate()
  const { profile, setProfile } = useApp()
  const [form, setForm] = useState({
    shopName: '', industry: '中古首饰/珠宝饰品',
    categories: [], customers: [], priceRange: '',
    styles: [], sellingPoints: [], avoidIssues: [],
    contentLength: '', materialSources: [], contentTypes: [],
    commonPhrases: '', forbiddenPhrases: '', otherRequirements: '',
    ...profile
  })

  function update(key, val) {
    setForm(f => ({ ...f, [key]: val }))
  }

  function handleSave() {
    setProfile(form)
    navigate('/')
  }

  return (
    <Layout>
      <div className="mb-6">
        <button onClick={() => navigate(-1)} className="text-brown/50 text-sm mb-4">← 返回</button>
        <h1 className="text-xl font-semibold text-brown">基础资料设置</h1>
        <p className="text-brown/50 text-sm mt-1">填得越详细，生成的内容越像你。</p>
      </div>

      <div className="flex flex-col gap-6">
        <Field label="店铺 / 账号名称">
          <input value={form.shopName} onChange={e => update('shopName', e.target.value)}
            className="input-base" placeholder="例如：小鹿中古" />
        </Field>

        <Field label="常卖品类">
          <MultiSelect options={CATEGORIES} value={form.categories} onChange={v => update('categories', v)} />
        </Field>

        <Field label="主要客户是谁">
          <MultiSelect options={CUSTOMERS} value={form.customers} onChange={v => update('customers', v)} />
        </Field>

        <Field label="价格带">
          <SingleSelect options={PRICE_RANGES} value={form.priceRange} onChange={v => update('priceRange', v)} />
        </Field>

        <Field label="朋友圈整体风格">
          <MultiSelect options={STYLES} value={form.styles} onChange={v => update('styles', v)} />
        </Field>

        <Field label="主要卖点方向">
          <MultiSelect options={SELLING_POINTS} value={form.sellingPoints} onChange={v => update('sellingPoints', v)} />
        </Field>

        <Field label="不想文案出现什么问题">
          <MultiSelect options={AVOID_ISSUES} value={form.avoidIssues} onChange={v => update('avoidIssues', v)} />
        </Field>

        <Field label="偏好文案长度">
          <SingleSelect options={CONTENT_LENGTHS} value={form.contentLength} onChange={v => update('contentLength', v)} />
        </Field>

        <Field label="常见素材来源">
          <MultiSelect options={MATERIAL_SOURCES} value={form.materialSources} onChange={v => update('materialSources', v)} />
        </Field>

        <Field label="平时最常发的内容类型">
          <MultiSelect options={CONTENT_TYPES} value={form.contentTypes} onChange={v => update('contentTypes', v)} />
        </Field>

        <Field label="平时最常说的话" hint="写几句你习惯的表达方式">
          <textarea value={form.commonPhrases} onChange={e => update('commonPhrases', e.target.value)}
            className="input-base h-24 resize-none" placeholder="例如：有缘的来找我" />
        </Field>

        <Field label="绝对不想出现的话">
          <textarea value={form.forbiddenPhrases} onChange={e => update('forbiddenPhrases', e.target.value)}
            className="input-base h-24 resize-none" placeholder="例如：姐妹们冲、闭眼入" />
        </Field>

        <Field label="其他个性要求">
          <textarea value={form.otherRequirements} onChange={e => update('otherRequirements', e.target.value)}
            className="input-base h-24 resize-none" placeholder="其他想告诉 AI 的事" />
        </Field>

        <button onClick={handleSave}
          className="bg-rose text-white rounded-2xl py-3 text-base font-medium hover:opacity-90 transition-opacity mt-2">
          保存资料
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
