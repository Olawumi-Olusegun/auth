import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { About, Contact, Home, Profile, Signin, Signup } from './pages'
import { AuthLayout, PublicLayout } from './components'
import HookForm from './pages/HookForm'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>

          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/hookform' element={<HookForm />} />

          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path='about' element={<About />} />
            <Route path='contact' element={<Contact />} />
          </Route>

          {/* Private Routes */}
          <Route element={<AuthLayout />}>
            <Route path='/profile' element={<Profile />} />
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}
