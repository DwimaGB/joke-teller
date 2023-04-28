
const btn = document.getElementById('joke-btn');
const uri = `${window.origin}/api`;

btn.addEventListener('click', async()=>{
    try{
        const response = await fetch(uri);
        const data = await response.json();

        const audioData = `data:audio/mp3;base64,${data.audioData}`;

        const audio = new Audio(audioData);
        audio.play();
    }   
    catch(e){
        console.log(e);
        alert(e.message);
    }
})



