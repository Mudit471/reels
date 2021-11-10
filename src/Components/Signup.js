import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import { storage, database } from '../firebase';
function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup, currentUser } = useContext(AuthContext);
    const history = useHistory();
    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            let res = await signup(email, password);
            let uid = res.user.uid;
            console.log(uid);
            const uploadTaskListener = storage.ref(`/users/${uid}/file`).put(file);
            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            // fn 1 -> progress tracking
            // fn2 -> error
            // fn3 -> success
            uploadTaskListener.on('state_changed', fn1, fn2, fn3);
            function fn1(snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            }
            function fn2(error) {
                setError(error);
                setTimeout(() => {
                    setError('')
                }, 2000);
                setLoading(false);
            }
            async function fn3() {
                let downloadUrl = await uploadTaskListener.snapshot.ref.getDownloadURL();
                console.log(downloadUrl);
                await database.users.doc(uid).set({
                    email: email,
                    userId: uid,
                    username: name,
                    createdAt: database.getCurrentTimeStamp(),
                    profileUrl: downloadUrl,
                    postIds: []
                })
            }
            setLoading(false);
            console.log('Signed Up');
        }
        catch (error) {
            setError(error);
            setTimeout(() => {
                setError('')
            }, 2000);
            setLoading(false);
        }
    }
    const handleFileSubmit = (e) => {
        let file = e.target.files[0];
        console.log(file);
        if (file != null) {
            setFile(file);
        }
    }
    useEffect(()=>{
        if(currentUser){
            history.push('/');
        }
    },[currentUser])
    return (
        <div>
            <form onSubmit={handleSignup} >
                <div>
                    <label htmlFor=''>UserName</label>
                    <input type='text' value={name} onChange={(e) => setName(e.target.value)} />

                </div>
                <div>
                    <label htmlFor=''>Email</label>
                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor=''>Password</label>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='profile'>Profile Imgae</label>
                    <input type='file' accept='image/*' onChange={handleFileSubmit}></input>

                </div>
                <button type='submit' disabled={loading}>Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;