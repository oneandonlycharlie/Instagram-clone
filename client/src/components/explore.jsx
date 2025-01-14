import "../styles/explore.css"
function Explore(){

    const explorePosts = [1,2,3,4,5,6,7,8,9,10]

    return (
        <>
         <h2>This is your explore feed</h2>
        <section className="explore">
            {explorePosts.map((i)=> (
                <Post key={i}/>
            ))}
        </section>
        </>
    )
}

function Post(){


    return (
        <div className="explore-post">
            <img src="" alt="explore post" />
        </div>
    )

}

export default Explore