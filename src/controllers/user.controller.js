import {asyncHandler} from "../utils/asyncHandler.js";
import {apiError} from "../utils/apiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {apiResponse} from "..utils/apiResponse.js"

const registerUser= asyncHandler(async(req,res)=>{
    //get user details from frontend depend on model kya kya detail lena h
    //validation (kuch empty toh nhi h)
    //check if user already exists: username,email
    //files h ya nahi(images,avatar)
    //upload them to cloudinary,avatar check 
    //create user object- create entry in db
    //remove paswd and refresh token filed from response
    //check response aaya ya nhi/user create hua ya nhi
    //return response or send error


    const {fullname,email,username,password}=req.body
    //store krdlo user deatils

    if(fulname===""){
        throw new ApiError(400,"fullname is required")
    }
    if(emmail===""){
        throw new ApiError(400,"email is required")
    }
    if(username===""){
        throw new ApiError(400,"username is required")
    }
    if(password===""){
        throw new ApiError(400,"password is required")
    }
    //validation

    const existed_user=User.findOne({
        $or:[{username},{email}]
    })

    if(existed_user){
        throw new ApiError(409,"user already exists")
    }
    //user exists or not validation

    //req.files is given by multer

    const avatarLocalPath=req.files?.avatar[0]?.path;
    const CoverImageLocalPath=req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400,"avatar file is required")
    }


    //upload to cloudinary
    const avatar=await uploadOnCloudinary(avatarLocalPath)
    const coverImage=await uploadOnCloudinary(CoverImageLocalPath)

    if(!avatar){
        throw new ApiError(400,"avatar file is required")

    }


    const user= await User.create({
        fullname,
        avatar: avatar.url,
        coverImage:coverImage?.url||"",
        email,
        password,
        username:username.toLowerCase()
    })
    //mongo db har ek entry k sath ek id assign kr deta h
    //check if user aaya h nd if aaya h pasword and refreshTokn remove krdo

    const createdUser =  await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"something went wrong while registering the user")
    }

    //response bhejdo
    

    return res.status(201).json(
        new apiResponse(200, createdUser,"user registered successfully")
    )















})


export {registerUser}
