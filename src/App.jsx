import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Generate from './pages/Generate'
import Result from './pages/Result'
import History from './pages/History'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/generate" element={<Generate />} />
      <Route path="/result" element={<Result />} />
      <Route path="/history" element={<History />} />
    </Routes>
  )
}
