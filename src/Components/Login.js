import { Avatar, Grid, Paper, TextField, Button, Typography, Link } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';

function Login() {
    const paperStyle = { padding: '3% 3%', height: '55vh', width: 280, margin: "7% auto 0% auto" }
    const headingStyle = {
        flexGrow: 1,
        color: 'black',
        fontFamily: 'Cursive'
    }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnStyle = { margin: '10% auto', backgroundColor: '#957bff' }
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, currentUser } = useContext(AuthContext);
    const history = useHistory();
    const handleSubmit = async (e) => {
        console.log('hi');
        e.preventDefault()
        try {
            console.log('Logging in user')
            setLoading(true)
            await login(email, password)
            setLoading(false)
            history.push('/')
        } catch {
            setError("Failed to log in")
            setTimeout(() => setError(''), 2000)
            setLoading(false)
        }
    }
    useEffect(() => {
        if (currentUser) {
            history.push('/')
        }
    }, [currentUser])
    return (
        <>
            <Paper>
                <Typography variant="h3" gutterBottom component="div" align='center' style={headingStyle}>
                    Reels
                </Typography>
            </Paper>
            <Grid>
                <form onSubmit={handleSubmit}>
                    <Paper elevation={10} style={paperStyle}>
                        <Grid align="center">
                            <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                            <h1>Sign In</h1>
                        </Grid>
                        <TextField label='Email' type='email' placeholder='Enter email' fullWidth required value={email} onChange={(e) => setEmail(e.target.value)} />
                        <TextField label='Password' type='password' placeholder='Enter password' type='password' fullWidth required value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Button style={btnStyle} type='submit' colort='primary' fullWidth variant='contained' disabled={loading} >Sign In</Button>
                        {error ? <Grid algin='center'>{error}</Grid> : <></>}
                        <Typography>Do you have an account?</Typography>
                        <Link href='/signup'>
                            Sign Up
                        </Link>
                    </Paper>
                </form>
            </Grid>
        </>
        // <div>
        //     <form onSubmit={handleSubmit} >
        //         <div>
        //             <label htmlFor=''>Email</label>
        //             <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        //         </div>
        //         <div>
        //             <label htmlFor=''>Password</label>
        //             <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        //         </div>
        //         <button type='submit' disabled={loading}>Login</button>
        //         {error ? <h1>{error}</h1> : <></>}
        //     </form>

        // </div>
    )
}

export default Login;