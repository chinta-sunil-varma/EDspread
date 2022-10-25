import React from 'react'
import  reactDOM  from 'react-dom/client'
import App from './Administrative'
import Main from './mainpage'
import Faq from './faq'
import AppC from './chat/App'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import { Login } from './Login'
import { Register } from './Register'
import SignInSide from './SignInSide'
import SignUp from './SignUp'



const root=reactDOM.createRoot(document.getElementById('root'))

root.render(
   <BrowserRouter>
   <Routes>

      <Route path='/admin' element={<App/>} />
      <Route path='/' element={<Main/>} />
      <Route path='/faq' element={<Faq/>} />
      <Route path='/discus' element={<AppC/>} />
      <Route path='/login' element={<SignInSide/>} />
      <Route path='/register' element={<SignUp/>} />
      {/* <Route path='/log' element={<SignInSide/>} /> */}
      {/* <Route path='/reg' element={<SignUp/>} /> */}
   </Routes>

   </BrowserRouter>
      
    
)