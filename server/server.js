const PORT = process.env.MYPORT ?? 8000;
const express = require('express');
const app = express();
const pool = require('./db');

app.use(express.json()); 
app.use(express.urlencoded( {extended : false } ));


// home  test
app.get('/', (req, res)=>{
    res.send("Hello");
});

// get all todos
app.get('/todos', async(req, res)=>{
    try{
            const todos = await pool.query('select * from todos');
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