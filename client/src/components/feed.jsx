import { useOutletContext } from "react-router-dom"
import "../styles/feed.css"
import Post from "./post";

function Feed(){

    const [userData,setUserData] = useOutletContext();

    // extracting posts for display
    const feedAccounts = [userData.user, ...userData.demoUsers]
    const feedPosts = userData.posts
    const feedComments = userData.comments
    feedPosts.sort((a, b)=> a.postid - b.postid)

    console.log(feedAccounts)
    console.log(feedPosts)
    console.log('this is all comments',feedComments)

    // const recommendedUsers = userData.recommendedUsers

    return (
        <div className="feedpage">
            <section className="feed">
                {feedPosts.map((post) => (
                <Post key={post.postid} 
                        post={post}
                        accounts={feedAccounts}
                        setUserData={setUserData}
                        comments={feedComments}
                />
                ))}
            </section>
            {/* <section className="recommend">
                <p className="title">Suggested for you</p>
                {recommendedUsers.map((account)=> (
                    <div className="user" key={account.id}>
                        <img src={account.avatar} alt="" className="avatar" />
                        <p>{account.userName}</p>
                        <button>Follow</button>
                    </div>
                ))}
            </section> */}
        </div>
    )
}

export default Feed