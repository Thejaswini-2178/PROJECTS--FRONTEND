// Timer management using closures
const createTimer = (duration, onTick, onEnd) => {
    let timeRemaining = duration;
    const intervalId = setInterval(() => {
        if (timeRemaining > 0) {
            onTick(timeRemaining);
            timeRemaining--;
        } else {
            clearInterval(intervalId);
            onEnd();
        }
    }, 1000);
    return () => clearInterval(intervalId); // Return a function to clear the timer
};

// Fetch questions dynamically
const fetchQuestions = async (category = "9", amount = 5) => {
    try {
        const response = await fetch(
            `https://opentdb.com/api.php?amount=${amount}&category=${category}&type=multiple`
        );
        if (!response.ok) throw new Error("Failed to fetch questions");
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching questions:", error);
        return [];
    }
};

// Render questions dynamically
let currentQuestionIndex = 0;
let userAnswers = [];
let correctAnswers = [];
let stopTimer;

const renderQuestion = (questions) => {
    if (currentQuestionIndex >= questions.length) {
        document.getElementById("quiz-container").innerHTML =
            "<div class='text-center'>Quiz Completed!</div>";
        calculateScore(userAnswers, correctAnswers);
        return;
    }

    const question = questions[currentQuestionIndex];
    document.getElementById("question").innerHTML = question.question;
    correctAnswers.push(question.correct_answer);

    const answers = [...question.incorrect_answers, question.correct_answer].sort(
        () => Math.random() - 0.5
    );
    const answersContainer = document.getElementById("answers");
    answersContainer.innerHTML = answers
        .map(
            (answer, index) => `
        <button class="w-full bg-gray-200 hover:bg-gray-300 p-2 rounded" 
                onclick="selectAnswer('${answer}')">
          ${answer}
        </button>`
        )
        .join("");

    document.getElementById("next-btn").classList.add("hidden");

    // Timer
    stopTimer = createTimer(
        15,
        (time) => {
            document.getElementById("timer").textContent = `Time Remaining: ${time}s`;
        },
        () => {
            userAnswers.push(null); // No answer
            moveToNextQuestion(questions);
        }
    );
};

const selectAnswer = (answer) => {
    userAnswers[currentQuestionIndex] = answer;
    document.getElementById("next-btn").classList.remove("hidden");
    stopTimer(); // Stop timer when user selects an answer
};

const moveToNextQuestion = (questions) => {
    currentQuestionIndex++;
    renderQuestion(questions);
};

// Calculate score directly
const calculateScore = (answers, correctAnswers) => {
    const score = answers.reduce((acc, answer, index) => {
        return acc + (answer === correctAnswers[index] ? 1 : 0);
    }, 0);

    document.getElementById(
        "quiz-container"
    ).innerHTML = `<div class='text-center font-bold text-lg'>Your Score: ${score}/${correctAnswers.length}</div>`;
};

// Start quiz
document.addEventListener("DOMContentLoaded", async () => {
    const questions = await fetchQuestions();
    renderQuestion(questions);

    document
        .getElementById("next-btn")
        .addEventListener("click", () => moveToNextQuestion(questions));
});
