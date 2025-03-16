const loadLesson = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(res => res.json())
        .then(data => displayLesson(data.data))
}
loadLesson()

const displayLesson = data => {
    console.log(data);
    const lessonContainer = document.getElementById('lessonbtn');
    for (const level of data) {
        const button = document.createElement('button');
        button.classList.add('btn', 'border-2', 'border-blue-700', 'bg-white', 'hover:bg-blue-300', 'text-blue-700');
        button.innerText = "Lesson-"+ level.level_no;
        const img = document.createElement('img');
        img.src = './assets/fa-book-open.png';
        img.alt = '';
        button.appendChild(img);
        
        lessonContainer.appendChild(button);
    }

}