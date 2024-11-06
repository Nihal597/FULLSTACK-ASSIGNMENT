import { Router } from "express";
import authRouter from "../../services/authentication/auth-route.js";
import bookListingRouter from "../../services/book-listing/book-listing-route.js"
import booksRouter from "../../services/books/books-route.js";


const router = Router();

router.use("/auth", authRouter);
router.use("/booklistings", bookListingRouter);
router.use("/books",booksRouter);

export default router;