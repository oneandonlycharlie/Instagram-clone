import { useOutletContext } from "react-router-dom"
import "../styles/explore.css"
function Explore(){

    const [userData,setUserData] = useOutletContext()
    const posts = userData.posts

    return (
        <section className="explore">
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
        <div className="image-container">
            <img src={post.image} alt="explore post" />
            <div className="content">
                <span>{post.nooflikes} likes</span>  
            </div>
        </div>
    )

}

export default Explore