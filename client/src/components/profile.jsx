import { useOutletContext, useParams } from "react-router-dom"
import "../styles/profile.css"
import { useState } from "react"


function Profile(){

const [userData,setUserData]=useOutletContext()
const {username} = useParams()
let isEditable = true;
const getUser = ()=> {
    console.log(username)
    if (!username){
        return userData.user
    } else if (username == userData.user.userName){
        return userData.user
    } else if (username){
        let displayUser = userData.followees.find(account=>account.userName == username)
        isEditable = false;
        return displayUser
    }
}
const user= getUser()
console.log(user)

    return (
        <section className="profile">
            <Handle 
                user={user}
                editStatus={isEditable}
            />
            <AllPosts posts={user.posts}/>
        </section>
    )
}

function Handle({user,editStatus}){

    const [editPageVisible, setEditVisibility] = useState(false)

    return (
        <div className="handle">
            <img className='avatar' src={user.avatar} alt="headshot" />
            <div>   
                <span className="name">{user.userName}</span>
                {editStatus &&
                    <button onClick={()=>setEditVisibility(true)}
                    >Edit profile</button>
                }
            </div>
            <div className="info">
                <span><span className="number">{user.posts.length}</span>posts</span>
                <span><span className="number">{user.noOfFollowers}</span>followers</span>
                <span><span className="number">{user.noOfFollowees}</span>following</span>
            </div>
            <div>{user.bio}</div>
            {editPageVisible && 
                <EditPopup 
                    user={user}
                    close={()=> setEditVisibility(false)}
                />
            }
        </div>
    )
}

function AllPosts({posts}){

    return (
        <section className="my-posts">
            {posts.map((post)=> (
                <Post key={post.id}
                      post={post}
                
                />
            ))}
        </section>
    )
}

function Post({post}){


    return (
        <div className="my-post">
            <img src={post.image} alt="my post" />
            <div className="content"><span>{post.noOfLikes} likes xx comments</span></div>
        </div>
    )

}

function EditPopup({user, close}){

    const [name, setName] = useState(user.userName)
    const [bio, setBio] = useState(user.bio)

    return (
        <div className="edit">
            <div className="buttons">
                <button onClick={close}>Close</button>
                <button>Submit</button>
            </div>
            <img className="avatar"src={user.avatar} alt="" />
            <input type="text" 
                value={name}
                onChange={(e)=>setName(e.target.value)}/>
            <textarea name="" id="" 
                value={bio}
                onChange={(e)=>setBio(e.target.value)}
            ></textarea>
        </div>
    )

}

export default Profile