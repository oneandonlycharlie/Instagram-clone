import { useOutletContext, Link } from "react-router-dom"
import "../styles/feed.css"
import { useState } from "react";
function Feed(){

    const [userData,setUserData] = useOutletContext();

    // extracting posts for display
    const feedAccounts = [userData.user, ...userData.followees]
    const feedPosts = feedAccounts.reduce((acc,account,) => {
        return acc.concat(account.posts)
    },[])
    const recommendedUsers = userData.recommendations

    return (
        <div className="feedpage">
            <section className="feed">
                {feedPosts.map((post) => (
                <Post key={post.id} 
                        post={post}
                        accounts={feedAccounts}
                        setUserData={setUserData}
                />
                ))}
            </section>
            <section className="recommend">
                <p className="title">Suggested for you</p>
                {recommendedUsers.map((account)=> (
                    <div className="user" key={account.id}>
                        <img src={account.avatar} alt="" className="avatar" />
                        <p>{account.userName}</p>
                        <button>Follow</button>
                    </div>
                ))}
            </section>
        </div>
    )
}

function Post({post,accounts,setUserData}){
    const account = accounts.find((account)=> account.userName == post.postedBy)
    // send data back to server

    const [comment, setComment] = useState("")
    
    return (
       <div className="post">
            <div className="handle">
                <Link to={`/user/`+ account.userName} >
                    <img className='avatar' src={account.avatar} alt="profile pic" />
                </Link >
                <span className="name">{account.userName}</span>
                <span className="time">·</span>
                <span className="time">{post.postTime}</span>
            </div>
            <div className="image">
                <img src={post.image} alt="post image" />
            </div>
            <div className="buttons">
                <button >
                    <svg 
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
                            <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path>
                    </svg>
                </button>
                {/* To do: add a pop up display for comments */}
            </div>
            <div className="info">
                <p className="like">{post.noOfLikes} likes</p>
                <span className="name">{account.userName}</span>
                <span>{post.description}</span>
                <p>
                    <input 
                        type="text" 
                        name="" 
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={(e)=> setComment(e.target.value)}
                    />
                    <button>Post</button></p>
            </div>
       </div> 
    )

}

export default Feed