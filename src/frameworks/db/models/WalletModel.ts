import mongoose, { Document, Schema, Types } from "mongoose";




interface IWallet extends Document {
    userId: Types.ObjectId;
    userType: string; // Can be 'user' or 'employee'
    balance: number;
    createdAt: Date;
    updatedAt: Date;
  }

  const WalletSchema = new Schema<IWallet>(
    {
      userId: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      userType: {
        type: String,
        required: true,
        enum: ['user', 'employee','admin',"store"], 
      },
      balance: {
        type: Number,
        default: 0,
      },    
    
    },
    { timestamps: true } 
  );

  export const WalletModel=mongoose.model('Wallet',WalletSchema)