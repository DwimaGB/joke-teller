
import path from "path";
import http from "https";
import express from "express";
import config from "./config/config.js";

const app = express();
const __dirname = path.resolve();
const publicDir = path.join(__dirname, 'src/public')

app.use(express.static(publicDir))

app.get('/', (req, res)=>{
    res.sendFile('index.html');
})

app.get('/api', async(req, res)=>{
    try{
        const request = http.request(config.options, (response)=>{
            const chunks = []

            response.on('data', chunk=>{
                chunks.push(chunk);
            })

            response.on('end', ()=>{
                const body = Buffer.concat(chunks).toString('base64');
                res.json({audioData: body});
            })
        })

        request.write(config.queryString);
        request.end();
    }   
    catch(e){
        console.log(e);
    }
})

app.listen(process.env.PORT || 3000);
