import React from 'react'
import  reactDOM  from 'react-dom/client'
import App from './Administrative'
import Main from './mainpage'
import Faq from './faq'
import {BrowserRouter,Route,Routes} from 'react-router-dom'


const root=reactDOM.createRoot(document.getElementById('root'))

root.render(
   <BrowserRouter>
   <Routes>

      <Route path='/admin' element={<App/>} />
      <Route path='/' element={<Main/>} />
      <Route path='/faq' element={<Faq/>} />
   </Routes>

   </BrowserRouter>
      
    
)