import mongoose from 'mongoose';

const userSchmema = new mongoose.Schema({
    fullName: {   type: String, required: true  },
    email: { type: String, required: true, unique: true },   
    password: { type: String, required: true ,minlength: 6},
   profilePic: { type: String, default: "" },
},
{
timestamps: true,
}
) 
const User = mongoose.model("User", userSchmema)
export default User 