document.addEventListener('DOMContentLoaded', function () {
    const lessonsContainer = document.getElementById('lessons');
    const vocabCardsContainer = document.getElementById('vocab-cards');
    const lessonWord1 = document.getElementById('lessonWord1');
    const lessonWord = document.getElementById('lessonWord');
    const bannerSection = document.querySelector('banner');
    const navBar = document.querySelector('nav');
    const learnSection = document.getElementById('learn');
    const faqSection = document.getElementById('FAQ');
    const footerSection = document.querySelector('footer');
    const logoutButton = document.querySelector('a[href="#logout"]');

    
    navBar.style.display = 'none';
    learnSection.style.display = 'none';
    faqSection.style.display = 'none';

    
    const loginForm = document.querySelector('.hero-content');
    const nameInput = loginForm.querySelector('input[type="text"]');
    const passwordInput = loginForm.querySelector('input[type="password"]');
    const loginButton = loginForm.querySelector('button');

    loginButton.addEventListener('click', function (event) {
        event.preventDefault();

        const name = nameInput.value.trim();
        const password = passwordInput.value.trim();

        if (!name) {
            alert('Please enter your name.');
            return;
        }

        if (password !== '123456') {
            alert('Incorrect password. Please try again.');
            return;
        }

        
        alert('Login successful!');
        bannerSection.style.display = 'none';
        navBar.style.display = 'flex'; 
        learnSection.style.display = 'block'; 
        faqSection.style.display = 'block'; 
    });

    
    logoutButton.addEventListener('click', function (event) {
        event.preventDefault();

    
        navBar.style.display = 'none';
        learnSection.style.display = 'none';
        faqSection.style.display = 'none';

        
        bannerSection.style.display = 'block';
    });

    
    const learnButton = document.getElementById('learnmore');
    learnButton.addEventListener('click', function (event) {
        event.preventDefault();
        const learnSection = document.getElementById('learn');
        if (learnSection) {
            learnSection.scrollIntoView({ behavior: 'smooth' });
        }
    });

    
    const faqbtn = document.getElementById('faqbtn');
    faqbtn.addEventListener('click', function (event) {
        event.preventDefault();
        const faqSection = document.getElementById('FAQ');
        if (faqSection) {
            faqSection.scrollIntoView({ behavior: 'smooth' });
        }
    });

    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(response => response.json())
        .then(data => {
            if (data.status) {
                data.data.forEach(level => {
                    const lessonButton = document.createElement('button');
                    lessonButton.textContent = `Lesson - ${level.level_no}`;
                    lessonButton.className = 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300';
                    lessonButton.addEventListener('click', () => {
                        highlightActiveButton(lessonButton);
                        loadVocab(level.level_no);
                    });
                    lessonsContainer.appendChild(lessonButton);
                });
            }
        })
        .catch(error => console.error('Error fetching levels:', error));

    
    function highlightActiveButton(activeButton) {
        const allButtons = lessonsContainer.querySelectorAll('button');
        allButtons.forEach(button => {
            button.classList.remove('bg-blue-900');
            button.classList.add('bg-blue-500');
        });

        activeButton.classList.remove('bg-blue-500');
        activeButton.classList.add('bg-blue-900');
    }

    function loadVocab(levelNo) {
        vocabCardsContainer.innerHTML = '';
        fetch(`https://openapi.programming-hero.com/api/level/${levelNo}`)
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    if (data.data.length === 0) {
                        vocabCardsContainer.innerHTML = '';
                        lessonWord1.innerHTML = `
                            <div class="space-4 text-center py-10">
                                <i class="fa-solid fa-exclamation"></i>
                                <p class="py-6 text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                                <h1 class="text-3xl font-bold">নেক্সট Lesson এ যান </h1>  
                            </div>
                        `;
                        lessonWord.innerHTML = '';
                    } else {
                        lessonWord1.innerHTML = '';
                        lessonWord.innerHTML = '';

                        data.data.forEach(word => {
                            const card = document.createElement('div');
                            card.className = 'bg-white p-6 rounded-lg shadow-lg transition-shadow duration-300';
                            card.innerHTML = `
                                <h3 class="text-xl font-semibold text-gray-800">${word?.word|| 'No Data'}</h3>
                                <p class="text-gray-600 mt-2"><span class="font-medium">Meaning/Pronunciation</p>
                                <h3 class="text-xl font-semibold text-gray-800">${word?.meaning|| 'No Data'}/${word?.pronunciation|| 'No Data'}</h3>
                                <div class="flex justify-between mt-4">
                                    <button class="btn"><i class="fa-solid fa-info cursor-pointer" data-word-id="${word.id}"></i></button>
                                    <button class="btn"><i class="fa-solid fa-volume-high"></i></button>
                                </div>
                            `;
                            vocabCardsContainer.appendChild(card);
                        });

                        
                        const infoIcons = document.querySelectorAll('.fa-info');
                        console.log(infoIcons);
                        infoIcons.forEach(icon => {
                            icon.addEventListener('click', () => {
                                const wordId = icon.getAttribute('data-word-id');
                                fetchWordDetails(wordId);
                            });
                        });
                    }
                }
            })
            .catch(error => console.error('Error fetching vocabulary:', error));
    }

    
    function fetchWordDetails(wordId) {
        fetch(`https://openapi.programming-hero.com/api/word/${wordId}`)
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    const wordDetails = data.data;
                    
                    document.getElementById('modalWord').textContent = wordDetails.word;
                    document.getElementById('modalPronunciation').textContent = `${wordDetails?.meaning|| 'No Data'}`;
                    document.getElementById('modalSentence').textContent = `${wordDetails?.sentence|| 'No Data'}`;
                    document.getElementById('modalSynonyms').textContent = `${wordDetails?.synonyms.join(', ')|| 'No Data'}`;

            
                    document.getElementById('wordModal').showModal();
                }
            })
            .catch(error => console.error('Error fetching word details:', error));
    }
});