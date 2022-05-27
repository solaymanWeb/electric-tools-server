const express =require('express');
const app = express();
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

//middle ware
app.use(cors());
app.use(express.json())

// user= admin1
// pass = cP3Pef7ncfO0prgc


const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.r1x0s.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   console.log('mongodb connect')
//   // perform actions on the collection object
//   client.close();
// });



app.get('/',(req, res)=>{
    res.send('hello')
})

app.listen(port,()=>{
    console.log('listing', port)
})