import React from 'react'

import {Box,Typography, Paper,Stack} from '@mui/material'
import RenderComp  from './faq-component'
import axios from 'axios'



function Faq()

{
    const[data,setData]=React.useState([])

    React.useEffect(() => {
        axios.get('http://localhost:5000/')
            .then((result) => {
                result = result.data
                setData(result)


            }).catch((err) => {

            });
    }, [])
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
    <Box>
        <Stack>
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