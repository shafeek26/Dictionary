let input = document.querySelector('#input');
let searchButton = document.querySelector('#search');
let api_key = 'd05d282e-8c19-4ed4-961d-902d1581e2bc';
let notFound = document.querySelector('.not_found');
let defBox = document.querySelector('.def')
let audioBox = document.querySelector('.audio')
let loading = document.querySelector('.loading')



searchButton.addEventListener('click',(e)=>{
    e.preventDefault();
    notFound.innerText = ''
    defBox.innerText = ''
    audioBox.innerHTML = ''

    
    // getting input data
    let word = input.value;
    
    if(word === ''){
        alert('please enter word')
        return;
    }
    // fetching data from api
    return getData(word)
})

async function getData (word){
     loading.style.display = 'block';
    const responce = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${api_key}
`);
const data = await responce.json();
// check if no data found
if(!data.length){
     loading.style.display = 'none'
    notFound.innerText = 'result not found'
    return
}

// checking suggested word
if(typeof data[0] === 'string'){
     loading.style.display = 'none'
    const suggestion_head = document.createElement('h3');
    suggestion_head.innerText = 'Did you mean.....!'
    suggestion_head.classList.add('suggested')
    notFound.appendChild(suggestion_head);

    data.forEach((element)=>{
        let sugg_word = document.createElement('span')
        sugg_word.classList.add('sugg_word')
        sugg_word.innerText = element
        notFound.appendChild(sugg_word)
    })
    return;
}
// when we get data
let defination = data[0].shortdef[0];
defBox.innerText = defination;

// render sound from API data
let soundName = data[0].hwi.prs[0].sound.audio;

if(soundName){
    loading.style.display = 'none'
    renderSound(soundName)
}
}

// rendering audio files from API

function renderSound(soundName){
    
    let subFolder = soundName.charAt(0);

    let soundSrc = `https://media.merriam-webster.com/soundc11/${subFolder}/${soundName}.wav?key=${api_key}`

    let aud = document.createElement('audio')
    aud.controls = true;
    aud.src = soundSrc
    audioBox.appendChild(aud)
}



































