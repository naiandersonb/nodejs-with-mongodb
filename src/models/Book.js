import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const bookSchema = mongoose.Schema(
  {
    id: { type: mongoose.Schema.ObjectId },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    publishing_company: {
      type: String,
      required: [true, "The publish company is required"],
      enum: {
        values: ["publishing company A", "publishing company B"],
        message: "Publisher {VALUE} is not an allowed value",
      },
    },
    price: { type: Number },
    pages: {
      type: Number,
      validate: {
        validator: (value) => {
          return value >= 10 && value <= 5000;
        },
        message: "The number of pages must be between 10 and 5000. Value provided: {VALUE}",
      },
      /* min: [
        10,
        "The number of pages must be between 10 and 5000. Value provided: {VALUE}",
      ],
      max: [
        5000,
        "The number of pages must be between 10 and 5000. Value provided: {VALUE}",
      ], */
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "authors",
      required: [true, "The author of the book is mandatory"],
      autopopulate: true
    },
  },
  { versionKey: false }
);

bookSchema.plugin(autopopulate)
export const book = mongoose.model("books", bookSchema);
