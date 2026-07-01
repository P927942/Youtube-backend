import mongoose,{Schema} from "mongoose";

const videoSchema=new Schema({
    videoFile:{
        type:string,//cloudinary url
        required:true
    },
    thumbnail:{
        type:string,//cloudinary url
        required:true

    },
    title:{
        type:string,//cloudinary url
        required:true
    },
    description:{
        type:string,//cloudinary url
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    views:{
        type:Number,
        default:0

    },
    isPublished:{
        type:Boolean,
        default:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }





},{
    timestamps:true
})

export const Video=mongoose.model("Video",videoSchema)