const quizContainer = document.getElementById("quizContainer");
const submitBtn = document.getElementById("submit");
const quizScore = document.getElementById("quizScore");

const myQuestions = [
  {
    question:
      "Which of the following methods is used to access HTML elements using Javascript?",
    answers: {
      a: "getElementById()",
      b: "getElementsByClassName()",
      c: "Both A and B",
    },
    correctAnswer: "c",
  },
  {
    question: "Javascript is an _______ language?",
    answers: {
      a: "Object-Oriented",
      b: "Object-Based",
      c: "Procedural",
    },
    correctAnswer: "a",
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: {
      a: "js tag",
      b: "script tag",
      c: "javascript tag",
    },
    correctAnswer: "b",
  },
];

function buildQuiz() {
  const output = [];

  myQuestions.forEach((currQuestion, qustionNumber) => {
    const answers = [];
    for (const options in currQuestion.answers) {
      answers.push(
        `<label class="questionLabel">
            <input type="radio" value="${options}" name="question${qustionNumber}" class="qustionInput">
                ${currQuestion.answers[options]}
            </label>`
      );
    }
    output.push(
      `<div id="question" class="qustionLine">${qustionNumber + 1}. &nbsp;${
        currQuestion.question
      }</div>
            <div class='answer'>${answers.join("")}</div>`
    );
  });
  quizContainer.innerHTML = output.join("");
}

function showResult() {
  const answerContainers = document.querySelectorAll(".answer");
  let userCorrectAnswer = 0;
  let totalQuestionAttempted = 0;

  myQuestions.forEach((currQuestion, questionNumber) => {
    let selector = `input[name='question${questionNumber}']:checked`;
    let answerContainer = answerContainers[questionNumber];
    let userAnswer = (answerContainer.querySelector(selector) || {}).value;

    if (userAnswer === undefined) {
      quizScore.innerHTML = "please fill all the answer before submit";
    } else {
      totalQuestionAttempted++;
    }
  });

  if (totalQuestionAttempted === myQuestions.length) {
    myQuestions.forEach((currQuestion, questionNumber) => {
      let selector = `input[name='question${questionNumber}']:checked`;
      let answerContainer = answerContainers[questionNumber];
      let userAnswer = (answerContainer.querySelector(selector) || {}).value;
      answerContainers[questionNumber].childNodes.forEach((eachOption) =>
        eachOption.classList.remove("greencolor")
      );
      answerContainers[questionNumber].childNodes.forEach((eachOption) =>
        eachOption.classList.remove("redcolor")
      );

      try {
        if (userAnswer === currQuestion.correctAnswer) {
          userCorrectAnswer++;
          answerContainer
            .querySelector(selector)
            .parentElement.classList.add("greencolor");
        }
        if (userAnswer !== currQuestion.correctAnswer) {
          answerContainer
            .querySelector(selector)
            .parentElement.classList.add("redcolor");
          answerContainer
            .querySelector(`input[value='${currQuestion.correctAnswer}']`)
            .parentElement.classList.add("greencolor");
        }
        quizScore.innerHTML = `${userCorrectAnswer} Answer is correct out of ${myQuestions.length}`;
      } catch (error) {
        console.log(error.message);
      }
    });
  }
}

submitBtn.addEventListener("click", showResult);

buildQuiz();