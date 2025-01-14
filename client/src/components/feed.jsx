import ForYou from "./recommendations"
import "../styles/feed.css"
function Feed(){

    const numbers = [1,2,3,4,5]

    return (
        <>
         <section className="feed">
            {numbers.map((i) => (
               <Post key={i} />
            ))}
         </section>
         {/* <ForYou /> */}
        </>
    )
}

function Post(){


    return (
       <div className="post">
            <div className="handle">
                <img src="" alt="profile pic" />
                <span>username</span>
                <span>posted at ..</span>
            </div>
            <div className="post-image">
                <img src="" alt="post image" />
            </div>
            <div className="buttons">
                <button>Like</button>
                <button>Comments</button>
                {/* To do: add a pop up display for comments */}
            </div>
            <div className="info">
                <p>number of likes</p>
                <span>username</span>
                <span>postdescribtion goes here dfsdf</span>
                <p><input type="text" name="" id="" placeholder="Add a comment..."/><button>Post</button></p>
            </div>
       </div> 
    )

}

export default Feed