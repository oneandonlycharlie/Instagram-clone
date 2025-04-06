import { useState,useEffect } from "react";
import { Link } from "react-router-dom";

function Post({post,accounts,setUserData, comments}){
    const account = accounts.find((account)=> account.username == post.username)
    const commentList = comments.filter((comment)=> comment.matchid == post.postid)
    const [commentInput, setComment] = useState("")
    const [likeCount,setLikeCount] = useState({
        isLiked:false,
        likeCount:post.nooflikes
    })

    useEffect(()=>{
        setLikeCount(prev => ({
            ...prev,
            likeCount: prev+1,
        }));
    }, [likeCount.isLiked])

    const handleLike = (e)=>{
        console.log("I am clicekd")
        // send data back to server
        fetch("http://instagram-clone-backend-production.up.railway.app/account/post/like",{
            method: "PUT",
            body:JSON.stringify({postid:post.postid}),
            headers:{
                "Content-Type":"application/json"
            },
            credentials: 'include'
        })
            .then((res)=>{
                console.log(res.status)
                if (res.ok){
                    console.log('like completed!')
                    setLikeCount(prev => ({
                        ...prev,
                        isLiked:true
                    }));
                }
                return res.json()
            })
            .then((res)=>{
                setUserData(res.data);
            })
    }
    
    const handleComment = ()=>{
        if (commentInput == ''){
            return
        }
        console.log('I made a comment!')
    
        fetch("http://instagram-clone-backend-production.up.railway.app/account/post/comment",{
            method:"POST",
            body: JSON.stringify({
                postid:post.postid,
                comment:commentInput,
            }),
            headers:{
                "Content-Type":"application/json"
            },
            credentials: 'include'
        })
            .then((res)=>{
                console.log(res.status)
                return res.json()
            })
            .then((res)=>{
                console.log('resetting data');
                console.log(res);
                setUserData(res.data);
                setComment('Leave a comment');
            })
    }

    console.log(commentList)
    return (
       <div className="post">
            <div className="handle">
                <Link to={`/profile/`+ account.username} >
                    <img className='avatar' src={account.avatar} alt="profile pic" />
                </Link >
                <span className="name">{account.username}</span>
                <span className="time">·</span>
                <span className="time">{post.posttime}</span>
            </div>
            <div className="image">
                <img src={post.image} alt="post image" />
            </div>
            <div className="buttons">
                <button 
                    onClick={handleLike}>
                    <svg className={likeCount.isLiked? 'liked':''}
                        aria-label="Like" 
                        fill="currentColor" 
                        height="20" 
                        role="img" 
                        viewBox="0 0 24 24" 
                        width="20">
                            <title>Like</title>
                            <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                    </svg>
                </button>
                <button>
                    <svg 
                        aria-label="Comment" 
                        fill="currentColor" 
                        height="20" 
                        role="img" 
                        viewBox="0 0 24 24" 
                        width="20">
                            <title>Comment</title>
                            <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                </button>
            </div>
            <div className="info">
                <p className="like">{post.nooflikes} likes</p>
                <span className="name">{account.username}</span>
                <span>{post.description}</span>
                <p>
                    <input 
                        type="text" 
                        name="" 
                        placeholder="Leave a comment..."
                        value={commentInput}
                        onChange={(e)=> setComment(e.target.value)}
                    />
                    <button onClick={handleComment}>Post</button></p>
            </div>
            <div className="comments">
                {commentList && commentList.map((item)=>(
                    <p key={item.commentid}>- {item.comment}</p>
                ))}
            </div>
       </div> 
    )

}

export default Post