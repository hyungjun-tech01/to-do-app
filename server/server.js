const PORT = process.env.MYPORT ?? 8000;
const express = require('express');
const app = express();
const uuidv4 = require('uuid');
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

// create new to do 
app.post('/todos', async(req, res)=> {
    const {user_email, title, progress, date} = req.body;
    const id = uuidv4.v4();
    try{
        console.log('create new to do');
        const response = await pool.query('INSERT INTO todos(id, user_email, title, progress, date) values($1, $2, $3, $4, $5)',
        [id, user_email, title, progress, date]);
        res.json(response); // 결과 리턴을 해 줌 .
    }catch(err){
        console.log(err);
    }
})

//edit to do 
app.put('/todos/:id', async(req, res) => {
    const {id} = req.params;
    console.log(id);
    const {user_email, title, progress, date} = req.body;
    try{
        const response = await pool.query('update todos set user_email = $1 , title = $2, progress = $3 , date = $4 where id = $5',
        [user_email, title, progress, date, id]);
        res.json(response); // 결과 리턴을 해 줌 .
    }catch(err){
        console.log(err);
    }
});

//delete to do 
app.delete('/todos/:id', async(req,res)=>{
    const {id} = req.params;
    try{
        const response = await pool.query('delete from  todos where id = $1',
        [id]);
        res.json(response); // 결과 리턴을 해 줌 .
    }catch(err){
        console.log(err);
    }    
})
app.listen(PORT, ()=> {
    console.log(`Server running on PORT ${PORT}`);
});