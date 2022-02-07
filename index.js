const { createCipheriv } = require("crypto");
const express = require("express");
const mongoose = require("mongoose");
const { reset } = require("nodemon");

const app = express();

app.use(express.json());

// const connect= require("./src/configs/db");


const connect=() =>{
    return mongoose.connect("mongodb+srv://mahindra:mahi_123@cluster0.p0wh2.mongodb.net/banks?retryWrites=true&w=majority")
}

// - User
//     - firstName (required)
//     - middleName (optional)
//     - lastName (required)
//     - age (required)
//     - email (required )
//     - address ( required )
//     - gender ( optional and should default to Female )
//     - type (optional and it can take value of customer or employee and if not provided then default to customer )
//     - createdAt (required)
//     - updatedAt (required)

//user scheme

const userSchema = new mongoose.Schema({
    firseName:{type:String, require:true},
    lastName : {type:String, require:true},
    age:{type:Number, require:true},
    email:{type:String, require:true},
    address:{type:String, require:true},
    gender:{type:String, require:false, default:"female"},
    master:{type:mongoose.Schema.Types.ObjectId,require:true, ref:"master"},
    savings:[{type:mongoose.Schema.Types.ObjectId,require:true, ref:"savings"}]


},
{
    versionKey:false,
    timestamps:true
}
);
// const addressSchema = new mongoose.Schema({
//     area:{type:String, require:true},
//     dno:{type:Number, require:true},
//     district:{type:String, require:true},
//     state:{type:String,require:true}
// },
// {
//     versionKey:false,
//     timestamps:true
// });

// const Address = mongoose.model("address",addressSchema);
// app.post("/address", async(res,req)=>{
//     try{
//         const address = await Address.create(req.body);
//         return res.send(address)
//     }
//     catch(e){
//         return res.send(e.message)
//     }
// })

const User = mongoose.model("user",userSchema)

//CRUD for users
app.post("/users" , async(req,res)=>{
    try{
        const user = await User.create(req.body)
        return res.status(201).send(user);
    }
    catch(e){
        return res.status(500).send(e.message)
    }
})

app.get("/users",async(req,res)=>{
    try{
        const user = await User.find().populate("master").populate("savings").lean().exec();
        return res.status(201).send(user);
    }
    catch(e){
        return res.status(500).send(e.message)
    }
})
app.get("/users/:id",async(req,res)=>{
    try{
        const fixed = await User.findById(req.params.id).lean().exec();
        return res.status(201).send(fixed);
    }
    catch(e){
        return res.status(500).send(e.message)
    }
})
app.patch("/users/:id",async(req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,}).lean().exec();
        return res.status(201).send(user);
    }
    catch(e){
        return res.status(500).send(e.message)
    }
})
app.delete("/users/:id",async(req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(201).send(user);
    }
    catch(e){
        return res.status(500).send(e.message)
    }
})

//For branch Details
// - BranchDetail
// - name (required)
// - address (required)
// - IFSC (required and string)
// - MICR (required and number )
// - createdAt (required)
// - updatedAt (required)

const branchSchema = new mongoose.Schema({
    name:{type:String, require:true},
    address:{type:String, require:true},
    IFSC :{type:String, require:true},
    MICR :{type:Number,require:true},
    master:{type:mongoose.Schema.Types.ObjectId,require:true, ref:"master"}

},
{
    versionKey:false,
    timestamps:true
}
);

const Branch = mongoose.model("branch",branchSchema)


//CRUD for branch DEtailes;
app.post("/branch" , async(req,res)=>{
    try{
        const branch = await Branch.create(req.body)
        return res.status(201).send(branch);
    }
    catch(e){
        return res.status(500).send(e.message)
    }
})

app.get("/branch",async(req,res)=>{
    try{
        const branch = await Branch.find().populate("master").lean().exec();
        return res.status(201).send(branch);
    }
    catch(e){
        return res.status(500).send(e.message)
    }
})
app.get("/branch/:id",async(req,res)=>{
    try{
        const fixed = await Branch.findById(req.params.id).lean().exec();
        return res.status(201).send(fixed);
    }
    catch(e){
        return res.status(500).send(e.message)
    }
})
app.patch("/branch/:id",async(req,res)=>{
    try{
        const branch = await Branch.findByIdAndUpdate(req.params.id,req.body,{new:true,}).lean().exec();
        return res.status(201).send(branch);
    }
    catch(e){
        return res.status(500).send(e.message)
    }
})
app.delete("/branch/:id",async(req,res)=>{
    try{
        const branch = await Branch.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(201).send(branch);
    }
    catch(e){
        return res.status(500).send(e.message)
    }
})


//For Master Account
// - MasterAccount
// - balance (required) This is the total balance that the person has in the bank
// - createdAt (required)
// - updatedAt (required)

const masterSchema = new mongoose.Schema({
    user:[{type: mongoose.Schema.Types.ObjectId,req:true,ref:"users"}],
    balance:{type:Number, require:true},
    // savings:[{type:mongoose.Schema.Types.ObjectId,require:true, ref:"savings"}],
    fixed:[{type:mongoose.Schema.Types.ObjectId,require:true, ref:"fixed"}]
},
{
    versionKey:false,
    timestamps:true
}
);

