import React from "react";
import {
    Box, Typography, Accordion, AccordionSummary, AccordionDetails, Icon,

    FormControlLabel,
    TextareaAutosize,
    Button,
    Divider,
    IconButton



} from '@mui/material';

// all materialIcons import here
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Stack } from "@mui/system";
import axios from 'axios'
axios.defaults.withCredentials = true
function Administrative() {
    const [value, setValue] = React.useState('')
    const [qna, setqna] = React.useState({
        first: '',
        second: ''
    })
    const [status, setStatus] = React.useState(false)
    const [status2, setStatus2] = React.useState(false)
    const [data, setData] = React.useState([])
    const [data2, setData2] = React.useState([])
    const [renderStat, setRenderStat] = React.useState(false)

    function gettingFromDb() {

        axios.get('http://localhost:5000/')
            .then((result) => {
                result = result.data
                if(result.status)
               { setData2(result.rows)
                   setRenderStat(true)
            }
                else
                {console.log(result.reason);
                    document.write(result.reason)}


            }).catch((err) => {

            });
    }
    function gettingFromDbAct() {
        axios.get('http://localhost:5000/activity')
            .then((result) => {
                result = result.data

                if(result.status)
                setData(result.rows)
                else
                {document.write(result.reason)
              
                }

            }).catch((err) => {

            });
    }
    
    React.useEffect(gettingFromDb, [])
    React.useEffect(gettingFromDbAct, [])
    // console.log(status)
    // console.log(qna)
    console.log(value);

    // function increase() {
    //     setValue((prev) => {
    //         const arr = [...prev.content]
    //         const name = 'act' + prev.len
    //         arr.push(
    //             <FormControlLabel control={<TextareaAutosize
    //                 style={{
    //                     width: '400px',
    //                     marginBottom: '4px'
    //                 }}
    //                 placeholder="your new Activity goes here" name={name} />}

    //             />)

    //         console.log('inisde set value', prev);
    //         return (

    //             {
    //                 content: arr,
    //                 len: prev.len + 1


    //             }
    //         )
    //     })
    // }

    function updateqna(obj) {
        const { name, value } = obj.target
        if (name === 'question') {
            setqna((prev) => {
                return (
                    {
                        ...prev,
                        first: value
                    }
                )

            })
        }

        if (name === 'ans') {
            setqna((prev) => {
                return (
                    {
                        ...prev,
                        second: value
                    }
                )

            })
        }
    }
    async function postCall(obj) {

        axios.post('http://localhost:5000/', { ...qna }

        )
            .then((result) => {
                console.log(result.data);
                if (result.data) {
                    console.log(result)
                    
                   
                        setStatus(true)
                        setqna({
                            first: '',
                            second: ''
                        })
                        gettingFromDb()
                    
                }
                else {
                    document.write('login first to avail the feature')
                    console.log('failed!')
                    setqna({
                        first: '',
                        second: ''
                    })

                }

            }).catch((err) => {
                console.log(err)
            });


    }
    function displayset(obj) {
        console.log('hehe here', obj.target.name);

        setStatus(false)
        setStatus2(false)


    }

    function faqRefresh() {
        console.log('im triggered')
        gettingFromDb()
    }


    function postCallsec2(obj) {
        console.log('im in post call sec2');
        const payload = { value: value.toUpperCase(), withCredentials: true }
        axios.post('http://localhost:5000/activity', payload)
            .then((result) => {
                if (result.data) {
                    console.log(result)
                    setStatus2(true)
                    setValue('')
                    gettingFromDbAct()
                }
                else {
                    console.log('failure')

                    setValue('')

                }
            }).catch((err) => {
                console.log(err)
            });

    }

    return (
        
        renderStat?<>
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
                        <Box display='flex' justifyContent='center' alignItems='center' >
                            <Stack spacing={2}>
                                <Box>
                                    <Typography variant="body1"
                                        sx={{
                                            fontFamily: 'Gemunu Libre, sans-serif'
                                        }} component='div'>PREV POSTED FAQ <IconButton onClick={faqRefresh}><RefreshIcon /></IconButton></Typography>
                                    <Stack>
                                        {
                                            data2.map((item) => (
                                                <Box>
                                                    <Typography color='green'

                                                    >Q- {item.que.toUpperCase()}</Typography>
                                                    <Typography>{item.ans}</Typography>
                                                    <Divider color="red" />

                                                </Box>
                                            ))
                                        }
                                    </Stack>
                                </Box>
                                <Box>
                                    <Typography variant='h6'
                                        sx={{
                                            fontFamily: 'Gemunu Libre, sans-serif'
                                        }}

                                        component='div' display='block'>Enter the Data here</Typography>
                                </Box>
                                <br></br>
                                <form method='post' sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Stack spacing={2}>


                                        <FormControlLabel control={<TextareaAutosize

                                            style={{
                                                width: '400px',
                                                marginLeft: '12px'

                                            }}
                                            value={qna.first}
                                            onChange={updateqna}
                                            id='question'
                                            placeholder="your question goes here" name="question" required />}

                                        />

                                        <FormControlLabel control={<TextareaAutosize
                                            minRows={4}
                                            value={qna.second}
                                            style={{
                                                width: '400px'
                                            }}
                                            id='ans'
                                            onChange={updateqna}
                                            placeholder="your answer goes here" name="ans" required />}

                                        />
                                        <Button variant="outlined" onClick={postCall}>submit</Button>
                                    </Stack>
                                </form>
                                <Typography variant='h6' component='div'>
                                    {status ? <Button onClick={displayset} endIcon={<CloseIcon color="secondary"></CloseIcon>}>Succesfully Inserted</Button> : null}
                                </Typography>
                            </Stack>

                        </Box>
                    </AccordionDetails>

                </Accordion>
            </Box>
            
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
                                    <Typography variant='h6'
                                        sx={{
                                            fontFamily: 'Gemunu Libre, sans-serif'
                                        }}
                                        component='div'>PREV CLUB ACTIVITIES</Typography>
                                </Box>
                                {data.map((item) =>
                                (
                                    <Typography variant="h6" color='green' component='div'>{item.act.toUpperCase()}</Typography>
                                )

                                )}
                                {/* <Button
                                    startIcon={<AddIcon />}
                                    onClick={increase}
                                >ADD NEW ACTIVITY</Button> */}
                                <Box className="activity">
                                    <Typography variant='h6'
                                        sx={{
                                            fontFamily: 'Gemunu Libre, sans-serif'
                                        }}
                                        component='div'>NEW CLUB ACTIVITIES</Typography>
                                </Box>
                                <Box className='activityList'
                                    display='flex'
                                    flexDirection='column'
                                    marginTop={2}

                                    alignItems='center'
                                >
                                    <FormControlLabel control={<TextareaAutosize
                                        style={{
                                            width: '400px',
                                            marginBottom: '4px'
                                        }}
                                        value={value}
                                        onChange={(obj) => setValue(obj.target.value)}
                                        placeholder="your new Activity goes here" name='act' />}

                                    />

                                    <Button type='submit'
                                        onClick={postCallsec2}


                                        variant='outlined'>submit</Button>
                                    <Typography variant='h6' component='div'>
                                        {status2 ? <Button name='hehe' onClick={displayset} endIcon={<CloseIcon color="secondary"></CloseIcon>}>Succesfully Inserted</Button> : null}
                                    </Typography>

                                </Box>


                            </Stack>
                        </Box>

                    </AccordionDetails>

                </Accordion>

            </Box>
        </>:null
    )
}

export default Administrative