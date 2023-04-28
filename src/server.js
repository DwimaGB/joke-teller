
import path from "path";
import http from "https";
import express from "express";
import config from "./config/config.js";

const app = express();
const __dirname = path.resolve();
const publicDir = path.join(__dirname, 'src/public')

app.use(express.json());
app.use(express.static(publicDir));

app.get('/', (req, res) => {
    res.sendFile('index.html');
})


const options = {
    method: 'POST',
    hostname: 'voicerss-text-to-speech.p.rapidapi.com',
    path: `/?key=${config.TTS_APIKEY}`,
    headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': config.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'voicerss-text-to-speech.p.rapidapi.com'
    }
}

app.post('/api', async (req, res) => {
    const params = {
        src: req.body.joke,
        hl: 'en-us',
        r: '0',
        c: 'mp3',
        f: '32khz_16bit_stereo'
    };

    const queryString = Object.entries(params).map(([key, value]) => ((`${encodeURIComponent(key)}=${encodeURIComponent(value)}`))).join('&');

    try {
        const request = http.request(options, (response) => {
            const chunks = []

            response.on('error', (e)=>{
                console.log(e);
                res.status(500).json({message: e});
            })

            response.on('data', chunk => {
                chunks.push(chunk);
            })


            response.on('end', () => {
                const body = Buffer.concat(chunks);

                if (body.toString().includes('ERROR')) {
                    return res.status(500).json({message: body.toString()});
                }
        
                res.json({audioData: body.toString('base64')});
            })


        })

        request.write(queryString);
        request.end();
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: e.message });
    }
})

app.listen(process.env.PORT || 3000);
