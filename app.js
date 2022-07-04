const cookieParser=require('cookie-parser');
const express=require('express');
const mongoose=require('mongoose');
const path=require('path');
const cors=require('cors')
const userRouter=require('./routers/userRouter');
const clientRouter=require('./routers/clientRouter');
const employeRouter=require('./routers/employeRouter');
const productRouter=require('./routers/productRouter');
const catagoryRouter=require('./routers/catagoryRouter');
const cartRouter=require('./routers/cartRouter');
const app = express();
// {useCreateIndex:true,useFindAndModify:false,useNewUrlParser:true,useUnifiedTopology:true}
mongoose.connect("mongodb+srv://haseeb-ashiq:j1A6L5ls8IsK7d29@cluster0.6dnqg.mongodb.net/POS?retryWrites=true&w=majority")
mongoose.connection.once('open',()=>console.log('database successful connected.'))
app.use(cors());
app.use(express.json());
app.use(cookieParser());
const port=5000;
console.log(path.join(__dirname, "uploads"))
app.use("/public/", express.static(path.join(__dirname, "uploads")));
app.use('/api/',userRouter);
app.use('/api',clientRouter);
app.use('/api',employeRouter);
app.use('/api',productRouter);
app.use('/api',catagoryRouter);
app.use('/api',cartRouter);
app.listen(process.env.PORT || port,()=>{console.log(`server is running on port => ${port}`)})