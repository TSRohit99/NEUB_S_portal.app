const express = require("express");
const cors = require("cors");
require("dotenv").config();
const ejs = require("ejs");
const path = require("path");

const app = express();
const port =5000;

app.use(cors());
app.use(express.json());
app.set("view engine", "ejs"); // Use EJS as the template engine
app.set("views", path.join(__dirname, "views"));

//Connnectiong to mongoDB

const { MongoClient, ServerApiVersion } = require("mongodb");

const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lrgci3m.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const studentsCollection = client.db("NEUB_Sinfo").collection("students");
    const resultsCollection = client.db("NEUB_Sinfo").collection("results");
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    
    /*
    //querying all the info to this route

   app.get("/students", async (req, res) => {
     const cursor = studentsCollection.find();
     const result = await cursor.toArray();
     res.send(result);
   }); 
   */
   

    // querying the DB

    app.get("/students/:id", async (req, res) => {
      const id = req.params.id;
      const info = await studentsCollection.findOne({ id });
      // res.send(info);
      if(info!=null){
      res.render("info", {
        name: info.name,
        uid: info.id,
        email: info.email,
        bg: info.bloodGroup,
        sem: info.semester,
        cgpa: info.result,
        status: info.status,
      });
    }else {
      res.status(404).send('Student not found');
    }

    });

    app.get("/students/:id/result", async (req, res) => {
      const id = req.params.id;
      const result = await resultsCollection.findOne({ id });
      
      if(result!=null)
      {
        res.render("result",{
        name : result.name,
        ds : result.ds,
        ds_c: result.ds_c,
        dsLab_c : result.dsLab_c,
        dsLab : result.dsLab,
        dld_c: result.dld_c,
        dld: result.dld,
        dldLab_c : result.dldLab_c,
        dldLab : result.dldLab,
        bee : result.bee,
        bee_c : result.bee_c,
        beeLab_c : result.beeLab_c,
        beeLab: result.beeLab,
        math_c : result.math_c,
        math : result.math,
        physices_c : result.physices_c,
        physices : result.physices,
        bs : result.bs,
        bs_c : result.bs_c,
        currentSemResult : result.currentSemResult,
        prevSemResult : result.prevSemResult

        })} else {
          res.status(404).send('Student not found');
        }
      
    });

    app.get("/test", async(req, res)=> {

      res.send( "You are on Test page")

    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

run().catch(console.dir);


app.get("/", (req, res) => {
  res.send("NEUB STUDENT PORTAL BACKEND");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
