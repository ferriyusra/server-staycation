const router = require("express").Router();
const adminController = require("../controllers/adminController");
const { uploadSingle, uploadMultiple } = require("../middlewares/multer");
const auth = require("../middlewares/auth");

// menggunakan middlewares auth untuk session login
router.get("/signin", adminController.viewSignin);
router.post("/signin", adminController.actionSignin);
router.use(auth);
router.get("/logout", adminController.actionLogout);

// router atau endpoint untuk view ke mana saja
router.get("/dashboard", adminController.viewDashboard);
router.get("/category", adminController.viewCategory);
router.get("/bank", adminController.viewBank);
router.get("/item", adminController.viewItem);
router.get("/booking", adminController.viewBooking);
router.get("/item/show-image/:id", adminController.showImageItem);
router.get("/item/:id", adminController.showEditItem);

// router atau endpoint untuk menambah data
router.post("/category", adminController.addCategory);
router.post("/bank", uploadSingle, adminController.addBank);
router.post("/item", uploadMultiple, adminController.addItem);
router.post("/item/add/feature", uploadSingle, adminController.addFeature);
router.post("/item/add/activity", uploadSingle, adminController.addActivity);

// router atau endpoint untuk mengedit data
router.put("/category", adminController.editCategory);
router.put("/bank", uploadSingle, adminController.editBank);
router.put("/item/:id", uploadMultiple, adminController.editItem);
router.put("/item/update/feature", uploadSingle, adminController.editFeature);
router.put("/item/update/activity", uploadSingle, adminController.editActivity);
router.put("/booking/:id/confirmation", adminController.actionConfirmation);
router.put("/booking/:id/reject", adminController.actionReject);

// router atau endpoint untuk menghapus data
router.delete("/category/:id", adminController.deleteCategory);
router.delete("/bank/:id", adminController.deleteBank);
router.delete("/item/:id/delete", adminController.deleteItem);
router.delete("/item/:itemId/feature/:id", adminController.deleteFeature);
router.delete("/item/:itemId/activity/:id", adminController.deleteActivity);

// router atau endpoint detail item
router.get("/item/show-detail-item/:itemId", adminController.viewDetailItem);
router.get("/booking/:id", adminController.showDetailBooking);

module.exports = router;
