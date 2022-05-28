const express =require('express');
const app = express();
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

//middle ware
app.use(cors());
app.use(express.json())

// user= admin1
// pass = cP3Pef7ncfO0prgc


const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.r1x0s.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){

    try{
        await client.connect();
        const toolsCollection = client.db('electric-tools').collection('tools')
        const reviewCollection = client.db('user-review').collection('review')

        app.get('/tools', async(req, res)=>{
            const query = {};
            const cursor = toolsCollection.find(query);
            const tools = await cursor.toArray();
            res.send(tools)
        })

        app.get('/tools/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const tool = await toolsCollection.findOne(query);
            res.send(tool)
        })
        //user review send database
        app.post('/review', async(req, res)=>{
            const newReview = req.body;
            const result = await reviewCollection.insertOne(newReview);
            res.send(result)
        })

        //limit review get api for home section
        app.get('/review', async(req, res)=>{
            const query = {};
            const cursor = reviewCollection.find(query);
            const result = await cursor.limit(3).toArray();
            res.send(result)
        });

        //all review get api
        app.get('/allreview', async(req, res)=>{
            const query = {};
            const cursor = reviewCollection.find(query);
            const result = await cursor.toArray();
            res.send(result)
        })

    }finally{

    }
}
run().catch(console.dir);


// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   console.log('mongodb connect')
//   // perform actions on the collection object
//   client.close();
// });
console.log('hello')


app.get('/',(req, res)=>{
    res.send('hello')
})

app.listen(port,()=>{
    console.log('listing', port)
})