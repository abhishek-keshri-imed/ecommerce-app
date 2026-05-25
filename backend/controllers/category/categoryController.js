const formidable = require("formidable");
const cloudinary = require("cloudinary").v2;
const Category = require("../../models/categoryModel");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
  api_proxy: null,
});

class categoryController {
  add_category = async (req, res) => {
    const adminId = req.userId || req.user?.id;

    if (!adminId) {
      return res.status(401).json({
        error: "Unauthorized: Admin authentication context is missing",
      });
    }

    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res
          .status(400)
          .json({ error: "Failed to process multi-part form data streams" });
      }

      try {
        let name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
        let parentId = Array.isArray(fields.parentId)
          ? fields.parentId[0]
          : fields.parentId;
        let imageFile = Array.isArray(files.image)
          ? files.image[0]
          : files.image;

        if (!name) {
          return res
            .status(400)
            .json({ error: "Category structural title name is required!" });
        }

        let slug = name
          .trim()
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
        const exist = await Category.findOne({ slug });

        if (exist) {
          return res
            .status(400)
            .json({ error: "This product taxonomy node already exists!" });
        }

        let imageUrl = "";
        if (imageFile && imageFile.filepath) {
          // 🛠️ Add these request options to bypass local certificate validation issues
          const uploadResult = await cloudinary.uploader.upload(
            imageFile.filepath,
            {
              folder: "ecommerce-categories",
              // This forces the request to accept the connection despite local SSL cert issues
              http_agent: new (require("https").Agent)({
                rejectUnauthorized: false,
              }),
            },
          );
          imageUrl = uploadResult.secure_url;
        }
        const category = await Category.create({
          name: name.trim(),
          slug,
          image: imageUrl,
          parentId: parentId || null,
          createdBy: adminId,
        });

        return res.status(201).json({
          category,
          message: "New inventory taxonomy branch created cleanly by Admin!",
        });
      } catch (error) {
        return res
          .status(500)
          .json({ error: error.message || "Internal System Error" });
      }
    });
  };

  get_categories = async (req, res) => {
    try {
      const categories = await Category.find({})
        .populate("subcategories")
        .populate("createdBy", "name email role")
        .sort({ createdAt: -1 });

      return res.status(200).json({ categories });
    } catch (error) {
      return res.status(500).json({
        error: error.message || "Internal Database Lookup Error State",
      });
    }
  };

  delete_category = async (req, res) => {
    const { categoryId } = req.params;
    try {
      await Category.findByIdAndDelete(categoryId);
      return res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Failed to delete category" });
    }
  };
}

module.exports = new categoryController();
