/* Variables controlling the html sections to switch their display style attribute */
var intro_section = document.getElementById("intro");
var quiz_section = document.getElementById("quiz");
var results_section = document.getElementById("quiz-results");
var high_score_section = document.getElementById("high-scores");

var totalTime = 100; //Variable defining total time of quiz
var secondsLeft; //Variable tracking time remaining for quiz
var timer;

var question_index = 0; //Variable tracking the index of the current question being displayed
var quiz_questions = [
  {
    question: `Inside which HTML element do we put the JavaScript?`,
    options: {
      a: `<scripting>`,
      b: `<script>`,
      c: `<js>`,
      d: `<javascript>`,
    },
    answer: "b",
  },
  {
    question: `What is the correct JavaScript syntax to change the content of the HTML element below?\n<p id='demo'>This is a demonstration.</p>`,
    options: {
      a: `document.getElement("p").innerHTML = "Hello World!";`,
      b: `document.getElementByName("p").innerHTML = "Hello World!";`,
      c: `#demo.innerHTML = "Hello World!";`,
      d: `document.getElementById("demo").innerHTML = "Hello World!";`,
    },
    answer: "d",
  },
  {
    question: `Where is the correct place to insert a JavaScript?`,
    options: {
      a: `The <body> section`,
      b: `The <head> section`,
      c: `Both the <head> and <body> section are correct`,
      d: `none of the above`,
    },
    answer: "c",
  },
  {
    question: `How do you write "Hello World" in an alert box?`,
    options: {
      a: `alertBox("Hello World");`,
      b: `msgBox("Hello World");`,
      c: `alert("Hello World");`,
      d: `msg("Hello World");`,
    },
    answer: "c",
  },
  {
    question: `What is the correct way to write a JavaScript array?`,
    options: {
      a: `var colors = ["red", "green", "blue"]`,
      b: `var colors = "red", "green", "blue"`,
      c: `var colors = (1:"red", 2:"green", 3:"blue")`,
      d: `var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")`,
    },
    answer: "a",
  },
  {
    question: `Which event occurs when the user clicks on an HTML element?`,
    options: {
      a: `onmouseclick`,
      b: `onclick`,
      c: `onmouseover`,
      d: `onchange`,
    },
    answer: "b",
  },
  {
    question: ` In JavaScript, what is a block of statement?`,
    options: {
      a: `Conditional block`,
      b: `block that combines a number of statements into a single compound statement`,
      c: `both conditional block and a single statement`,
      d: `block that contains a single statement`,
    },
    answer: "b",
  },
  {
    question: `When interpreter encounters an empty statements, what it will do:`,
    options: {
      a: `Shows a warning`,
      b: `Prompts to complete the statement`,
      c: `Throws an error`,
      d: `Ignores the statements`,
    },
    answer: "d",
  },
  {
    question: `Which of the following variables takes precedence over the others if the names are the same?`,
    options: {
      a: `Global variable`,
      b: `The local element`,
      c: `The two of the above`,
      d: `None of the above`,
    },
    answer: "b",
  },
  {
    question: `Which one of the following operator is used to check weather a specific property exists or not:`,
    options: {
      a: `Exists`,
      b: `exist`,
      c: `within`,
      d: `in`,
    },
    answer: "d",
  },
];

/* Function that begins the timer and displays the questions when the 'start quiz' buttons on the intro page is clicked */
function startQuiz() {
    intro_section.setAttribute("style", "display:none;");
    high_score_section.setAttribute("style", "display:none;");
    quiz_section.setAttribute("style", "display:flex;");
    
    secondsLeft = totalTime;

    displayQuiz();
    startCountdown();
}

/* Keeps track of the current time and displays it on the screen. Also checks if the timer has finished (reached to zero).
When the timer is finished, displays the end results screen and stops the quiz */
function startCountdown(){
    timer = setInterval(() => {
        secondsLeft--;
        if (secondsLeft <= 0) {
            document.getElementById("time").innerHTML = secondsLeft;
            showResults(secondsLeft);
        }
        else {
            document.getElementById("time").innerHTML = secondsLeft;
        }

    },1000)
}

/* Displays the questions and multiple choices on the screen and waits for the user to select an option to run 
the checkAnswer function */
function displayQuiz() {

    var current_question = document.getElementById("quiz-question");
    var option1 = document.getElementById("quiz-option-1");
    var option2 = document.getElementById("quiz-option-2");
    var option3 = document.getElementById("quiz-option-3");
    var option4 = document.getElementById("quiz-option-4");

    current_question.textContent = quiz_questions[question_index].question;
    option1.textContent = quiz_questions[question_index].options.a;
    option2.textContent = quiz_questions[question_index].options.b;
    option3.textContent = quiz_questions[question_index].options.c;
    option4.textContent = quiz_questions[question_index].options.d;

    /* Checks the time while the user is waiting to select an option and ends the quiz if the timer runs out (even if the user has yet to choose an answer) */
    if (secondsLeft <= 0) {
        secondsLeft = 0;
        document.getElementById("time").innerHTML = secondsLeft;
        showResults(secondsLeft);
    }

    var quiz_options_li = document.querySelectorAll(".quiz-option-li");
    quiz_options_li.forEach(option => {
      option.addEventListener("click", checkAnswer);
    });
}

