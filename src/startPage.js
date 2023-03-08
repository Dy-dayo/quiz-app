
export default function startPage(props){
    
    return(
        <div className="startPage">
            <h1>Quizzical</h1>
            <p>You are welcome to take this Quiz<br/>Take a test on sport🔮</p>
            <button onClick={props.postQuiz}>Start Quiz</button>
        </div>
    )
}