const loadLessons = () =>{
    const url = 'https://openapi.programming-hero.com/api/levels/all';
    fetch(url)
    .then(response => response.json())
    .then(json => {
        displayLessons(json.data);
    })
}

const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach((btn) => btn.classList.remove("active"));
}

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        removeActive();
        const clickBtn = document.getElementById(`lesson-btn-${id}`)
        clickBtn.classList.add("active")
        displayLevelWord(data.data);
    })
}

const displayLevelWord = (words) =>{
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML= '';

    if(words.length == 0){
        wordContainer.innerHTML= `
        <div class="text-center col-span-3 font-bangla rounded-full py-10 space-y-4">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="text-sm text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="text-2xl text-[#292524] font-medium">নেক্সট Lesson এ যান</h2>
        </div>
        `;
        return;
    }

    words.forEach(word => {
        console.log(word);
        const wordCard = document.createElement('div');
        wordCard.innerHTML = `
         <div class="bg-white rounded-md shadow-sm text-center py-10 px-5 space-y-6">
            <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="font-medium">Meaning /Pronounciation</p>
            <div class="font-bangla text-2xl font-medium text-[#18181B]">" ${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"}"</div>
            <div class="flex justify-between items-center">
                <button onclick= "my_modal_5.showModal()" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `
        wordContainer.append(wordCard);
    });
}

const displayLessons = (lessons) =>{
    // 1. get the container and empty the container
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = '';
    // 2. get into every lessons
    for(let lesson of lessons){
        console.log(lesson);
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button> 
        `
        // append into container
        levelContainer.append(btnDiv);
    }
}

loadLessons();