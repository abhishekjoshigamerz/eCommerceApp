const User = require('../../model/user');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.registerUser = async function(req, res){
    
    
    try{
        const userExist = await User.findOne({email: req.body.email});
      
        if(userExist){
            return res.status(400).json({error: "Email already exists"});
        }
        else{
            const salt = await bcrypt.genSaltSync(saltRounds);
            const hash = await bcrypt.hashSync(req.body.password, salt);
            console.log(salt);
            const user = new User({
                fullname: req.body.fullname,
                email: req.body.email,
                password: hash,
              
            });
            
            let data = await user.save();
            if(data){
                return res.status(200).json({status:200,message: "User registered successfully"});
            }
        }
    }catch(err){
        console.log(err);
            return res.json(500, {
                message: "Internal Server Error"
            });
        }
    }

module.exports.loginUser = async function(req, res){
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email: email});
       


        if(!user){
            return res.status(400).json({error: "Invalid Username or password "});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({error: "Invalid Username or password "});
        }

        const accessToken = await jwt.sign({userId: user._id} , process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
        const refreshToken = await jwt.sign({userId: user._id} , process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
        console.log(user._id);

        let userRole = user.userRole;
       
        let id = user._id.toString();
        let emailVerified = user.emailVerified;
        const updatedUser = await User.findByIdAndUpdate(id, { refreshToken: refreshToken }, { new: true });
        if(updatedUser){
            res.cookie('jwt',refreshToken,{httpOnly:true,maxAge: 24*60*60*1000});
            return res.status(200).json({accessToken,refreshToken,email,userRole,id,emailVerified});
        }else{
            return res.status(400).json({error: "We are facing some error here"});
        }
        

    }catch(error){
        res.status(500).json({error: "Server Error" + error});
    }

}


module.exports.logoutUser = async function(req, res){
    //on client also delete the access token on front end side

    const cookies = req.cookies;
    if(!cookies?.jwt){
        return res.status(204);
    }

    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({refreshToken: refreshToken});

    if(!foundUser){
        res.clearCookie('jwt',{httpOnly:true});
        return res.status(204);
    }

    //delete refresh token in database 

    const updateUsers = await User.findByIdAndUpdate(foundUser._id, { refreshToken: null }, { new: true });
    if(updateUsers){
        res.clearCookie('jwt',{httpOnly:true});
        return res.status(204).json({message: "Logout Successfull"});
    }else{
        return res.status(401).json({error: "We are facing some error here"});
    }
}
