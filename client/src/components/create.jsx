
function Create({closeWindow}){

  console.log("pop up created!")
    return (
        <div>
            <button
                onClick={closeWindow}
            >Close</button>
        </div>
    )
}

export default Create