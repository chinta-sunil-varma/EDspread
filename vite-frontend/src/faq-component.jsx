import React from "react";
import {Accordion,AccordionDetails,AccordionSummary,Typography} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function renderComp(prop)

{

    console.log('im in prop',prop);
    return(
        <Accordion sx={{textAlign:'center',margin:'10px'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            backgroundColor:'#A8E890',
            textAlign:'center'
          }}
        >
          <Typography sx={{
                fontFamily: 'Gemunu Libre, sans-serif',
                fontSize:'larger'

            }} >{prop.que}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight:'bolder'
          }}>
            {prop.ans}
          </Typography>
        </AccordionDetails>
      </Accordion>
    )
}

export default renderComp