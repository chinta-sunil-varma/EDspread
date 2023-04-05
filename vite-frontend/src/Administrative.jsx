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
import { useNavigate } from 'react-router-dom'
axios.defaults.withCredentials = true




function Administrative() {

    const [apiConf, setapiConf] = React.useState(false)

    const navigate = useNavigate()
    React.useEffect(() => {
        axios.get('/api/status')
            .then((result) => {
                if (result.data.status) {
                    if (result.data.user === 'admin')
                        setapiConf(true)
                    else
                        navigate('/login')

                }
                else {
                    navigate('/login')
                    return
                }
            }).catch((err) => {

            });
    }, [])

    const [value, setValue] = React.useState('')
    const [qna, setqna] = React.useState({
        first: '',
        second: ''
    })
    const [status, setStatus] = React.useState(false)
    const [status2, setStatus2] = React.useState(false)
    const [data, setData] = React.useState([])
    const [data2, setData2] = React.useState([])

    console.log(data2)
    function gettingFromDb() {

        axios.get('/api/')
            .then((result) => {
                result = result.data
                if (result.status) {
                    setData2(result.rows)

                }
                else {
                    console.log(result.reason);
                    navigate('/')
                }


            }).catch((err) => {

            });
    }
    function gettingFromDbAct() {
        axios.get('/api/activity')
            .then((result) => {
                result = result.data

                if (result.status)
                    setData(result.rows)
                else {
                    navigate('/')

                }

            }).catch((err) => {

            });
    }
    React.useEffect(() => {
        if (apiConf)
            gettingFromDb()
    }, [apiConf])

    React.useEffect(() => {
        if (apiConf)
            gettingFromDbAct()
    }, [apiConf])

    console.log(value);



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

        axios.post('/api/', { ...qna }

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
        axios.post('/api/activity', payload)
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

    function delfaq(obj) {
        const { id } = obj.target
        console.log(id);
        axios.post('/api/del/faq', { key: id })
            .then((result) => {
                result = result.data
                if (result.status)
                    gettingFromDb()

            }).catch((err) => {

            });
    }

    function delact(obj) {
        const { id } = obj.target
        console.log(id);
        axios.post('/api/del/act', { key: id })
            .then((result) => {
                result = result.data
                if (result.status)
                    gettingFromDbAct()

            }).catch((err) => {

            });
    }

    function logout() {
        axios.post('/api/logout')
            .then((result) => {
                result = result.data
                if (result.status) {
                    console.log('logged out succesfully');
                    navigate('/login')
                }
            }).catch((err) => {

            });
    }

    return (

        apiConf ? <>
            <Box display='flex' justifyContent='space-between'
                color='whitesmoke'
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
                <Button sx={{color:'black',marginLeft:'60%',backgroundColor:'whitesmoke'}} variant='contained'
                    onClick={()=>navigate('/')}
                >Home</Button>
                <Button sx={{color:'black',backgroundColor:'whitesmoke'}} variant='contained'
                    onClick={logout}
                >LOGOUT</Button>
                
            </Box>
            <Box marginBottom={2}
                sx={{ color: 'whitesmoke', backgroundColor: 'black' }}
            >
                <Accordion
                    sx={{
                        backgroundColor: '#757C95',
                        color: 'whitesmoke'
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <Icon  ><AddIcon /></Icon>    <Typography variant="body1" component='div'> ADD FAQ</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ backgroundColor: '#141B41' }}>
                        <Box display='flex' justifyContent='center' alignItems='center' >
                            <Stack spacing={2}>
                                <Box>
                                    <Typography variant="body1"
                                        sx={{
                                            fontFamily: 'Gemunu Libre, sans-serif',
                                            fontSize: '200%'
                                        }} component='div'>PREV POSTED FAQ <IconButton onClick={faqRefresh}><RefreshIcon /></IconButton></Typography>
                                    <Stack>
                                        {

                                            data2.map((item) => (
                                                <>

                                                    <Box key={item.key}  >
                                                        <Typography color='#98B9F2'

                                                        >Q- {item.que.toUpperCase()}</Typography>
                                                        <Typography>{item.ans}</Typography>
                                                        <Divider color="red" />
                                                        <Button id={item.key} onClick={delfaq}>DELETE</Button>

                                                    </Box></>
                                            ))
                                        }
                                    </Stack>
                                </Box>
                                <Box>
                                    <Typography variant='h6'
                                        sx={{
                                            fontFamily: 'Gemunu Libre, sans-serif',
                                            fontSize: '200%'
                                        }}

                                        component='div' display='block'>Enter the Data here</Typography>
                                </Box>
                                <br></br>
                                <form method='post' sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Stack spacing={2}>


                                        <FormControlLabel control={<TextareaAutosize

                                            style={{
                                                width: '400px',
                                                marginLeft: '12px',
                                                backgroundColor: 'rgba(0,0,0,0.1)',
                                                color: ' #f2da11',
                                                fontSize: '150%',


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
                                                width: '400px',
                                                backgroundColor: 'rgba(0,0,0,0.1)',
                                                color: ' #f2da11',
                                                fontSize: '150%',
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
                <Accordion
                    sx={{
                        backgroundColor: '#757C95',
                        color: 'whitesmoke'
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}>
                        <Icon  ><AddIcon /></Icon>    <Typography variant="body1" component='div'>  CLUB ACTIVITIES</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ backgroundColor: '#141B41' }}>
                        <Box display='flex' justifyContent='center'>
                            <Stack>
                                <Box className="activity">
                                    <Typography variant='h6'
                                        sx={{
                                            fontFamily: 'Gemunu Libre, sans-serif',
                                            fontSize: '200%'
                                        }}
                                        component='div'>PREV CLUB ACTIVITIES</Typography>
                                </Box>
                                {data.map((item) =>
                                (
                                    <>
                                        <Typography variant="h6" color='#98B9F2' component='div'>{item.act.toUpperCase()}</Typography>
                                        <Button sx={{ display: 'inline' }} onClick={delact} id={item.key}>DELETE</Button></>
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
                                            marginBottom: '4px',
                                            backgroundColor: 'rgba(0,0,0,0.1)',
                                                color: ' #f2da11',
                                                fontSize: '150%',
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

        </> : null

    )
}

export default Administrative