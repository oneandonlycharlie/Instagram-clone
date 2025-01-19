import { useOutletContext } from "react-router-dom"
import "../styles/feed.css"
import ForYou from "./recommendations"
function Feed(){

    const [userData,setUserData] = useOutletContext();

    // extracting posts for display
    const feedAccounts = [userData.user, ...userData.followees]
    const feedPosts = feedAccounts.reduce((acc,account,) => {
        return acc.concat(account.posts)
    },[])

    return (
        <>
         <section className="feed">
            {feedPosts.map((post) => (
             
               <Post key={post.id} 
                     post={post}
                     accounts={feedAccounts}
                    
               />
            ))}
         </section>
         {/* <ForYou /> */}
        </>
    )
}

function Post({post,accounts}){
    const account = accounts.find((account)=> account.userName == post.postedBy)
    console.log(post)
    console.log(account)
    return (
       <div className="post">
            <div className="handle">
                <img className='avatar' src={account.avatar} alt="profile pic" />
                <span>{account.userName}</span>
                <span>{post.postTime}</span>
            </div>
            <div className="image">
                <img src={post.image} alt="post image" />
            </div>
            <div className="buttons">
                <button>Like</button>
                <button>Comments</button>
                {/* To do: add a pop up display for comments */}
            </div>
            <div className="info">
                <p>{post.noOfLikes} likes</p>
                <span>{account.userName}</span>
                <span>{post.description}</span>
                <p><input type="text" name="" id="" placeholder="Add a comment..."/><button>Post</button></p>
            </div>
       </div> 
    )

}

export default Feed