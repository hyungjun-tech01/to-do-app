const PORT = process.env.MYPORT ?? 8000;
const express = require('express');
const app = express();
const pool = require('./db');
const cors = require('cors');

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded( {extended : false } ));


// home  test
app.get('/', (req, res)=>{
    res.send("Hello");
});

// get all todos by user 
app.get('/todos/:userEmail', async(req, res)=>{

    const userEmail = req.params.userEmail;
    console.log(userEmail);
    try{
        // 조회조건 -> $1 , 
            const todos = await pool.query('select * from todos where user_email = $1',[userEmail] );
            res.json(todos.rows);
            console.log(todos.rows);
    }catch(err){
        console.log(err);
    }
    }
)

app.listen(PORT, ()=> {
    console.log(`Server running on PORT ${PORT}`);
});