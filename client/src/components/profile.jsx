import { useNavigate, useOutletContext, useParams} from "react-router-dom";
import "../styles/profile.css";
import { useState } from "react";
import Heart from "../assets/heart.svg"


function Profile(){

const [userData,setUserData]=useOutletContext()
const {username} = useParams()

let isEditable = true;
const getUser = ()=> {
    console.log(username)
    if (!username){
        return userData.user
    } else if (username == userData.user.username){
        return userData.user
    } else if (username){
        let displayUser = userData.demoUsers.find(account=>account.username == username)
        isEditable = false;
        return displayUser
    }
}
const user= getUser()

const posts = userData.posts.filter((post)=> post.username == user.username)

    return (
        <section className="profile">
            <Handle 
                user={user}
                editStatus={isEditable}
            />
            { posts? <AllPosts posts={posts}/> : <><p>You haven't posted any thing yet</p></>
            }
        </section>
    )
}

function Handle({user,editStatus}){
    const [editPageVisible, setEditVisibility] = useState(false)

    return (
        <div className="handle">
            <img className='avatar' src={user.avatar} alt="headshot" />
            <div>   
                <span className="name">{user.username}</span>
                {editStatus &&
                    <button onClick={()=>setEditVisibility(true)}
                    >Edit profile</button>
                }
            </div>
            <div className="info">
                <span><span className="number">{user.posts? user.posts.length:0}</span>posts</span>
            </div>
            <div className="bio">{user.bio}</div>
            {editPageVisible && 
                <EditPopup 
                    user={user}
                    close={()=> {
                        setEditVisibility(false);
                    }}
                />
            }
        </div>
    )
}

function AllPosts({posts}){

    return (
        <section className="my-posts">
            {posts.map((post)=> (
                <Post key={post.postid}
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
            <div className="content"><span>{post.nooflikes}<img src={Heart} alt=""/></span></div>
        </div>
    )

}

function EditPopup({user, close}){
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        id:user.userid,
        name:user.username,
        bio:user.bio})

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]:value
        }))
    }

    const submitInfo =(e) =>{
        e.preventDefault();
        console.log(formData);
        console.log("info submitted!");

        const route = "https://instagram-clone-backend-production.up.railway.app/account/profile"

        fetch(route,{
            method:"PUT",
            body: JSON.stringify(formData),
            headers:{
                "Content-Type":'application/json'
            },
            credentials: 'include'
        }).then((res)=>{
            console.log(res.status)
            close();
            navigate('/profile')
        });

    }

    return (
        <form className="edit" onSubmit={submitInfo}>
            <div className="buttons">
                <button onClick={close}>Close</button>
                <button type="submit">Submit</button>
            </div>
            <img className="avatar"src={user.avatar} alt="" />
            <input type="text" 
                value={formData.name}
                name="name"
                onChange={handleChange}/>
            <textarea id="" 
                value={formData.bio}
                name='bio'
                onChange={handleChange}
            ></textarea>
        </form>
    )

}

export default Profile