const Master = mongoose.model("master",masterSchema)

//CRUD for Master DEtailes;
app.post("/master" , async(req,res)=>{
    try{
        const master = await Master.create(req.body)
        return res.status(201).send(master);
    }
    catch(e){
        return res.status(500).send(e.message)
    }
})

app.get("/master",async(req,res)=>{
    try{
        const master = await Master.find().populate("fixed").lean().exec();
        return res.status(201).send(master);
    }
    catch(e){
        return res.status(500).send(e.message)
    }
})
app.get("/master/:id",async(req,res)=>{
    try{
        const fixed = await Master.findById(req.params.id).lean().exec();
        return res.status(201).send(fixed);
    }
    catch(e){
        return res.status(500).send(e.message)
    }
})
app.patch("/master/:id",async(req,res)=>{
    try{
        const master = await Master.findByIdAndUpdate(req.params.id,req.body,{new:true,}).lean().exec();
        return res.status(201).send(master);
    }
    catch(e){
        return res.status(500).send(e.message)
    }
})
app.delete("/master/:id",async(req,res)=>{
    try{
        const master = await Master.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(201).send(master);
    }
    catch(e){
        return res.status(500).send(e.message)
    }
})


//For Savings Account
// SavingsAccount
// - account_number ( required and should be unique)
// - balance ( required )
// - interestRate ( required )
// - createdAt (required)
// - updatedAt (required)

//Savings Schema

const saveSchema = new mongoose.Schema({
    accountNo:{type:Number, required:true, unique:true},
    balance :[
        {type:mongoose.Schema.Types.ObjectId,require:true, ref:"master"}
    ],
    intrestRate:{type:Number,require:true},

},
{
    versionKey:false,
    timestamps:true
}
);

const Savings = mongoose.model("savings",saveSchema)


//CRUD for branch DEtailes;
app.post("/savings" , async(req,res)=>{
    try{
        const savings = await Savings.create(req.body)
        return res.status(201).send(savings);
    }
    catch(e){
        return res.status(500).send(e.message)
    }
})

app.get("/savings",async(req,res)=>{
    try{
        const savings = await Savings.find().populate("master").lean().exec();
        return res.status(201).send(savings);
    }
    catch(e){
        return res.status(500).send(e.message)
    }
})
app.get("/savings/:id",async(req,res)=>{
    try{
        const fixed = await Savings.findById(req.params.id).lean().exec();
        return res.status(201).send(fixed);
    }
    catch(e){
        return res.status(500).send(e.message)
    }
})
app.patch("/savings/:id",async(req,res)=>{
    try{
        const savings = await Savings.findByIdAndUpdate(req.params.id,req.body,{new:true,}).lean().exec();
        return res.status(201).send(savings);
    }
    catch(e){
        return res.status(500).send(e.message)
    }
})
app.delete("/savings/:id",async(req,res)=>{
    try{
        const savings = await Savings.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(201).send(savings);
    }
    catch(e){
        return res.status(500).send(e.message)
    }
})

//for Fixed Account
// - FixedAccount
//     - account_number ( required and should be unique)
//     - balance ( required )
//     - interestRate ( required )
//     - startDate ( required )
//     - maturityDate (required )
//     - createdAt (required)
//     - updatedAt (required)


const fixedSchema = new mongoose.Schema({
    accountNo:{type:Number, required:true, unique:true},
    balance :[
        {type:mongoose.Schema.Types.ObjectId,require:true, ref:"master"}
    ],
    intrestRate:{type:Number,require:true},
    startDate :{type:Number,require:true},
    maturityDate:{type:Number,require:true},

},
{
    versionKey:false,
    timestamps:true
}
);

const Fixed = mongoose.model("fixed",saveSchema)


//CRUD for branch DEtailes;
app.post("/fixed" , async(req,res)=>{
    try{
        const fixed = await Fixed.create(req.body)
        return res.status(201).send(fixed);
    }
    catch(e){
        return res.status(500).send(e.message)
    }
})

app.get("/fixed",async(req,res)=>{
    try{
        const fixed = await Fixed.find().populate("master").lean().exec();
        return res.status(201).send(fixed);
    }
    catch(e){
        return res.status(500).send(e.message)
    }
})
app.get("/fixed/:id",async(req,res)=>{
    try{
        const fixed = await Fixed.findById(req.params.id).lean().exec();
        return res.status(201).send(fixed);
    }
    catch(e){
        return res.status(500).send(e.message)
    }
})
app.patch("/fixed/:id",async(req,res)=>{
    try{
        const fixed = await Fixed.findByIdAndUpdate(req.params.id,req.body,{new:true,}).lean().exec();
        return res.status(201).send(fixed);
    }
    catch(e){
        return res.status(500).send(e.message)
    }
})
app.delete("/fixed/:id",async(req,res)=>{
    try{
        const fixed = await Fixed.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(201).send(fixed);
    }
    catch(e){
        return res.status(500).send(e.message)
    }
})




app.listen(1342,async function(){
    await connect()
    console.log("Lisitinening Port at 1342")
})