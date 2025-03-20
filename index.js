require("dotenv").config();
require("./db/connexion");
const express = require("express");
const app = express();
const Router = require("./route/project");

// middlewares
app.use(express.json());
app.use('/project', Router)

app.listen(process.env.PORT, (err)=> {
    if(err) {
        console.log(err.message);
        return;
    }
    console.log(`Server is running on port http://localhost:${process.env.PORT}`);
})