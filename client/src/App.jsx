import { BrowserRouter, Route, Routes } from 'react-router'
import { UserContextWrapper } from './context/user/UserContextWrapper'
import { PublicTemplate } from './templates/PublicTemplate'
import { HomePage } from './pages/public/Home'
import { LoginPage } from './pages/public/Login'
import { LogoutPage } from './pages/public/Logout'
import { RegisterPage } from './pages/public/Register'
import { Page404 } from './pages/public/Page404'
import { Dashboard } from './pages/admin/Dashboard'
import { AdminTemplate } from './templates/AdminTemplate'
import { Home } from './components/Boxes/Home'
import { Create } from './components/Boxes/Create'
import { Edit } from './components/Boxes/Edit'
import { Read } from './components/Boxes/Read'




export function App() {


  return (

        <UserContextWrapper>
          <BrowserRouter>
          <Routes>
            <Route element={<PublicTemplate />}>
              <Route path='/' index element={<HomePage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/logout' element={<LogoutPage />} />
            <Route path='/register' element={<RegisterPage />} />
        
          </Route>

             <Route element={<AdminTemplate />}>
            <Route path='/admin' index element={<Dashboard />} />
            <Route path="/admin/students" element={<Home />} />
              <Route path="/admin/create" element={<Create />} />
              <Route path="/admin/edit/:id" element={<Edit />} />
              <Route path="/admin/read/:id" element={<Read />} />

            </Route>










            <Route element={<PublicTemplate />}>
              <Route path='*' element={<Page404 />} />
            </Route>
  
          </Routes>
        </BrowserRouter>

    </UserContextWrapper>
  )
}


