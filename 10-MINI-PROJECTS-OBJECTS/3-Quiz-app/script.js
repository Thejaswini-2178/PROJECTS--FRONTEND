
// Base Question Class
function Question(text, options, correctAnswer) {
    this.text = text;
    this.options = options;
    this.correctAnswer = correctAnswer;
}

// Prototype method to validate answer
Question.prototype.validateAnswer = function (userAnswer) {
    return userAnswer === this.correctAnswer;
};

// MultipleChoiceQuestion subclass
function MultipleChoiceQuestion(text, options, correctAnswer) {
    Question.call(this, text, options, correctAnswer);
}
MultipleChoiceQuestion.prototype = Object.create(Question.prototype);
MultipleChoiceQuestion.prototype.constructor = MultipleChoiceQuestion;

// TrueFalseQuestion subclass
function TrueFalseQuestion(text, correctAnswer) {
    Question.call(this, text, ["True", "False"], correctAnswer);
}
TrueFalseQuestion.prototype = Object.create(Question.prototype);
TrueFalseQuestion.prototype.constructor = TrueFalseQuestion;

// Quiz Questions
const questions = [
    new MultipleChoiceQuestion("What is the capital of France?", ["Paris", "London", "Berlin", "Madrid"], "Paris"),
    new MultipleChoiceQuestion("Which is the largest planet?", ["Earth", "Mars", "Jupiter", "Saturn"], "Jupiter"),
    new TrueFalseQuestion("The Earth is flat.", "False"),
    new TrueFalseQuestion("JavaScript is a programming language.", "True"),
    new TrueFalseQuestion("Sun Rises in the East", "True"),
];

// Render Quiz
const quizContainer = document.getElementById("quiz");
questions.forEach(function (question, index) {
    const questionDiv = document.createElement("div");
    questionDiv.className = "question";
    const questionHTML = "<p>" + (index + 1) + ". " + question.text + "</p>";

    const optionsList = document.createElement("ul");
    optionsList.className = "options";

    question.options.forEach(function (option) {
        const optionItem = document.createElement("li");
        optionItem.innerHTML = '<label><input type="radio" name="question' + index + '" value="' + option + '" /> ' + option + '</label>';
        optionsList.appendChild(optionItem);
    });

    questionDiv.innerHTML += questionHTML;
    questionDiv.appendChild(optionsList);
    quizContainer.appendChild(questionDiv);
});

// Calculate Score
document.getElementById("submit").addEventListener("click", function () {
    let score = 0;
    questions.forEach(function (question, index) {
        const selectedOption = document.querySelector('input[name="question' + index + '"]:checked');
        if (selectedOption && question.validateAnswer(selectedOption.value)) {
            score++;
        }
    });

    const resultContainer = document.getElementById("result");
    resultContainer.textContent = "You scored " + score + " out of " + questions.length + ".";
});
