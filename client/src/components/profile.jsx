import { useOutletContext } from "react-router-dom"
import "../styles/profile.css"
function Profile(){

    const [userData,setUserData]=useOutletContext()


    return (
        <section className="profile">
            <Handle 
                user={userData.user}
                followees={userData.followees}
            />
            <AllPosts posts={userData.user.posts}/>
        </section>
    )
}

function Handle({user, followees}){

    console.log(user)
    return (
        <div className="handle">
            <img src={user.avatar} alt="headshot" />
            <div>   
                <span>{user.userName}</span>
                <button>Edit profile</button>
            </div>
            <div>
                <span>number of posts - {user.posts.length}</span>
                <span>number of followers - N/A</span>
                <span>number of following - {followees.length} </span>
            </div>
            <span>{user.bio}</span>
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
        </div>
    )

}

export default Profile