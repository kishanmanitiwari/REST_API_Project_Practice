import express from 'express';



const app = express();
const PORT = 3000;













//Server setup

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})
