const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

exports.registerUser = async (req, res) => {
    console.log('Hitting Registration.');
    try{
        const validations = await validateRegistration(req.body)
        if(validations.isValid){
            console.log('Valid Credentials!!');
            const {
                firstName,
                lastName,
                email,
                userName,
                password
            } = req.body;
            const hashedPassword = await bcrypt.hash(password, 15);
            const user = new User({ firstName, lastName, email, userName, password : hashedPassword });
            await user.save();
            return res.send(JSON.stringify({
                success : true
            }))
        }
        else{
            console.log('Invalid Credentials');
            return res.send(JSON.stringify({
                success : false,
                validations
            }))
        }
    }catch(e){
        console.log(`Error Sending Registration ${e}`);
        return res.send(JSON.stringify({
            success : false,
            error : e
        }));
    }
}

exports.loginUser = async (req, res) => {
    console.log('Hitting Login User.');
    try{
        const {
            userNameEmail,
            password
        } = req.body;
        const checkUserData = emailRegex.test(userNameEmail) ?
            { email : userNameEmail } :
            { userName : userNameEmail };
        const checkUser = await User.findOne(checkUserData);
        if(!checkUser){
            return res.send(JSON.stringify({
                success : false,
                error : 'Incorrect Username or Password.'
            }));
        }
        const checkPassword = await bcrypt.compare(password, checkUser.password);
        if(checkPassword){
            // Assign Json web token here along with necessary data
            const token = jwt.sign({
                _id : checkUser._id
            }, process.env.JWT_SECRET,
            {
                expiresIn : '2 days'
            });
            return res.send(JSON.stringify({
                success : true,
                token,
                homeUserName : checkUser.userName
            }));
        }
        return res.send(JSON.stringify({
            success : false,
            error : 'Incorrect Username or Password'
        }))
    }catch(e){
        console.log(`Error Logging User In ${e}`);
        return res.send(JSON.stringify({
            success : false,
            error : e
        }));
    }
}

const validateRegistration = async ({firstName, lastName, email, userName, password, confirm}) => {
    const errors = {};
    let isValid = true;
    const checkEmail = await User.findOne({email});
    if(checkEmail){
        isValid = false;
        errors.email = { inUse : true }
    }
    if(!emailRegex.test(email)){
        isValid = false;
        errors.email = { invalidFormat : true, ...errors.email };
        console.log(errors);
    }
    const checkUserName = await User.findOne({userName});
    if(checkUserName){
        isValid = false;
        errors.userName = { inUse : true };
    }
    if(!userName.length || userName.length < 3){
        isValid = false;
        errors.userName = { minLength : true, ...errors.userName };
    }
    if(!firstName.length || firstName.length < 3){
        isValid = false;
        errors.firstName = { minLength : true }
    }
    if(!lastName.length || lastName.length < 3){
        isValid = false;
        errors.lastName = { minLength : true };
    }
    if(!password.length || password.length < 8){
        isValid = false;
        errors.password = { minLength : true };
    }
    if(password !== confirm){
        isValid = false;
        errors.password = { misMatched : true, ...errors.password };
    }
    const validations = {
        isValid,
        errors
    }
    return validations;
}