import React from 'react'
import {Box, Typography,IconButton,AppBar,Toolbar,Button} from '@mui/material'
import {Link} from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';



function MainPage()
{
 return(
    <Box>
           <Typography variant='h4' component='div'
           sx={{
            fontFamily: 'Gemunu Libre, sans-serif',
            textAlign:'center'
           }}
           >WELCOME TO CLUB</Typography>


<Box className='navBar'>
    <AppBar position="static" sx={{
        backgroundColor:'#562B08'
        
    }}>
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
         <Link to='/discus'>  <Button sx={{color:'white'}}> Discussion forum</Button></Link>
          <Link to='/faq'><Button sx={{color:'white'}}>FaQ's</Button></Link>
          <Link to='/abt'><Button sx={{color:'white'}}>About us</Button></Link>
        </Toolbar>
      </AppBar>
      <img className='mainimg' src='https://source.unsplash.com/random/1500x1500'></img>
    </Box>
    </Box>
    
 )

}

export default MainPage