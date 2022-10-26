import React from 'react'
import {Toolbar,IconButton,Typography,Button} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from 'react-router-dom'



function Page({id,name,sdescription,img,register,ldescription}){
    console.log("Render");
    return (
        <>
         <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                News
              </Typography>

           
              <Link to='/discus'>  <Button sx={{ color: 'white' }}> Discussion forum</Button></Link>
              <Link to='/faq'><Button sx={{ color: 'white' }}>FaQ's</Button></Link>
              <Link to='/abt'><Button sx={{ color: 'white' }}>About us</Button></Link>
              <Link to='/'><Button sx={{ color: 'white' }}>Home</Button></Link>
     
     
            </Toolbar>


            <div className="register" >
                <center>
            <h1 className="rname"
            >{name}</h1>   </center>
            <p className="ldescription">{ldescription}</p>

                   <center>
                <a className="btn btn-success"  height="auto" href={register}>Register</a>
</center>
            </div>
            </>

    )
}
export default Page;