const createElements = (arr) => {
    const htmlElements = arr.map((el)=> `<span class="btn">${el}</span>`);
    return (htmlElements.join(" "));
}

const manageSpinner = (status) => {
    if(status == true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    }
    else{
        document.getElementById("spinner").classList.add("hidden");
        document.getElementById("word-container").classList.remove("hidden");
    }
}

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
    manageSpinner(true);
    fetch(url)
    .then(response => response.json())
    .then(data => {
        removeActive();
        const clickBtn = document.getElementById(`lesson-btn-${id}`)
        clickBtn.classList.add("active")
        displayLevelWord(data.data);
    })
}

// {
//     "word": "Abundant",
//     "meaning": null,
//     "pronunciation": "অবানডান্ট",
//     "level": 3,
//     "sentence": "Water is abundant in rainy seasons.",
//     "points": 3,
//     "synonyms": [],
//     "id": 1
// }

const loadWordDetails = async(id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const response = await fetch(url);
    const details = await response.json();
    displayWordDetails(details.data);
}

const displayWordDetails = (word) => {
    console.log(word);
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
     <div class="">
                    <h2 class="text-xl font-bold">${word.word}( <i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})</h2>
                </div>
                <div class="">
                    <h2 class="font-bold">Meaning</h2>
                    <p>${word.meaning}</p>
                </div>
                <div class="">
                    <h2 class="font-bold">Example</h2>
                    <p>${word.sentence}</p>
                </div>
                <div class="">
                    <h2 class="font-bold">সমার্থক শব্দ গুলো</h2>
                    <div class=""> ${createElements(word.synonyms)}</div>
                </div>

                <div class="">
                    <button class="btn btn-primary rounded-md">Complete Learning</button>
                </div>
    `;
    document.getElementById('word_modal').showModal();
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
        manageSpinner(false);
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
                <button onclick= "loadWordDetails(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `
        wordContainer.append(wordCard);
    });
    manageSpinner(false);
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

document.getElementById('btn-search').addEventListener("click", () => {
    removeActive();
    const input = document.getElementById('btn-input');
    const searchValue = input.value.trim().toLowerCase();
    console.log(searchValue);

    fetch("https://openapi.programming-hero.com/api/words/all")
    .then(response => response.json())
    .then(data => {
        const allWords = data.data;
        console.log(allWords);
        const filterWords = allWords.filter((word) => word.word.toLowerCase().includes(searchValue))
        displayLevelWord(filterWords);
    })

})