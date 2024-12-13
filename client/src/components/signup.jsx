import { useEffect, useState } from "react"

function SignUp(){


const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [emailError, setEmailError] = useState('')
const [passwordError, setPasswordError] = useState('')

const onButtonClick = (e) => {
    console.log("I am clicked!")
    console.log(e.target.value)
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

    let route = "";

    if (e.target.value === "Sign up"){
        route = "/account/signup";
    } else if (e.target.value === "Log in"){
        route = "/account/login"
    }

    fetch(route,{
        method: "POST",
        body: JSON.stringify({
            email:email,
            password:password
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
        <>
        <h2>Log in here</h2>
        <div className='buttonContainer'>
            <input 
                type="text" 
                placeholder='Enter your email here'
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
              />
            <input 
                type="text" 
                placeholder='Enter your password here'
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
            />
            <input 
                type="button"
                value="Log in"
                onClick={onButtonClick}
            />
        </div>
        <h2>Sign up here!</h2>
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

export default SignUp