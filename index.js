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
        return res.status(500).json({status:"Failed to write file"});
    } 
    return res.status(201).json({status:"created"});
   })

})

//PUT Route - HW

app.put('/api/users',(req,res)=>{
    //Write your put code over here
})

//Patch - Update
//Find the user to update
///api/users/100 -> 100 find

app.patch('/api/users/:id', (req,res)=>{
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user)=> user.id == id);
    
    if(userIndex == -1){
        return res.status(404).json({error:'User not found'});
    }

    const updatedUser = {...users[userIndex], ...req.body};
    users[userIndex] = updatedUser;

    //Sync
    try {
        fs.writeFileSync(path.join(__dirname,'MOCK_DATA.json'),JSON.stringify(users))
        return res.json({status:'User sucessfully updated', user:updatedUser})
    } catch (error) {
        return res.status(505).json({error: 'Failed to update the user'})
    }

})





//Delete - 








//Server setup

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
