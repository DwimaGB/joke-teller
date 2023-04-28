
const btn = document.getElementById('joke-btn');
const audioElement = document.getElementById('audio');
const jokeDisplay = document.getElementById('joke');

const serverApi = `${window.origin}/api`;


btn.addEventListener('click', async () => {
    try {
        const tssData = await requestTextToSpeech();

        const audioData = `data:audio/mp3;base64,${tssData.audioData}`;

        audioElement.src = audioData;

    }
    catch (e) {
        console.log(e);
        alert(e.message);
    }
})


/*  */

async function getJoke() {
    const jokeUri = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single'

    try {
        const jokeResponse = await fetch(jokeUri); // fetching joke from joke api

        return jokeResponse.json();
    }
    catch (e) {
        console.log(e);
        alert(e.message);
    }
}

async function requestTextToSpeech() {
    try {
        const jokeData = await getJoke();
        const joke = jokeData.joke;

        jokeDisplay.innerText = joke; // display the joke

        const options = { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ joke }) }; // sending the joke to the server side to request for text to speech api

        const tssResponse = await fetch(serverApi, options);
        const tssData = await tssResponse.json(); // getting the audioData send by the server side using TSS api

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

