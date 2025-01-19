import { useOutletContext } from "react-router-dom"
import "../styles/explore.css"
function Explore(){

    const [userData,setUserData] = useOutletContext()
    const posts = userData.recommendations.reduce((acc,account)=>{
        return acc.concat(account.posts)
    },[])

    return (
        <section className="explore">
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
        <div className="explore-post">
            <img src={post.image} alt="explore post" />
        </div>
    )

}

export default Explore