import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DashboardComponent } from './components/Dashboard'
import { SigninComponent } from './components/Signin'
import { SignupComponent } from './components/Signup'
import { SendMoney } from './components/SendMoney'

function App() {

  return <>
    <h1 className="text-center text-4xl font-bold">Banking App</h1>

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