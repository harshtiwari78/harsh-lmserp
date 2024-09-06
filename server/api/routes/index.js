const router = require("express").Router();

const userController = require("../controller/userAPI");
const bookController = require("../controller/bookAPI");

// User API
router.get("/allUser", userController.allUser);
router.post("/register", userController.registerUser);
router.post("/updateUser", userController.updateUser);
router.post("/login", userController.loginUser);
router.post("/logout", userController.logout);
router.get("/logedinuser", userController.userDetails);
router.get("/userDetail/:id", userController.userDetail);

// Book API
router.post("/addBook", bookController.addBook);
router.get("/allBook", bookController.getAllBooks);
router.get("/search/:id", bookController.searchBooks);
router.post("/addToCart", bookController.addToCart);
router.post("/checkout", bookController.checkout);
router.post("/returnBooks", bookController.returnBooks);
router.post("/removeFromCart", bookController.removeFromCart);
router.get("/filter/:genre/:year/:title", bookController.filter);
router.get("/booksInCart/:username", bookController.booksInCart);

// New route for fetching borrowed books for a specific user
router.get("/borrowedBooks/:username", bookController.borrowedBooks);

// This route seems to be duplicated and might have an incorrect controller method
// router.post("/filter/", bookController.returnBooks);

// This route fetches borrowed books for all users, you might want to keep it or remove it
router.get("/borrowedBooks", bookController.borrowedBooks);

module.exports = router;