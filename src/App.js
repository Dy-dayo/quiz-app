import blobOne from './images/top-blob.png'
import blobTwo from './images/lower-blob.png'
import StartPage from './startPage'
import QuizPage from './quizPage'
import { useState,useEffect } from 'react'
import { nanoid } from 'nanoid'
import './App.css'

function App(){
    const [Quiz, setQuiz] = useState([])
    const [startQuiz, setStartQuiz] = useState(false)

    const [score,setScore] = useState(0)
    const [answerChecked, setAnswerChecked]= useState(false)
    const [error, setError] = useState(false)
    
    function shuffleArray(myArray) {
        for (let i = myArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            const temp = myArray[i]
            myArray[i] = myArray[j]
            myArray[j] = temp
        }
        return myArray
    }
    function decodeHtml(html) {
        var txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    }

    function fetchQuestions(){
        fetch('https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple')
        // fetch('https://opentdb.com/api.php?amount=10&category=20&difficulty=medium&type=multiple')
            .then(res=>res.json())
            .then(data=>{
                let quizArray =[]
                for (let quiz of data.results){
                    let option = quiz.incorrect_answers
                    option.push(quiz.correct_answer)
                    
                    quizArray.push({
                        question:decodeHtml(quiz.question),
                        options:shuffleArray(option),
                        answer: decodeHtml(quiz.correct_answer),
                        selected:false,
                        selectedTwo:false,
                        selectedThree:false,
                        selectedFour:false,
                        id:nanoid(),
                    })
                }
                setQuiz(quizArray)
            })
            .catch(err=>{
                setError(true)
                console.log(err)
            })
    }

    useEffect(()=>{
        fetchQuestions()
    },[])

    function postQuiz(){
        if(answerChecked){
            fetchQuestions()
            setAnswerChecked(false)
        }
        setStartQuiz(true)
    }

    function chooseOption(e,id){
        if(e.target.dataset.optionOne){
            setQuiz(prevQuiz=>prevQuiz.map(quiz=>{
                return quiz.id === id?
                 {...quiz, 
                    selected:!quiz.selected,
                    selectedTwo:false,
                    selectedThree:false,
                    selectedFour:false
                }
                 :quiz
            }))
        }
        if(e.target.dataset.optionTwo){
            setQuiz(prevQuiz=>prevQuiz.map(quiz=>{
                return quiz.id === id?
                 {...quiz, 
                    selected:false,
                    selectedTwo:!quiz.selectedTwo,
                    selectedThree:false,
                    selectedFour:false
                }
                 :quiz
            }))
        }
        if(e.target.dataset.optionThree){
            setQuiz(prevQuiz=>prevQuiz.map(quiz=>{
                return quiz.id === id?
                 {...quiz, 
                    selected:false,
                    selectedTwo:false,
                    selectedThree:!quiz.selectedThree,
                    selectedFour:false
                }
                 :quiz
            }))
        }
        if(e.target.dataset.optionFour){
            setQuiz(prevQuiz=>prevQuiz.map(quiz=>{
                return quiz.id === id?
                 {...quiz, 
                    selected:false,
                    selectedTwo:false,
                    selectedThree:false,
                    selectedFour:!quiz.selectedFour
                }
                 :quiz
            }))
        }
    }
    function checkAnswer(){
        let count = 0
        let answers = []
        const optionOne = document.getElementsByClassName('option-one')
        const optionTwo = document.getElementsByClassName('option-two')
        const optionThree = document.getElementsByClassName('option-three')
        const optionFour = document.getElementsByClassName('option-four')

        for (let i=0; i<Quiz.length;i++){
            answers.push(Quiz[i].answer)
            if(Quiz[i].selected){

                optionOne[i].textContent === answers[i] ?
                count++ : optionOne[i].style.backgroundColor='#F37059'
            }

            else if(Quiz[i].selectedTwo){

                optionTwo[i].textContent === answers[i] ?
                count++ : optionTwo[i].style.backgroundColor='#F37059'
            }

            else if(Quiz[i].selectedThree){

                optionThree[i].textContent === answers[i] ? 
                count++ : optionThree[i].style.backgroundColor='#F37059'
            }

            else if(Quiz[i].selectedFour){

                optionFour[i].textContent === answers[i] ?
                count++ : optionFour[i].style.backgroundColor='#F37059'
            }
            if(optionOne[i].textContent === answers[i]){
                optionOne[i].style.backgroundColor='#94D7A2'
                optionOne[i].style.border='none'
            }
            if(optionTwo[i].textContent === answers[i]){
                optionTwo[i].style.backgroundColor='#94D7A2'
                optionTwo[i].style.border='none'
            }
            if(optionThree[i].textContent === answers[i]){
                optionThree[i].style.backgroundColor='#94D7A2'
                optionThree[i].style.border='none'
            }
            if(optionFour[i].textContent === answers[i]){
                optionFour[i].style.backgroundColor='#94D7A2'
                optionFour[i].style.border='none'
            }
        
        }
        setScore(count)
        setAnswerChecked(true)
    }
   

    const questions= Quiz.map(quiz=>{
        return <QuizPage
            key={quiz.id}
            
            questions={quiz.question }
            
            optionOne={decodeHtml(quiz.options[0])}
            optionTwo={decodeHtml(quiz.options[1])}
            optionThree={decodeHtml(quiz.options[2])}
            optionFour={decodeHtml(quiz.options[3])}
            selected={quiz.selected}
            selectedTwo={quiz.selectedTwo}
            selectedThree={quiz.selectedThree}
            selectedFour={quiz.selectedFour}
            id={quiz.id}
            chooseOption={(e)=>chooseOption(e,quiz.id)}
            />
    })
   

    return(
        <main>
            {startQuiz ?
            <div className='quiz-area'>
                {error&&<p>The test is taking a while. Refresh the page after 5 seconds to reload your questions. Make sure you have a good connection</p>}
                {questions}

                {answerChecked && <span>You got {score}/10. 
                                    {score===10? 
                                        "You are outstanding":
                                        score > 6 ? "Good Job" :
                                        score < 4 ? 'You can do better':
                                        ' Nice try'}
                                    </span>
                }
                
                <button onClick={answerChecked? postQuiz:checkAnswer}>{answerChecked?'Start Again':'Check Answer'}</button>
            </div>
             :
             <StartPage postQuiz={postQuiz}/>

            }

            <img src={blobOne} className="blob-one" alt='A part of the page layout at the top right'/>
           <img src={blobTwo} className="blob-two" alt='A part of the page layout at the top right'/>
        </main>
    )
}
export default App;
