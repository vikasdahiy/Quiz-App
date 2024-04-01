const questions =[
  {
    question:"Which planet is known as the Red Planet ? ",
    answers:[
      {text:"Venus",correct:false},
      {text:"Mars",correct:true},
      {text:"Jupitor",correct:false},
      {text:"Saturn",correct:false},

    ]
  },
  {
    question:"What is the capital city of France? ",
    answers:[
      {text:"Madrid",correct:false},
      {text:"Rome",correct:false},
      {text:"Berlin",correct:false},
      {text:"Paris",correct:true},

    ]
  },
  {
    question:"Who painted the Mona Lisa?",
    answers:[
      {text:"Vincent van Gogh",correct:false},
      {text:"Leonardo da Vinci",correct:true},
      {text:" Pablo Picasso",correct:false},
      {text:"Michelangelo",correct:false},

    ]
  },{
    question:" Which of the following is a primary color? ",
    answers:[
      {text:"Orange",correct:false},
      {text:"Green",correct:false},
      {text:"Blue",correct:true},
      {text:"Brown",correct:false},

    ]
  },{
    question:"What is the chemical symbol for water? ",
    answers:[
      {text:"H2O2",correct:false},
      {text:"CO2",correct:false},
      {text:"H2O",correct:true},
      {text:"CH4",correct:false},

    ]
  },{
    question:" Which continent is home to the Amazon Rainforest? ",
    answers:[
      {text:"Africa",correct:false},
      {text:"Asia",correct:false},
      {text:"South America",correct:true},
      {text:"Australia",correct:false},

    ]
  },{
    question:"Who wrote Romeo and Juliet ? ",
    answers:[
      {text:"William Shakespeare",correct:false},
      {text:"Charles Dickens",correct:false},
      {text:"Jane Austen",correct:false},
      {text:"Mark Twain",correct:true},

    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex =0;
let score =0;
function startQuiz(){
  currentQuestionIndex =0;
  score =0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo =currentQuestionIndex +1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerHTML =answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click",selectAnswer);
  });
}
function resetState(){
  nextButton.style.display ="none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e){
  const selectedBtn =e.target;
  const isCorrect =selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  }
  else{
    selectedBtn.classList.add("incorrect");

  }
  Array.from(answerButtons.children).forEach(button =>{
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled =true;
  });
  nextButton.style.display ="block";
}

function showScore(){
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`; 
  nextButton.innerHTML ="play again";
  nextButton.style.display="block";

}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else{
    showScore();
  }
}


nextButton.addEventListener("click",()=>{
  if(currentQuestionIndex < questions.length){
      handleNextButton();
  }else{
    startQuiz();
  }
});
startQuiz();