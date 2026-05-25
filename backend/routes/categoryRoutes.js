const router = require("express").Router();
const categoryController = require("../controllers/category/categoryController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/category-add", authMiddleware, categoryController.add_category);
router.get("/category-get", categoryController.get_categories);
router.delete(
  "/category-delete/:categoryId",
  authMiddleware,
  categoryController.delete_category,
);

module.exports = router;
