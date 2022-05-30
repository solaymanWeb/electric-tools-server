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
        const purchaseCollection = client.db('purchase-information').collection('purchase')
        const userCollection = client.db('user-information').collection('user');

        
        app.post('/tools', async(req, res)=>{
            const newTools = req.body;
            const result = await toolsCollection.insertOne(newTools);
            res.send(result);
        })

        //sign in and create user Email
        app.put('/user/:email',async(req, res)=>{
            const email = req.params.email;
            const user = req.body;
            const filter = {email: email};
            const options = {upsert: true};
            const updateDoc ={
                $set: user,
            };
            const result = await userCollection.updateOne(filter, updateDoc, options)
            res.send(result); 

        })

        //make admin
        app.put('/user/admin/:email',async(req, res)=>{
            const email = req.params.email;
            const filter = {email: email};
            const updateDoc ={
                $set: {role:'admin'},
            };
            const result = await userCollection.updateOne(filter, updateDoc)
            res.send(result); 

        })

        // Delete user 
        app.delete('/users/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            const result = await userCollection.deleteOne(query)
            res.send(result)
        })
        // get all user 
        app.get('/users', async(req, res)=>{
            const users = await userCollection.find().toArray();
            res.send(users)
        })

        app.get('/tools', async(req, res)=>{
            const query = {};
            const cursor = toolsCollection.find(query);
            const tools = await cursor.limit(6).toArray();
            res.send(tools)
        });

        app.get('/alltools', async(req, res)=>{
            const query = {};
            const cursor = toolsCollection.find(query);
            const result = await cursor.toArray();
            res.send(result)
        })

        //Manage Product delete api
        app.delete('/alltools/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await toolsCollection.deleteOne(query);
            res.send(result)
      
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

        //limit review get api for home sectionsgit 
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

        //purchase information 
        app.post('/purchase',async(req, res)=>{
            const newPurchase = req.body;
            const result = await purchaseCollection.insertOne(newPurchase)
            res.send(result)
        })

        // particular user k tar email deya khuje ber korbo 

        app.get('/purchase',async(req, res)=>{
            const email = req.query.email;
            const query = {email: email}
            const cursor = purchaseCollection.find(query);
            const result = await cursor.toArray();
            res.send(result)
        })

        //delet api
        
        app.delete('/purchase/:id', async(req, res)=>{
            const id =req.params.id;
            const query = {_id: ObjectId(id) }
            const result = await purchaseCollection.deleteOne(query)
            res.send(result);
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