import { Schema, model } from "mongoose";

const stockSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

//full text search
stockSchema.index({ "$**" : "text" });

export default model("Stock", stockSchema);
