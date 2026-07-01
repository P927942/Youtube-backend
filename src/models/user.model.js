import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true //for searching field enableing
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
        

    },
    fullname:{
        type:String,
        required:true,
        unique:true,
        index:true,

    },
    avatar:{
        type:string, //cloudinary url
        required:true
        


    },
    coverImage:{
        type:string, 
        required:true

    },
    watchHistory:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"video"
        }

    ],
    password:{
        type:string,
        required:[true,"password is required"]
    },
    refreshToke:{
        type:string

    }

},{timestamps:true})
//dont use arrow function here
userSchema.pre("save",async function(next){
    if(!this.isModified("password"))return next();
    this.password=bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPsswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)


}
userSchema.methods.generateAccessToken=function(){
    jwt.sign(){
        _id:this._id,
        email: this.email,
        username:this.useranme,
        fullName:this.fullName

    },
    process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:process.env.ACCESS_TOKEN_eXPIRY

    }
}
userSchema.methods.generateRefreshToken=function(){
    jwt.sign(){
        _id:this._id,
        
    },
    process.env.ACCESS_REFRESH_TOKEN,{
        expiresIn:process.env.ACCESS_REFRESH_EXPIRY

    }
}


    
export const User=mongoose.model("User",userSchema)