import React from "react";
import {
    Box, Typography, Accordion, AccordionSummary, AccordionDetails, Icon,

    FormControlLabel,
    TextareaAutosize,
    Button


} from '@mui/material';

// all materialIcons import here
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import { Stack } from "@mui/system";

function Administrative() {
    const [value, setValue] = React.useState({
        content: [],

    })
    console.log(value)

    function increase() {
        setValue((prev) => {
            const arr = [...prev.content]
            arr.push(
                <FormControlLabel control={<TextareaAutosize
                    style={{
                        width: '400px',
                        marginBottom:'4px'
                    }}
                    placeholder="your new Activity goes here" name='' />}

                />)

            console.log('inisde set value', prev);
            return (

                {
                    content: arr,



                }
            )
        })
    }

    return (
        <>
            <Box display='flex' justifyContent='center'
                sx={{
                    backgroundColor: 'brown',
                    marginBottom: '30px'
                }}
            >
                <Typography variant="h4" component='h4'
                    sx={{
                        fontFamily: 'Gemunu Libre, sans-serif'
                    }}

                >ADMINISTRATIVE PANEL</Typography>
            </Box>
            <Box marginBottom={2}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <Icon  ><AddIcon /></Icon>    <Typography variant="body1" component='div'> ADD FAQ</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box display='flex' justifyContent='center' >
                            <Stack spacing={2}>
                                <Box>
                                    <Typography variant='h6'
                                        sx={{
                                            fontFamily: 'Gemunu Libre, sans-serif'
                                        }}

                                        component='div' display='block'>Enter the Data here</Typography>
                                </Box>
                                <br></br>
                                <FormControlLabel control={<TextareaAutosize
                                    style={{
                                        width: '400px'
                                    }}
                                    placeholder="your question goes here" name="question" />}

                                />

                                <FormControlLabel control={<TextareaAutosize
                                    minRows={4}
                                    style={{
                                        width: '400px'
                                    }}
                                    placeholder="your answer goes here" name="ans" />}

                                />
                                <Button variant="outlined" type='submit'>submit</Button>
                            </Stack>

                        </Box>
                    </AccordionDetails>

                </Accordion>
            </Box>
            {/* club activites accordion */}
            <Box>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}>
                        <Icon  ><AddIcon /></Icon>    <Typography variant="body1" component='div'>  CLUB ACTIVITIES</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box display='flex' justifyContent='center'>
                            <Stack>
                                <Box className="activity">
                                    <Typography variant='h6' component='div'>PREV CLUB ACTIVITIES</Typography>
                                </Box>
                                <Button
                                    startIcon={<AddIcon />}
                                    onClick={increase}
                                >ADD NEW ACTIVITY</Button>
                                <Box className='activityList'
                                    display='flex'
                                    flexDirection='column'
                                  
                                    alignItems='center'
                                >
                                    {value.content}
                                    <Button type='submit'
                                    sx={{
                                        width:'20%'
                                    }}
                                     variant='contained'>submit</Button>
                                </Box>


                            </Stack>
                        </Box>

                    </AccordionDetails>

                </Accordion>

            </Box>
        </>
    )
}

export default Administrative