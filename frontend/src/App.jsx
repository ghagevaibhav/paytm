import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DashboardComponent } from './pages/Dashboard'
import { SigninComponent } from './pages/Signin'
import { SignupComponent } from './pages/Signup'
import { SendMoney } from './pages/SendMoney'

function App() {

  return <>
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignupComponent />} />
        <Route path='/signin' element={ <SigninComponent /> } />
        <Route path="/dashboard" element={<DashboardComponent />} />
        <Route path="/send" element={<SendMoney />} />
      </Routes>
    </BrowserRouter>
  </>
}

export default App