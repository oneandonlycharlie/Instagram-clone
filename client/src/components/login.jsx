import { useState } from "react"
function Login(){

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [emailError, setEmailError] = useState('')
const [passwordError, setPasswordError] = useState('')

const onButtonClick = () => {
    console.log("I am clicked!")
    console.log(email)
    console.log(password)
    // reset error values 
    setEmailError('')
    setPasswordError('')

    if (email === "") {
        setEmailError('Please enter your email')
        return
    }
    if (password === "") {
        setPasswordError('Please enter a password')
        return
    } else if (password.length < 7){
        setPasswordError("Password must contain at least 8 charaters.")
        return
    }

    fetch("/api",{
        method: "POST",
        body: JSON.stringify({
            email:email,
            password:password
        }),
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }

    })
        .then((res)=> {
            console.log(res.status)
        })
}

    return (
        <>
        <h1>This is the log in portal</h1>
        <input 
            type="text"
            placeholder="Enter your email here"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
        />
        <label className="errorLabel">{emailError}</label>
        <input 
            type="text"
            placeholder="Enter your password here"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
        />
        <label className="errorLabel">{passwordError}</label>
        <input type="button" value="Sign up" 
            onClick={onButtonClick}
        />
        </>
    )
}

export default Login