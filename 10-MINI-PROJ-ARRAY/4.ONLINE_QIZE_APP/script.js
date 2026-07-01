let questions = [
    { id: 1, text: "What is 2 + 2?", options: ["3", "4", "5"], correct: "4", userAnswer: null },
    { id: 2, text: "Is the Earth round?", options: ["True", "False"], correct: "True", userAnswer: null },
];

function displayQuiz() {
    const quizContainer = document.getElementById('quizContainer');
    quizContainer.innerHTML = questions.map(question => `
      <div class="question">
        <p>${question.text}</p>
        ${question.options.map(option => `
          <label>
            <input type="radio" name="question${question.id}" value="${option}" onclick="answerQuestion(${question.id}, '${option}')">
            ${option}
          </label>
        `).join('<br>')}
      </div>
    `).join('');
}

function answerQuestion(id, answer) {
    const question = questions.find(q => q.id === id);
    if (question) {
        question.userAnswer = answer;
    }
}

function submitQuiz() {
    if (!questions.every(q => q.userAnswer !== null)) {
        alert("Please answer all questions!");
        return;
    }

    const score = questions.reduce((total, q) => total + (q.userAnswer === q.correct ? 1 : 0), 0);
    document.getElementById('result').innerText = `Your score: ${score}/${questions.length}`;
}

// Adding a new question using push
questions.push({ id: 3, text: "What is the capital of France?", options: ["Berlin", "Paris", "Madrid"], correct: "Paris", userAnswer: null });

// Randomize questions using sort and reverse
questions.sort(() => Math.random() - 0.5).reverse();

// Display the quiz
displayQuiz();
