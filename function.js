const removeActiveClass = () => {
    const activeButton = document.getElementsByClassName('active');
    for (const button of activeButton) {
        button.classList.remove('active');
    };
}
const loadLesson = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(res => res.json())
        .then(data => displayLesson(data.data))
}
loadLesson()

const displayLesson = data => {
    const lessonContainer = document.getElementById('lessonbtn');
    for (const level of data) {
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
        <button id="${level.id}" onclick ="loadCategoryWords(${level.level_no},id)" class="btn border-2 border-blue-700 bg-white hover:bg-blue-300 text-blue-700">
        <img src="./assets/fa-book-open.png" alt="">
        Lesson- ${level.level_no}
        </button>`
        lessonContainer.appendChild(buttonContainer);
    }
}

const loadCategoryWords = (level,id) => {
    fetch(`https://openapi.programming-hero.com/api/level/${level}`)
        .then(res => res.json())
        .then(data =>{
            removeActiveClass();
            console.log(id);
            const button = document.getElementById(id);
            button.classList.add('active');
            displayCategoryWord(data.data)});
}

//   "id": 4,
//   "level": 5,
//   "word": "Diligent",
//   "meaning": "পরিশ্রমী",
//   "pronunciation": "ডিলিজেন্ট

const displayCategoryWord = data => {
    const levelWord = document.getElementById('lessonWord');
    levelWord.innerHTML = '';
    if (data.length == 0) {
            levelWord.classList.remove('grid-cols-3');
            levelWord.classList.add('grid-cols-1');
        const card = document.createElement('div');
        card.innerHTML = `
        <div class="space-4 text-center py-10 mx-auto">
            <div class="w-[100px] mx-auto"><img src="./assets/alert-error.png" alt=""></div>
            <p class="py-6 text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h1 class="text-3xl font-bold">নেক্সট Lesson এ যান</h1>
        </div>
        `
        levelWord.appendChild(card);
    }
    else {
        for (const word of data) {
            levelWord.classList.remove('grid-cols-1');
            levelWord.classList.add('grid-cols-3');
            const card = document.createElement('div');
            card.innerHTML = `
            <div class="card w-96 bg-base-100 card-xl shadow-sm">
             <div class="card-body text-center space-y-2">
                 <h2 class="text-2xl font-bold text-center">${word.word}</h2>
                 <p>Meaning/Pronounciation</p>
                  <h2 class="text-2xl font-bold text-gray-500 text-center">"${word.meaning}/${word.pronunciation}"</h2><br>
                 <div class="justify-between card-actions">
                     <button class="btn w-[60px]"> <img class="w-9/12" src="./assets/info.png" alt=""></button>
                     <button class="btn w-[60px]"> <img class="w-9/12" src="./assets/sound (1).png" alt=""></button>
                 </div>
            </div>
            </div>`
            levelWord.appendChild(card);
        }
    }


}