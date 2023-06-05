const PORT = process.env.PORT ?? 8000;
const express = require('express');
const app = express();
const pool = require('./db');

// home  test
app.get('/', (req, res)=>{
    res.send("Hello");
});

// get all todos
app.get('/todos', (req, res)=>{

    try{
        const todos = async () => {
            const todos = await pool.query('select * from todos');
            res.json(todos.rows);
        } 
    }catch(err){

    }
    }
)

app.listen(PORT, ()=> console.log(`Server running on PORT ${PORT}`));