import express from 'express';
import users from './MOCK_DATA .json' assert{type:'json'};
import path from 'path';


const app = express();
const PORT = 3000;
const __dirname = path.resolve('./');



//Routes

app.get('/users',(req,res)=>{
    const html = `<ul> 
    ${users.map(user => `<li> ${user.first_name}</li>`).join('')}
    </ul>`

    res.send(html);
})

app.get('/api/users',(req,res)=>{
    res.json(users);
})









//Server setup

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
