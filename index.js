const STORE = [
    {
        question: 'Which state was Ed Reed born in?',
        options: ['Louisiana', 'Texas', 'Florida', 'Michigan'],
        correctAnswer: 'Louisiana'
    },
    {
        question: 'Which college team did Ed Reed play for?',
        options: ['Alabama Crimson Tide', 
        'Miami Hurricanes', 'Oregon Ducks', 'Ohio State Buckeyes'],
        correctAnswer: 'Miami Hurricanes'   
    },
    {
        question: 'The current NFL record, how long was Ed Reed\'s longest interception TD?',
        options: ['98 yards', '99 yards', '105 yards', '107 yards'],
        correctAnswer: '107 yards'
    },
    {
        question: 'How many times was Ed Reed selected as a first team All-Pro?',
        options: ['3', '5', '6', '9'],
        correctAnswer: '5'
    },
    {
        question: 'Ed Reed was a first-ballot selection to the Pro Football hall of fame in what year?',
        options: ['2002', '2012', '2018', '2019'],
        correctAnswer: '2019'
    }
]

let score = 0;
let questionNumber = 0;

function reset(){
    score = 0;
    questionNumber = 0;

    $('.score').text(0);
    $('.questionNum').text(0);
}

function scoreUpdate(){
    score++;
    $('.score').text(score);
}

function updateQuestionNum(){
    questionNumber++;
    $('.questionNum').text(questionNumber + 1);
}

function generateQuestion() {
    if (questionNumber < STORE.length) {
        return renderQuestionHTML(questionNumber);
    } else {
        results();
        $('.questionNum').text(STORE.length);
    }
}

function renderQuestionHTML(questionIndex) { 
    let questionForm = $(`<form>
        <fieldset>
            <legend class="questionText">${STORE[questionIndex].question}</legend> 
        </fieldset> 
    </form>`) //initial question text/form HTML to be targeted. Loop through answer options and append with
    //button to submit answer.

    let findField = $(questionForm).find('fieldset') //where to append radio buttons/options HTML

    STORE[questionIndex].options.forEach(function (optionValue, optionIndex){ //take an answer option,
        //and for each option create a label and corresponding button using option array index. 
        $(`<label for="${optionIndex}">
            <input class="radio" type="radio" id="${optionIndex}" value="${optionValue}" name="answer" required>
            <span>${optionValue}</span>
        </label>`).appendTo(findField); //append options HTML, then button
    });
    $(`<button type="submit" class="submitButton button">Submit</button>`).appendTo(findField);
    return questionForm;
}

function startQuiz(){
    $('.actionBox').hide();
    $('.startQuiz').on('click', '.startButton', function (event){
        $('.startQuiz').hide();
        $('.questionNum').text(1);
        $('.questionBox').show();
        $('.questionBox').prepend(generateQuestion());

    });
}

function submitAnswer(){
    $('.mainBox').on('submit', function(event){
        event.preventDefault();
        $('.actionBox').hide();
        $('.answerBox').show();
        let selectedOption = $('input:checked'); 
        let answer = selectedOption.val();
        let correct = STORE[questionNumber].correctAnswer;
        if (answer === correct){
            correctAnswer();
        } else {
            wrongAnswer();
        }
    });
}

function correctAnswer(){
    $('.answerBox').html(`<h3>Correct!</h3>
    <img class="pics" src="images/correct.jpg" alt="Mr. Reed pointing">
      <p class="sizeAdjust">Ed Reed approves</p>
      <button type="button" class="nextButton button">Next</button>`);
      scoreUpdate();
}

function wrongAnswer(){
    $('.answerBox').html(`<h3>Wrong!</h3>
    <img class="pics" src="images/wrong.jpg" alt="A wise, elder Ed Reed frowns disapprovingly">
      <h3 class="sizeAdjust">Your arrogance blinds you</h3>
      <p class="sizeAdjust">Correct Answer: ${STORE[questionNumber].correctAnswer}</p>
      <button type="button" class="nextButton button">Next</button>`);
}

function nextQuestion(){
    $('.mainBox').on('click', '.nextButton', function(event){
        $('.actionBox').hide();
        $('.questionBox').find('form').remove();
        updateQuestionNum();
        $('.questionBox').show();
        $('.questionBox').prepend(generateQuestion());
        // $('.questionBox').show(); either before or after attaching generateQ()
    });
}

function results(){
    $('.resultsBox').show();
    $('.questionBox').hide();

    const excellent = {
        message: 'Just as with the Lombardi Trophy, Ed Reed smiles upon you this day',
        image: 'images/win.jpeg',
        alt: 'Ed Reed admiring his new Lombardi Trophy as confetti falls around him',
        judgment: 'May you intercept many footballs. Soon you, \
        yourself will hoist the Lombardi under the hot sun'
    };

    const prettyGood = {
        message: 'You are a free-safety... But Ed Reed does not grant you the rank of ballhawk',
        image: 'images/study.jpg',
        alt: 'Ed Reed gesturing in an instructive manner, likely imparting his wisdom to another',
        judgment: 'Watch some more gamefilm'
    }

    const turrible = {
        message: 'You dishonor Edward Earl Reed and your ancestors',
        image: 'images/failure.jpg',
        alt: 'Ed Reed does his best Tom Landry impression, fedora and all,\
         as he squints towards the field',
        judgment: 'You have been traded to the Cleveland Browns'
    }

    if (score === 5) {
        obj = excellent;
    } else if (score < 5 && score >= 3) {
        obj = prettyGood;
    } else {
        obj = turrible;
    }

    return $('.resultsBox').html(`<h3>${obj.message}</h3>
    <img class= "pics" src=${obj.image} alt=${obj.alt}>
    <h3>Your score is ${score}/5</h3>
    <p class="sizeAdjust">${obj.judgment}</p>
    <button class="button restartButton" type="button">Restart?</button>`);
}

function restartQuiz(){
    $('.mainBox').on('click', '.restartButton', function(event){
        event.preventDefault();
        reset();
        $('.actionBox').hide();
        $('.startQuiz').show();
    });
}

function runQuiz(){
    startQuiz();
    generateQuestion();
    submitAnswer();
    nextQuestion();
    restartQuiz();
}

$(runQuiz);