const express = require("express");
const port = 3010; 
const path = require("path");
const { connectToMongoDB } = require("./connections");

const signUp = require("./routes/signUp");
const login = require("./routes/login");

const afterlogin = require("./routes/afterlogin");


const cookieParser = require("cookie-parser");
const { restrictToLoggedinUserOnly, checkAuth} = require("./middlewares/foraccessingafterloginpage");
const app = express();


const homepage = require("./routes/homepage");




connectToMongoDB("mongodb+srv://sandeep:sandeep@jokecluster.bvdzkx9.mongodb.net/?retryWrites=true&w=majority&appName=Jokecluster").then(() =>
  console.log("MongoDb connected")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./view"));



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



 
app.use("/",signUp );

app.use("/user",login);


app.use("/user/afterloginpage",restrictToLoggedinUserOnly,afterlogin);


 
app.use("/homepage",homepage);

app.use(express.static(path.join(__dirname, '../public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



app.get("/user/expense",restrictToLoggedinUserOnly, function (req, res) {
  res.render("index");
});


app.listen(port, () => console.log(`Server Started at PORT:${port}`));




