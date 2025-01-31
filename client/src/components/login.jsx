import { useEffect, useState } from "react"
import InstagramLogo from "../assets/logoWhite.svg"
import '../styles/login.css'

function LogIn(){

const [requireSignup, openSignup] = useState(false)
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

const handleLogIn = ()=>{
        console.log("loggin in..")

        const route = "/account/login"

        fetch(route,{
        method: "POST",
        body: JSON.stringify({
            userName:loginInfo.userName,
            password:loginInfo.password
        }),
        headers:{
            "Content-Type":"application/json"
        }

    })
        .then((res)=> {
            console.log(res.status)
        })
}

const handleSignup = ()=>{
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
    } else if (signupInfo.password.length < 5){
        setSignupInfo(prevInfo => ({
            ...prevInfo,
            passwordError:"*Password must be longer than 5 letters"
        }))
        return
    }

    // pass in data to server for verification
    const route = "/account/signup";

    fetch(route,{
        method: "POST",
        body: JSON.stringify({
            userName:loginInfo.userName,
            password:loginInfo.password
        }),
        headers:{
            "Content-Type":"application/json"
        }

    })
        .then((res)=> {
            console.log(res.status)
        })
}


    return (
        <div className="login">
        <img src={InstagramLogo} alt="Instagram" className="logo"/>
        <form className='buttonContainer'>
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
        </form>
        <p>Don't have an account? <a target="_blank" onClick={()=>openSignup(true)}>Sign up</a></p>
        <span>OR</span>
        <button >Continue as guest</button>

        {requireSignup && 
            <>
                <span className="pass"></span>
                <div className="signup">
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
                    <button onClick={()=>openSignup(false)}
                    >Close</button>
                </div>
            </>
        }
        </div>
    )
}

export default LogIn