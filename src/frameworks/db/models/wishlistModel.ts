

import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IWishlist extends Document {
  userId: ObjectId;
  productId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const WishlistSchema = new Schema<IWishlist>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true  },
  productId: {type: Schema.Types.ObjectId, ref: "Product", required: true  },
},{
    timestamps:true

});

const WishlistModel = mongoose.model<IWishlist>("Wishlist", WishlistSchema);
export default WishlistModel;
