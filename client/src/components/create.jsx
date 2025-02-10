import "../styles/create.css"
import { useState } from "react"

function Create({closeWindow, user}){

const [postInfo, setPost] = useState({
    postedBy:null,
    image: null,
    description:"",
    noOfLikes:0,
    postTime: null
})

const handleShare=()=>{
    const date = new Date().toDateString()
    setPost({
        ...postInfo,
        postTime:date
    })
    console.log(postInfo)

    if (!postInfo.image){
        return
    }
    fetch("/account/post/share",{
        method:"POST",
        body:JSON.stringify(
            {post:postInfo}
        ),
        headers:{
            "Content-Type":"application/json"
        }
    }).then((res)=>{
        if (res.ok){
            setPost({
                postedBy:null,
                image: null,
                descriotion:"",
                noOfLikes:0,
                postTime: null
            })
            closeWindow()
        }
    })
}

    return (
        <div className="create">
            <div className="card">
                <h3>Create new post</h3>
                {postInfo.image? 
                    <><img className='upload-photo'src={postInfo.image} alt="" height={300}/></> 
                    : 
                    <img className='upload-logo' src="/upload-regular-24.png" alt="Upload photo" height={48}/>}
                <div>
                    <input 
                        className='url-link' 
                        type="text" 
                        placeholder="Paste image url here"
                        value={postInfo.image}
                        onChange={(e)=>{
                            setPost({
                                ...postInfo,
                                image:e.target.value
                            })
                        }}
                        />
                </div>
                <div className="text">
                    <div>
                        <div>
                            <img src={user.avatar} alt="avatar" className="avatar" />
                            <span>{user.username}:</span>
                        </div>
                    </div>
                    <textarea name="" id="" placeholder="Desciption goes here" 
                        value={postInfo.description}
                        onChange={(e)=>{
                            setPost({
                                ...postInfo,
                                description:e.target.value
                            })
                        }}>
                    </textarea>
                </div>
                <button className="share"
                    onClick={handleShare}
                >Share</button>
                <button className="close"
                    onClick={closeWindow}
                >Close</button>
            </div>
        </div>
    )
}

export default Create