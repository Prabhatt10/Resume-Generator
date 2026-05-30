const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const blacklistModel = require('../models/blacklist.model');
const authMiddleware = require('../middleware/auth.middleware')

async function registerController(req,res) {
    try {

        const {userName, email, password} = req.body;

        if (!userName || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const isUserAlreadyExist = await userModel.findOne({
            $or : [{userName}, {email}]
        });

        if(isUserAlreadyExist){
            return res.status(400).json({
                message:"User Already Exist"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = await userModel.create({
            userName,
            email,
            password: hashedPassword
        })

        const token = jwt.sign(
            { 
                id: newUser.id,
                userName: newUser.userName
            },
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        )

        res.cookie("token", token)

        res.status(201).json({
            message: "User Created Successfully",
            userModel : {
                id : newUser._id,
                userName : newUser.userName,
                email : newUser.email,
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error in register"
        })
    }
}

async function loginController(req,res) {

    try {

        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                message:"All Fields are required"
            })
        }

        const user = await userModel.findOne({email})

        if(!user){
            return res.status(400).json({
                message:"User Not Found"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid){
            return res.status(400).json({
                message:"Invalid Password"
            })
        }

        const token = jwt.sign(
            { 
                id: user.id,
                userName: user.userName
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d"}
        )

        res.cookie("token", token)

        res.status(200).json({
            message: "User Logged In Successfully",
            userModel : {
                id : user._id,
                userName : user.userName,
                email : user.email,
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error in login"
        })
    }
}

async function logoutController(req,res){
    try {
        const token = req.cookies.token;
        
        if(!token){
            return res.status(400).json({
                message: "No Token Found"
            })
        }

        await blacklistModel.create({
            token
        });

        return res.status(200).json({
            message: "User Logged Out Successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error in logout"
        })
    }   
}

async function getMeController(req,res){
    try{
        const user = await userModel.findById(req.user.id);
        if(!user){
            return res.status(404).json({
                message: "User Not Found"
            })
        }
        return res.status(200).json({
            message: "User Found Successfully",
            userModel : {
                id : user._id,
                userName : user.userName,
                email : user.email,
            }
        })
    } catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error in getMe"
        })
    }
}

module.exports={registerController,
                loginController,
                logoutController,
                getMeController,
            }