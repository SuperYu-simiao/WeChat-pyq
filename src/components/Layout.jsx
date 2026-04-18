export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-lg mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  )
}
