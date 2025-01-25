import "../styles/create.css"

function Create({closeWindow, user}){

  console.log("pop up created!")
    return (
        <div className="create">
            <div className="card">
                <h3>Create new post</h3>
                <img src="https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68" alt="Photo shows up here" />
                <div> 
                    <input type="text" placeholder="input image url"/>
                    <button>Submit</button>
                </div>
                <div className="input">
                    <div>
                        {/* <img src={user.avatar} alt="avatar" className="avatar" />
                        <span>{user.userName}</span> */}
                    </div>
                    <textarea name="" id="" placeholder="">
                    </textarea>
                </div>
                <button className="share">Share</button>
                <button className="close"
                    onClick={closeWindow}
                >Close</button>
            </div>
        </div>
    )
}

export default Create