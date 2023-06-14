const PORT = process.env.MYPORT ?? 8000;
const express = require('express');
const app = express();
const uuidv4 = require('uuid');
const pool = require('./db');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

//signup
app.post('/signup', async(req, res) => {
    const {email, password} = req.body;    
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    try{
        const signUp = await pool.query('INSERT INTO users(email, hashed_password) VALUES($1,$2)',
        [email, hashPassword]);

        const token= jwt.sign({email}, 'secret', {expiresIn:'1hr'});
        res.json({email, token});
    }catch(err){
        console.error(err);
        if(err){
            res.json({detail:err.detail});
        }
    }
});

//login
app.post('/login', async(req, res) => {
    const {email, password} = req.body;
    try{
        const users = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if(!users.rows.length) return res.json({detail:'User does not exist'});

        console.log(users);
        const success = await bcrypt.compare(password, users.rows[0].hashed_password);
        const token = jwt.sign({email}, 'secret', {expiresIn:'1hr'});
        if(success){
            console.log("success");
            res.json({'email' : users.rows[0].email, token});
        }else{
            console.log("fail");
            res.json({detail:"Login failed"});
        }
    }catch(err){
        console.error(err);
    }
});


app.listen(PORT, ()=> {
    console.log(`Server running on PORT ${PORT}`);
});