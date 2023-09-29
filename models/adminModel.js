const mongoose=require('mongoose');

const adminSchema = mongoose.Schema(
    {
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
        }
    }
  );

const adminModel=new mongoose.model("admin",adminSchema)
module.exports=adminModel