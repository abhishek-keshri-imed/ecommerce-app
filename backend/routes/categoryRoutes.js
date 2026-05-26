const router = require("express").Router();
const categoryController = require("../controllers/category/categoryController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/category-add", authMiddleware, categoryController.add_category);
router.get("/category-get",authMiddleware, categoryController.get_categories);
router.delete("/category-delete/:categoryId",authMiddleware,categoryController.delete_category);
router.put("/category-update/:categoryId", authMiddleware, categoryController.update_category);
module.exports = router;
