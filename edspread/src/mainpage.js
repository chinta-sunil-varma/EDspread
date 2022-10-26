import React from 'react'
import { Box, Typography, IconButton, AppBar, Toolbar, Button, Paper, Skeleton, Card, CardContent, Grid } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';
import image from './workoutimg.jpg'
import loop from './aset/loop.mp4'
import App from './App'



function MainPage() {


  const [apiConf, setapiConf] = React.useState(false)
  const [admin, setAdmin] = React.useState(false)
  const navigate = useNavigate()
  React.useEffect(() => {
    axios.get('http://localhost:5000/status')
      .then((result) => {
        if (result.data.status)
          {setapiConf(true)
          if(result.data.user==='admin')
          {
            setAdmin(true)
          }
          }

        else
          navigate('/login')
      }).catch((err) => {

      });
  }, [])
  const [value, setValue] = React.useState([])
  // const[loading,setLoading]=React.useState(true)
  React.useEffect(() => {
    if(apiConf)
    {axios.get('http://localhost:5000/activity')
      .then((result) => {
        result = result.data
        if (result.status) {
          console.log(result);
          setValue(result.rows)
        }
        else {
          console.log(result);
          setValue([])
        }

      }).catch((err) => {

      });}
  }, [apiConf])

  function logout()
  {
      axios.post('http://localhost:5000/logout')
      .then((result) => {
          result=result.data
          if(result.status)
          {
              console.log('logged out succesfully');
              navigate('/login')
          }
      }).catch((err) => {
          
      });
  }


  return (
    
    apiConf ?<>
      <video loop autoPlay
    
    style={{
      objectFit:'cover',
      position:'absolute',
      width:'100%',
      height:'100vh'
    }}
     >
      <source src={loop}/>
    </video>
      <Box sx={{position:'relative',width:'100%'}}>
        <Typography variant='h4' component='div'
          sx={{
            color:'whitesmoke',
            fontFamily: 'Gemunu Libre, sans-serif',
            textAlign: 'center'
          }}
        >WELCOME TO CLUB</Typography>


        <Box className='navBar'>
          <AppBar position="static" sx={{
            backgroundColor: 'rgba(105, 111, 42, 0)',


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

           { admin?  <Link to='/admin'>  <Button sx={{ color: 'white' }}> Admin</Button></Link>:null}
              <Link to='/discus'>  <Button sx={{ color: 'white' }}> Discussion forum</Button></Link>
              <Link to='/faq'><Button sx={{ color: 'white' }}>FaQ's</Button></Link>
              <Link to='/abt'><Button sx={{ color: 'white' }}>About us</Button></Link>
              <Button onClick={logout} sx={{ color: 'white' }}>Log Out</Button>
            </Toolbar>
          </AppBar>
          
          <Box display='flex' justifyContent='space-evenly'>

            {/* {
        loading?
        <Skeleton sx={{width:'500px',height:'500px'}} variant='rectangle' animation='wave'/>:
        
        <img className='mainimg' onLoad={()=>(setLoading(false))}  src='https://source.unsplash.com/random/1500x1500'></img>} */}

            <img className='mainimg' src={image}></img>
            <Paper sx={{ width: '500px',backgroundColor:'rgba(0,0,0,0)' }}

            >
              <Typography
                sx={{
                  fontFamily: 'Gemunu Libre, sans-serif',
                  fontSize: 'larger',
                  textAlign: 'center',
                  color:'whitesmoke',
                  marginBottom:'25px'
                }}
              >DASH-BOARD</Typography>
              <Grid container
                flexGrow={1}
                sx={
                  {
                    '& div:nth-of-type(even) div div div':
                    {
                      backgroundColor: 'rgb(168, 232, 144)'
                    },
                    '& div:nth-of-type(odd) div div ':
                    {
                      backgroundColor: 'rgb(116, 159, 130)'
                    }
                  }
                }
              >
                {value.map((item) => (
                  <Grid item flexGrow={1}>
                    <Box  >
                      <Card sx={{ margin: '2px', width: 'auto' }} variant='outlined'>
                        <CardContent>
                          <Typography variant='h6' component='div' width='auto'>{item.act}</Typography>
                        </CardContent>
                      </Card>
                    </Box>
                  </Grid>
                ))}
              </Grid>


            </Paper>
            
          </Box>
        </Box>
        
      </Box>
      <br></br>
      <App></App>
    </>:null
  )

}

export default MainPage