/* Compares the answer selected by the user to the correct answer and displays the status of the users choice on the screen */
function checkAnswer(event) {
    var answer_status = document.getElementById("answer-status");
    var clickedOption = event.target.id; /* Obtains the id of the option selected by the user */

    /* Matches the id's of the options to their corresponding multiple choice letter as that is what is used to identify the answer in the quiz_questions array  */
    var id_to_option = {
    ["quiz-option-1"]: "a",
    ["quiz-option-2"]: "b",
    ["quiz-option-3"]: "c",
    ["quiz-option-4"]: "d",
    };

    /* Gives the user added time if the selected option is correct. Also checks to ensure the time displayed never exceeds the initial time given for the quiz */
    if (id_to_option[clickedOption] == quiz_questions[question_index].answer) {
        answer_status.textContent = "Correct!";
        secondsLeft += 5;
        if (secondsLeft > totalTime) {
            secondsLeft = totalTime;
        }
    }
    /* Gives the user a penalty if the selected option is incorrect. Also checks to ensure the time displayed is never below the minimum amount (zero), and runs the
    end result screen if the time is finished */
    else {
        answer_status.textContent = "Wrong!";
        secondsLeft -= 15;
        if (secondsLeft <= 0) {
          secondsLeft = 0;
          document.getElementById("time").innerHTML = secondsLeft;
          showResults(secondsLeft); //By running the function in this condition, we display the end result screen before running the next iteration where the time is checked in the startCountdown function
        }
    }

    /* Check if we reached the final question of the quiz and displays the end result screen */
    question_index++;
    if (question_index > quiz_questions.length - 1) {
        showResults(secondsLeft);
        document.getElementById("time").innerHTML = secondsLeft;
    } else {
        setTimeout(displayQuiz, 500);
    }
}

/* Stops the timer and displays the users score on the screen and waits for them to submit their information in the form */
function showResults(finalScore) {
    clearInterval(timer);

    quiz_section.setAttribute("style", "display:none;");
    results_section.setAttribute("style", "display:block;");

    var scoreDisplay = document.getElementById("final-result");
    scoreDisplay.textContent = finalScore;

    submit_user = document.getElementById("results-submit");
    submit_user.addEventListener("click",addScore)
}

/* Adds the users information from the form into the local storage.
The local storage is kept track using an array which sorts the users by their score in descending order */
function addScore(event) {
    event.preventDefault(); //Prevents page from refreshing when the submit button is clicked

    results_section.setAttribute("style", "display:none;");
    high_score_section.setAttribute("style", "display:block;");

    var user_scores = JSON.parse(localStorage.getItem("user_scores"));
    if (user_scores == null) {
    user_scores = [];
    }
    var user_name = document.getElementById("user-initials").value;
    user_scores.push({ name: user_name, score: secondsLeft });

    //sorting order function taken from https://atomizedobjects.com/blog/javascript/how-to-sort-an-array-of-objects-by-property-value-in-javascript/#:~:text=How%20to%20sort%20an%20array%20of%20objects%20by,array%20item%20that%20we%20are%20comparing%20it%20against.
    var scoreOrder = (value1, value2) => {
        if (value1.score < value2.score) {
            return 1;
        } else if (value1.score > value2.score) {
            return -1;
        } else {
            return 0;
        }
    };
    user_scores.sort(scoreOrder);

    localStorage.setItem("user_scores", JSON.stringify(user_scores));

  showHighScores();
}

/* Obtains the ordered list of users in the local storage and adds them to an ordered list in the html to be displayed on the screen */
function showHighScores() {
    intro_section.setAttribute("style", "display:none;");
    quiz_section.setAttribute("style", "display:none;");
    results_section.setAttribute("style", "display:none;");
    high_score_section.setAttribute("style", "display:block;");

    var user_scores = JSON.parse(localStorage.getItem("user_scores"));

    var user_scores_list = document.getElementById("scores-list");
    user_scores_list.innerHTML = "";
    user_scores.forEach((user) => {
        var user_list_item = document.createElement("li");
        user_list_item.innerHTML = user.name + " - " + user.score;
        user_scores_list.appendChild(user_list_item);
    });
}

/* Stops the timer whenever we go back to the home page and displays the intro screen. Returns the question index to 0 for when the user starts their next quiz */
function goBack() {
    clearInterval(timer);
    question_index = 0;
    document.getElementById("time").innerHTML = "";
    document.getElementById("answer-status").textContent = "";

    high_score_section.setAttribute("style", "display:none;");
    intro_section.setAttribute("style", "display:flex;");
}

/* Emmpties the local storage and array keeping track of the users scores and removes all the list child elements from the HTML ordered list to remove them from being displayed on the screen*/
function clearScores() {
    var user_scores_list = document.getElementById("scores-list");
    var user_scores_node = document.querySelectorAll("#scores-list li");

    for (var i = 0; i < user_scores_node.length; i++){
        user_scores_list.removeChild(user_scores_node[i])
    }

    localStorage.removeItem("user_scores");
    user_scores = [];
}
