const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

module.exports.signUp = async (req,res,next) => {
    try{
        const {username, email, password, confirmPassword, gender } = req.body;

        const user = await User.findOne({email: email});

        if(user){
            const error = new Error('User already exist with provided email');
            error.statusCode = 422;
            throw error;
        }

        if(password === confirmPassword){
            const error = new Error('Password does not match with confirm password');
            error.statusCode = 400;
            throw error;
        }

        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            username,
            email,
            password : hashPass,
            gender,
            profilePic : gender === 'male' ? boyProfilePic : girlProfilePic,
        })

        const savedUser = await newUser.save();

        const token = jwt.sign(
            {email: savedUser.email, userId : savedUser._id.toString()},
            secretKey,
            {expiresIn: '24h'}
        )
        
        res.status(201).json({message: 'User Created!', userId : savedUser._id.toString(), token: token})
    }catch(err){
        next(err);
    }
}

module.exports.signIn = async (req,res,next) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email:email});

        const isPasswordMatch = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPasswordMatch ){
            const error = new Error('Invalid Email or Password');
            error.statusCode = 400;
            throw error;
        }

        const token = jwt.sign(
            {email: user.email, userId : user._id.toString()},
            secretKey,
            {expiresIn: '24h'}
        )
        
        res.status(201).json({message: 'Logged in successfully!', userId : user._id.toString(), token: token})
    }catch(err){
        next(err);
    }
}

module.exports.signOut = (req,res,next) => {
    try{
        res.status(200).json({message: "Logged out Successfully", token: "", userId: ""});
    }catch(err){
        next(err);
    }
}