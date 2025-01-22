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
            <img className='avatar' src={user.avatar} alt="headshot" />
            <div>   
                <span className="name">{user.userName}</span>
                <button>Edit profile</button>
            </div>
            <div className="info">
                <span><span className="number">{user.posts.length}</span>posts</span>
                <span><span className="number">{user.noOfFollowers}</span>followers</span>
                <span><span className="number">{followees.length}</span>following</span>
            </div>
            <div>{user.bio}</div>
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

export default Profile