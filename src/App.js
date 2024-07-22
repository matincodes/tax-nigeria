import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/home/home'
import Login from './routes/login/login'
import Admin from './components/admin/admin'
import TaxCard from './components/tax-card/tax-card'
import ProtectedRoute from './components/protectedRoute/protectedRoute'

const App = () => {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard/*' element={<Admin />} />
        </Route>
        <Route path='/taxcard' element={<TaxCard />} />
      </Routes>
    </div>
  )
}

export default App
