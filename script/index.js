const loadLessons = () =>{
    const url = 'https://openapi.programming-hero.com/api/levels/all';
    fetch(url)
    .then(response => response.json())
    .then(json => {
        displayLessons(json.data);
    })
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
        <button class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button> 
        `
        // append into container
        levelContainer.append(btnDiv);
    }
}

loadLessons();