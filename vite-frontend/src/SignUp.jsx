import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
       CluB-Makers
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {

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
    axios.post('/api/register',{name:value.name,password:value.password,withCredentials:true})
    .then((result) => {
      if(result.data.status)
      {
        console.log(result.data.message);
        console.log('heheheheh');
        navigate('/login')
        
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
    axios.get('/api/register',{withCredentials:true})
  .then((result) => {
    setsucces(true)
  }).catch((err) => {
    console.log(err);
  });
  },[])
  


  return (
   suces? <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate  sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                
              </Grid>
              <Grid item xs={12} sm={6}>
                
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Username"
                  name="name"
                  onChange={update}
                  value={value.name}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={update}
                  value={value.password}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I herby confirm with the terms and conditions "
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={contact}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>:null
  );
}
