const express =require('express');
const app = express();
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000;

//middle ware
app.use(cors());
app.use(express.json())


app.get('/',(req, res)=>{
    res.send('hello')
})

app.listen(port,()=>{
    console.log('listing', port)
})