import { useEffect, useState } from "react"
import InstagramLogo from "../assets/logoWhite.svg"
import '../styles/login.css'

function LogIn({setLogin,setUserData}){

const [requireSignup, openSignup] = useState(false)
const [signupSuccess, setSuccess] = useState(false)
const [loginInfo, setLoginInfo] = useState({
    userName: '',
    password: ''
})

const [signupInfo, setSignupInfo] = useState({
    newUserName:'',
    newPassword:'',
    nameError:'',
    passwordError:''
})

// set up guest access to bypass sign up
const [isGuest, setGuest] = useState(false)

useEffect(()=>{
    handleLogIn()
},[isGuest])

const guestLogin = ()=>{
    setLoginInfo({
        userName:"Charlie",
        password:"123456"
    });
    setGuest(true)
}

const handleLogIn = ()=>{
        console.log("logging in..")
        console.log(loginInfo)
        const route = "https://instagram-clone-backend-production.up.railway.app/account/login"

        fetch(route,{
            method: "POST",
            body: JSON.stringify({
                userName:loginInfo.userName,
                password:loginInfo.password
            }),
            headers:{
                "Content-Type":"application/json"
            },
            credentials: 'include'

        })
        .then((res)=> {
            return res.json()
        }).then((res)=>{
            console.log(res)
            if (res.message == 'Log in successful'){
                setLogin(res.isAuthenticated)
                setUserData(res.data)
            } else if (res.message == 'failed to log in, try again'){
                // send error reminder
            }
        })
}

const handleSignup = ()=>{
    console.log("signing up")
    // reset error values 
    setSignupInfo(prevInfo => ({
        ...prevInfo,
        nameError:"",
        passwordError:"",
    }))

    // data verification
    if (signupInfo.newUserName === "") {
        setSignupInfo(prevInfo => ({
            ...prevInfo,
            nameError:"*Username cannot be empty"
        }))
        return
    }
    if (signupInfo.password === "") {
        setSignupInfo(prevInfo => ({
            ...prevInfo,
            passwordError:"*Password cannot be empty"
        }))
        return
    } else if (signupInfo.newPassword.length < 5){
        setSignupInfo(prevInfo => ({
            ...prevInfo,
            passwordError:"*Password must be longer than 5 letters"
        }))
        return
    }
    console.log(signupInfo)

    // pass in data to server for verification
    const route = "https://instagram-clone-backend-production.up.railway.app/account/signup";

    fetch(route,{
        method: "POST",
        body: JSON.stringify({
            userName: signupInfo.newUserName,
            password:signupInfo.newPassword
        }),
        headers:{
            "Content-Type":"application/json"
        },
        credentials: 'include'

    })
        .then((res)=> {
            console.log(res);
            if (res.status == "200"){
                setSuccess(true)
            }
        })
}


    return (
        <div className="login">
        <img src={InstagramLogo} alt="Instagram" className="logo"/>
        <div className='buttonContainer'>
            <input 
                type="text" 
                placeholder='Username'
                value={loginInfo.userName}
                onChange={(e)=>setLoginInfo(prevInfo=>({
                    ...prevInfo,
                    userName:e.target.value
                }))}
              />
            <input 
                type="text" 
                placeholder='Password'
                value={loginInfo.password}
                onChange={(e)=>setLoginInfo(prevInfo=>({
                    ...prevInfo,
                    password:e.target.value
                }))}
            />
            <button
                type="submit"
                onClick={handleLogIn}>
            Log in</button>
        </div>
        <p>Don't have an account? <a target="_blank" onClick={()=>openSignup(true)}>Sign up</a></p>
        <span>OR</span>
        <button type="submit"
                onClick={guestLogin}
         >Continue as guest</button>

        {requireSignup && 
            <>
                <span className="pass"></span>
                <div className="signup">
                    {signupSuccess?
                        <h3>Sign Up Successful! Please log in</h3>
                        :
                        <>
                        <h3>Sign Up</h3>
                        <input 
                            type="text"
                            placeholder="Username"
                            value={signupInfo.newUserName}
                            onChange={(e)=>setSignupInfo(prevInfo=>({
                                ...prevInfo,
                                newUserName:e.target.value
                            }))}
                        />
                        <label className="errorLabel">{signupInfo.nameError}</label>
                        <input 
                            type="text"
                            placeholder="Password"
                            value={signupInfo.newPassword}
                            onChange={(e)=>setSignupInfo(prevInfo=>({
                                ...prevInfo,
                                newPassword:e.target.value
                            }))}
                        />
                        <label className="errorLabel">{signupInfo.passwordError}</label>
                        <button type="submit"  
                            onClick={handleSignup}>
                        Sign up</button>
                        </>}
                    <button onClick={()=>openSignup(false)}
                    >Close</button>
                </div>
            </>
        }
        </div>
    )
}

export default LogIn