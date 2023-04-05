
import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Login = () => {

  const[suces,setsucces]=React.useState(false)
  const[value,setValue]=React.useState({
    name:'',
    password:''
  })
  const navigate=useNavigate()
  console.log(value);
  function contact(obj)
  {
    obj.preventDefault()
    axios.post('/api/login',{name:value.name,password:value.password,withCredentials:true})
    .then((result) => {
      if(result.data.status)
      {
        console.log(result.data.message);
        console.log('heheheheh');
        navigate('/')
        
      }
      else
      {
        document.write('details mismatch')
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  function update(event)
  {
       const {name,value}=event.target
       if(name==='name')
       {
        setValue((prev)=>{
             return(

             { ...prev,
              name:value
            }

             )
        })

       }
       if(name==='password')
       {
        setValue((prev)=>{
             return(

             { ...prev,
              password:value
            }

             )
        })

       }
  }
  React.useEffect(()=>{
    console.log('im triggered');
    axios.get('/api/login',{withCredentials:true})
  .then((result) => {
    setsucces(true)
  }).catch((err) => {
    console.log(err);
  });
  },[])
  
  return (
    suces?
    <div>
   <form  >
    enter your name: <input type={'text'}
    onChange={update}
     name='name' required value={value.name}></input>
    <br>

    </br>
    enter your paassword: <input type={'password'}
    onChange={update}
     name='password' value={value.password} required></input>
    <br>

    </br>
    <button onClick={contact}>submit me</button>
   </form>
    </div>:'unable to contact server try again!'
  )
}

