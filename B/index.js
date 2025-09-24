const port = 4000;
const express = require("express");
const app = express();
require('dotenv').config()
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const axios =require ("axios");




app.use(express.json());
app.use(cors());
mongoose.connect("mongodb+srv://bullionvan:Josphat0793940573@cluster0.qdlp8ip.mongodb.net/e-commance")

//API Creation
app.get("/", (req,res)=>{
    res.send("Express is running")
})

//image storage
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({storage:storage})


//upload endpoint
app.use('/images', express.static('upload/images'))
app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

//schema for creating products
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
})

app.post('/addproduct', async (req, res) => {
    try {
        // Find all products in the database
        let products = await Product.find({});

        // Generate ID for the new product
        let id;
        if (products.length > 0) {
            let lastProduct = products[products.length - 1];
            id = lastProduct.id + 1;
        } else {
            id = 1;
        }

        // Create a new Product instance based on the request body
        const product = new Product({
            id: id, // Using the generated ID
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
        });

        // Save the product to the database
        await product.save();
        
        // Send a success response to the client
        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error adding product:', error);
        res.status(500).json({ success: false, error: 'Failed to add product' });
    }
});


//deleting product API
app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name
    })
})

//creating API getting all products
app.get("/allproducts", async (req, res) => {
    let products = await Product.find({});
    console.log('All Products Fetched');
    res.send(products);
})

//user schema
const Users = mongoose.model('Users', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

//creating endpont for register user signin
app.post("/signup", async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, errors: "Existing User" })
    }
    let cart = {};
    for (let i; i < 300; i++) {
        cart[i] = 0;
    }
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })
    await user.save();
    const data = {
        user: {
            id: user.id
        }
    }
    const token = jwt.sign(data, 'secret_econ');
    res.json({ success: true, token })
})
//creating endpont for register user login
app.post("/login", async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, "secret_econ")
            res.json({ success: true, token });
        }
        else {
            res.json({ success: false, errors: "Wrong Password" });
        }
    }
    else {
        res.json({ success: false, errors: "Wrong Email Id" })
    }
})
//popullar in women
app.get("/popularinwomen",async(req,res)=>{
    let products = await Product.find({category:'women'});
    let popular_in_women=products.slice(0,4);
    console.log("popular in women");
    res.send(popular_in_women);
})

//endpoint of newcollection
app.get("/newcollection",async(req,res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("Newcollection fetched");
    res.send(newcollection);
})
//midleware to fetch user
const fetchUser=async(req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({errors:"Please Authenticate token"})
    }
    else{
      try {
        const data=  jwt.verify(token, "secret_econ")
        req.user= data.user;
        next();
      } catch (error) {
        res.status(401).send({errors:"Existing yoken"})
      }
    }
}
//endpoint for adding new product into cart
app.post("/addtocart",fetchUser,async(req,res)=>{
    console.log("Added",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId]+=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added")
})

//endpont for removing product from cart
app.post("/removefromcart",fetchUser,async(req,res)=>{
    console.log("romoved",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId]-=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed")
})

//endpoint to get cart
app.post("/getcart",fetchUser,async(req,res)=>{
    console.log("getcart");
    let userData= await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})

//mongodb connection
app.listen(port,(error) =>{
    if (!error) {
        console.log("server is running in port  " + port);
    } else {
        console.log("Error " + error);
    }
});


const generateToken = async (req, res, next) => {
    const secret = process.env.SECRET_KEY;
    const consumer = process.env.CONSUMER_KEY;

    try {
        const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
        const auth = Buffer.from(`${consumer}:${secret}`).toString('base64');

        const response = await axios.post(url, {
            headers: {
                "Authorization": "Basic " + auth,
                "Content-Type": "application/json"
            }
        });

        token =response.data.access_token;
        next();
    } catch (error) {
        console.error("Access token error ", error);
        res.status(401).send({
            "message": 'Something went wrong when trying to process your payment',
            "error": error.message
        });
    }
};



//middileware to generate token for stk
//app.get('/token',(req,res)=>{
  //  generateToken();  
//})
//payments stk
app.post('/stk', generateToken, async (req, res) => {
    const phone = req.body.phone;
    const amount = req.body.amount;

    // Validate if phone and amount are properly extracted
    console.log("Phone:", phone);
    console.log("Amount:", amount);

    // Generating timestamp
    const date = new Date();
    const timestamp =
        date.getFullYear() +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        ("0" + date.getDate()).slice(-2) +
        ("0" + date.getHours()).slice(-2) +
        ("0" + date.getMinutes()).slice(-2) +
        ("0" + date.getSeconds()).slice(-2);

    console.log("Timestamp:", timestamp);

    const shortcode = process.env.SHORT_CORD;
    const passkey = process.env.PASS_KEY;

    // Check if environment variables are properly set
    console.log("Shortcode:", shortcode);
    console.log("Passkey:", passkey);

    // Generating password
    const password = new Buffer.from(shortcode + passkey + timestamp).toString("base64");

    // Logging password for debugging
    console.log("Password:", password);

    try {
        const response = await axios.post(
            "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
                BusinessShortCode: shortcode,
                Password: password,
                TimeStamp: timestamp,
                TransactionType: "CustomerPayBillOnline",
                Amount: amount,
                PartyA: `254${phone}`,
                PartyB: shortcode,
                PhoneNumber: `254${phone}`,
                CallBackURL: "https://mydomain.com/pat",
                AccountReference: `254${phone}`,
                TransactionDesc: "Test"
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        // Logging response data
        console.log("Response Data:", response.data);

        // Sending response to the client
        res.status(200).json(response.data);
    } catch (error) {
        // Handling errors
        console.error("Error:", error.message);
        res.status(400).json(error.message);
    }
})


















