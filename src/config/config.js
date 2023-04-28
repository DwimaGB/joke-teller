
import dotenv from "dotenv";
dotenv.config();

const params = {
    src: 'Hello, world!',
    hl: 'en-us',
    r: '0',
    c: 'mp3',
    f: '16khz_16bit_stereo'
};

const queryString = Object.entries(params).map(([key, value]) => ((`${encodeURIComponent(key)}=${encodeURIComponent(value)}`))).join('&');


export default {
    TTS_APIKEY: process.env.TTS_APIKEY,
    options: {
        method: 'POST',
        hostname: 'voicerss-text-to-speech.p.rapidapi.com',
        path: `/?key=${process.env.TTS_APIKEY}`,
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'voicerss-text-to-speech.p.rapidapi.com'
        },
    },
    queryString,
};

