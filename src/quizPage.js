
export default function quizPage(props){
    const {selected,selectedTwo,selectedThree,selectedFour,
        questions,optionOne,optionTwo,optionThree,
        optionFour,chooseOption,id}= props

    let styles = {
        backgroundColor: selected? "#D6DBF5":'',
        border:selected? 'none':'1px solid #293264'
    }
    let styleTwo ={
        backgroundColor: selectedTwo? "#D6DBF5":'',
        border:selectedTwo? 'none':'1px solid #293264'
    }
    let styleThree= {
        backgroundColor: selectedThree? "#D6DBF5":'',
        border:selectedThree? 'none':'1px solid #293264'
    }
    let styleFour = {
        backgroundColor: selectedFour? "#D6DBF5":'',
        border:selectedFour? 'none':'1px solid #293264'
    }

    return(
        <div className="quiz">
            <p className="quiz-question">{questions} </p>
            <div className="quiz-option-div">
                <span className="option option-one" style={styles} onClick={chooseOption} data-option-one={id} >{optionOne}</span>
                <span className="option option-two" style={styleTwo} onClick={chooseOption} data-option-two={id}>{optionTwo}</span>
                <span className="option option-three" style={styleThree}onClick={chooseOption} data-option-three={id}>{optionThree}</span>
                <span className="option option-four" style={styleFour} onClick={chooseOption} data-option-four={id}>{optionFour}</span>
            </div>
            
        </div>
    )

} 