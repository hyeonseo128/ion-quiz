const words = [
    { id: 1, text: "나트륨 이온", image: "1.png" },
    { id: 2, text: "칼륨 이온", image: "2.png" },
    { id: 3, text: "은 이온", image: "3.png" },
    { id: 4, text: "칼슘 이온", image: "4.png" },
    { id: 5, text: "구리 이온", image: "5.png" },
    { id: 6, text: "아연 이온", image: "6.png" },
    { id: 7, text: "알루미늄 이온", image: "7.png" },
    { id: 8, text: "암모늄 이온", image: "8.png" },
    { id: 9, text: "염화 이온", image: "9.png" },
    { id: 10, text: "브로민화 이온", image: "10.png" },
    { id: 11, text: "아이오딘화 이온", image: "11.png" },
    { id: 12, text: "황화 이온", image: "12.png" },
    { id: 13, text: "산화 이온", image: "13.png" },
    { id: 14, text: "수산화 이온", image: "14.png" },
    { id: 15, text: "탄산 이온", image: "15.png" },
    { id: 16, text: "인산 이온", image: "16.png" },
    { id: 17, text: "질산 이온", image: "17.png" },
    { id: 18, text: "황산 이온", image: "18.png" },
    { id: 19, text: "과망가니즈산 이온", image: "19.png" },
    { id: 20, text: "아세트산 이온", image: "20.png" },
    { id: 21, text: "크로뮴산 이온", image: "21.png" },
    { id: 22, text: "마그네슘 이온", image: "22.png" },
    { id: 23, text: "바륨 이온", image: "23.png" },
    { id: 24, text: "철 이온", image: "24.png" },
    { id: 25, text: "수소 이온", image: "25.png" }
];

let questionPool = [];
let memorized = [];
let unmemorized = [];
let currentWord = null;
let currentMode = "all";
let currentQuizType = "textToImage";

// 문제 리스트 초기화 및 섞기
function resetQuestions() {
    if (currentMode === "all") {
        questionPool = shuffle([...words]);
    } else if (currentMode === "memorized") {
        questionPool = shuffle([...memorized]);
    } else if (currentMode === "unmemorized") {
        questionPool = shuffle([...unmemorized]);
    }
}

// 학습 모드 변경
document.getElementById("modeSelect").addEventListener("change", (e) => {
    currentMode = e.target.value;
    resetQuestions();
    loadNextQuestion();
});

// 출제 방식 변경
document.getElementById("quizType").addEventListener("change", (e) => {
    currentQuizType = e.target.value;
    loadNextQuestion();
});

// 랜덤 섞기
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// 다음 문제 로드
function loadNextQuestion() {
    if (questionPool.length === 0) {
        resetQuestions();
    }

    if (questionPool.length === 0) {
        document.getElementById("question").textContent = "문제가 없습니다.";
        document.getElementById("image").classList.add("hidden");
        return;
    }

    currentWord = questionPool.pop();

    if (currentQuizType === "textToImage") {
        document.getElementById("question").textContent = currentWord.text;
        document.getElementById("image").src = `images/${currentWord.image}`;
        document.getElementById("image").classList.add("hidden");
    } else {
        document.getElementById("question").textContent = "";
        document.getElementById("image").src = `images/${currentWord.image}`;
        document.getElementById("image").classList.remove("hidden");
    }

    updateProgress();
}

// 진행 상황 업데이트 (현재 문제 번호 포함)
function updateProgress() {
    const totalQuestions = words.length;
    const currentQuestionNumber = totalQuestions - questionPool.length;
    
    document.getElementById("progress").textContent =
        `현재 문제: ${currentQuestionNumber} / ${totalQuestions}  
        | 남은 문제: ${questionPool.length}  
        | 외운 문제: ${memorized.length}  
        | 못 외운 문제: ${unmemorized.length}`;
}


// 정답 보기
document.getElementById("showAnswer").addEventListener("click", () => {
    if (currentQuizType === "textToImage") {
        document.getElementById("image").classList.remove("hidden");
    } else {
        document.getElementById("question").textContent = currentWord.text;
    }
});

// 몰라요
document.getElementById("dontKnow").addEventListener("click", () => {
    if (!unmemorized.includes(currentWord)) {
        unmemorized.push(currentWord);
    }
    loadNextQuestion();
});

// 알아요
document.getElementById("know").addEventListener("click", () => {
    if (!memorized.includes(currentWord)) {
        memorized.push(currentWord);
    }
    loadNextQuestion();
});

// 진행 상황 업데이트
function updateProgress() {
    document.getElementById("progress").textContent = 
        `남은 문제: ${questionPool.length}, 외운 문제: ${memorized.length}, 못 외운 문제: ${unmemorized.length}`;
}

// 초기 문제 설정
resetQuestions();
loadNextQuestion();
