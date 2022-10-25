import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      
        CluB-Makers
      
      { new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
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
    axios.post('http://localhost:5000/login',{name:value.name,password:value.password,withCredentials:true})
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
    axios.get('http://localhost:5000/login',{withCredentials:true})
  .then((result) => {
    setsucces(true)
  }).catch((err) => {
    console.log(err);
  });
  },[])
  


  return (
    suces?<ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate  sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="username"
                name="name"
                onChange={update}
                value={value.name}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={update}
                value={value.password}
                autoComplete="current-password"
              />
             
              <Button
                type="submit"
                fullWidth
                onClick={contact}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                
                <Grid item>
                  <Link href="/register" variant="body2">
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>:null
  );
}
