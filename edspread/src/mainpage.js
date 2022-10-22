import React from 'react'
import {Box, Typography,IconButton,AppBar,Toolbar,Button, Paper,Skeleton,Card, CardContent, Grid} from '@mui/material'
import {Link} from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';



function MainPage()
{
  const[value,setValue]=React.useState([])
  const[loading,setLoading]=React.useState(true)
  React.useEffect(()=>
  {
    axios.get('http://localhost:5000/activity')
    .then((result) => {
      result=result.data
      if(result.status)
      {console.log(result);
      setValue(result.rows)}
      else
      {
        console.log(result);
        setValue([])
      }
      
    }).catch((err) => {
      
    });
  },[])

  React.useEffect(()=>
  {
    setTimeout(()=>{
      setLoading(false)
      clearTimeout(this)
    },3000)
  })
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
      <Box display='flex' justifyContent='space-evenly'>

      {
        loading?
        <Skeleton sx={{width:'500px',height:'500px'}} variant='rectangle' animation='wave'/>:
        
        <img className='mainimg'  src='https://source.unsplash.com/random/1500x1500'></img>}
      <Paper sx={{width:'500px'}}
         
       >
        <Typography 
        sx={{
          fontFamily: 'Gemunu Libre, sans-serif',
          fontSize:'larger'
        }}
        >Activities are:</Typography>
        <Grid container
        flexGrow={1}
        sx={
          {
            '& div:nth-of-type(even) div div div':
            {
              backgroundColor:'red'
            },
            '& div:nth-of-type(odd) div div ':
            {
              backgroundColor:'pink'
            }
          }
        }
        >
        {value.map((item)=>(
          <Grid item flexGrow={1}>
          <Box  >
            <Card sx={{margin:'2px',width:'auto'}} variant='outlined'>
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
    
 )

}

export default MainPage