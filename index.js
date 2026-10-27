
import 'dotenv/config'
import express from 'express'
import { bootstrap } from './src/app.controller.js';

const port = process.env.PORT
const app = express();

await bootstrap(app,express);

app.listen(port,()=>{
    console.log(`app run on port ${port}`)
})