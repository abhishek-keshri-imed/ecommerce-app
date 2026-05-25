const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
      maxlength: [50, "Category name cannot exceed 50 characters"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    image: {
      type: String,
      default: "",
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: "categories",
      default: null,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "users", // ✨ Points to your unified user/admin model configuration
      required: [true, "Admin creator context is required"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// 1. Text Indexing for Live Dashboard Global Search Engine Filtering Queries
categorySchema.index({ name: "text", slug: "text" });

// 2. Virtual Populate: Automatically fetch child subcategories without heavy manual loops
categorySchema.virtual("subcategories", {
  ref: "categories",
  localField: "_id",
  foreignField: "parentId",
});

module.exports = model("categories", categorySchema);
