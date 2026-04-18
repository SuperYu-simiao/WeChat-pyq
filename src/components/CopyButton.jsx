import { useState } from 'react'

export default function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="text-sm text-rose border border-rose rounded-lg px-3 py-1 hover:bg-rose hover:text-white transition-colors"
    >
      {copied ? '已复制' : '复制'}
    </button>
  )
}
