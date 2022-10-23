import React from 'react'

import {Box,Typography, Paper,Stack} from '@mui/material'
import RenderComp  from './faq-component'
import axios from 'axios'

axios.defaults.withCredentials=true

function Faq()

{
    const[data,setData]=React.useState([])
   React.useEffect(()=>{
                  
    axios.get('http://localhost:5000/')
    .then((result) => {
        result = result.data
        if(result.status)
       { setData(result.rows)
         
    }
        else
        {console.log(result.reason);
            document.write(result.reason)}


    }).catch((err) => {

    });

   },[])
    
    return(
        <>
        <Box display='flex' justifyContent='center'
        sx={{
            backgroundColor: '#628E90',
            marginBottom: '30px'
        }}
    >
        <Typography variant="h4" component='h4'
            sx={{
                fontFamily: 'Gemunu Libre, sans-serif'
            }}

        >SOME COMMONLY ASKED FAQ'S</Typography>
    </Box>
    <Box sx={{display:'flex',justifyContent:'center'}}>
        <Stack sx={{width:'50%'}}>
             <Paper>
               {data.map((item)=>
               (
                   <RenderComp ans={item.ans} que={item.que}/>
               ))}
             </Paper>
        </Stack>

    </Box>
    </>
    )
    
}

export default Faq