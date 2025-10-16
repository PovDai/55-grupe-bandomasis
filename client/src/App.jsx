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
import { HomeContainer } from './components/containers/HomeContainer'
import { CreateContainer } from './components/containers/CreateContainer'
import { EditContainer } from './components/containers/EditContainer'
import { ReadContainer } from './components/containers/ReadContainer'
import {StockTracker } from './components/stocks/StockMarket'
import { Nasa } from './components/nasa/Nasa'
import { AdvicePage } from './components/advice/AdvicePage'






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
            <Route path="/admin/stocks/" element={<StockTracker />} />
            <Route path='/admin/nasa/' element={<Nasa />} />
            <Route path='admin/advice' element={<AdvicePage/>}/>
     

            <Route path='/admin/containers' element={<HomeContainer />} />
            <Route path='/admin/createContainer' element={<CreateContainer />} />
            <Route path='/admin/editContainer/:id' element={<EditContainer />} />
            <Route path='/admin/readContainer/:id' element={<ReadContainer />} />

            </Route>










            <Route element={<PublicTemplate />}>
              <Route path='*' element={<Page404 />} />
            </Route>
  
          </Routes>
        </BrowserRouter>

    </UserContextWrapper>
  )
}


