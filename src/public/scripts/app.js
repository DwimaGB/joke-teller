
const btn = document.getElementById('joke-btn');
const audioElement = document.getElementById('audio');
const replayBtn = document.getElementById('replay');
const jokeDisplay = document.getElementById('joke');

const serverApi = `${window.origin}/api`;


btn.addEventListener('click', async () => {
    btn.disabled = true; // disabling button to avoid simultaneous request

    try {
        const tssData = await requestTextToSpeech();

        const audioData = `data:audio/mp3;base64,${tssData.audioData}`;

        audioElement.src = audioData;
        audioElement.play();
    }
    catch (e) {
        console.log(e);
        alert(e.message);
    }
})

audioElement.addEventListener('loadedmetadata', ()=>{
    setTimeout(()=>{
        btn.disabled = false;
    }, audioElement.duration * 1000)  // enabling again after the joke has been told
    
})

replayBtn.addEventListener('click', ()=>{
    if(audioElement.duration > 0){ // just ensuring audio has been loaded
        audioElement.play();
    }
})

/*  */

async function getJoke() {
    const jokeUri = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit'

    try {
        const jokeResponse = await fetch(jokeUri); // fetching joke from joke api

        const jokeData = await jokeResponse.json();

        if(!jokeData.joke){
            return `${jokeData.setup}...${jokeData.delivery}`;
        }
        else{
            return jokeData.joke;
        }
    }
    catch (e) {
        console.log(e);
        alert(e.message);
    }
}

async function requestTextToSpeech() {
    try {
        const joke = await getJoke();

        jokeDisplay.innerText = joke; // display the joke

        const options = { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ joke }) }; // sending the joke to the server side to request for text to speech api

        const tssResponse = await fetch(serverApi, options);
        const tssData = await tssResponse.json(); // getting the audioData responsed by the server side using TSS api

        if (tssResponse.status === 500) {
            throw new Error(tssData.message);
        }

        return  tssData;
    }
    catch (e) {
        console.log(e);
        alert(e.message);
    }
}

