import express from 'express';
import users from './MOCK_DATA.json' assert{type:'json'};
import path from 'path';
import fs from 'fs';


const app = express();
const PORT = 3000;
const __dirname = path.resolve('./');

//Middleware
app.use(express.urlencoded({extended:true}));



//Routes
//GET 

app.get('/users',(req,res)=>{
    const html = `<ul> 
    ${users.map(user => `<li> ${user.first_name}</li>`).join('')}
    </ul>`

    res.send(html);
})

app.get('/api/users',(req,res)=>{
    res.json(users);
})

//Dynamic routing
app.get('/api/users/:id',(req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user)=>user.id==id);
    res.json(user)
})

//POST Route

app.post('/api/users',(req,res)=>{
    //create new user
    const newUser = req.body;
    newUser.id = users.length+1;

    //push this user
    users.push(newUser);

    //Write upadated users array to Mock_data.json
   fs.writeFile(__dirname+'/MOCK_DATA.json',JSON.stringify(users),(err)=>{
    if (err) {
        console.log(err);
        return res.status(50).json({status:"Failed to write file"});
    } 
    return res.status(201).json({status:"created"});
   })

})









//Server setup

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
