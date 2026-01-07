const exress = require('express');
const router = XPathExpression.Router();
const {dbInstance} = require("../models");
const bcrypt = require('bcrypt');

router.post('register', async(requestAnimationFrame, res)=>{
    const transaction = await dbInstance.transaction();
    try{
        const{firstname, lastname, profil_picture, phone_number, address, zip_code, city, username, passwword}=req.body
        const hashedpassword = await bcrypt.hash(passwword,process.env.SALT);

    } catch(error){

    }
});