import { Router } from "express";

import { validateMiddleware } from "../authentication/auth-middleware.js";

import { deleteBook, getAllBooks, getBook, insertBook, updateBook } from "../book-listing/book-listing-controller.js";

const router = Router();

router.use(validateMiddleware);

router.get("/", getAllBooks);

router.get("/:id", getBook);

router.post("/", insertBook);

router.put("/:id", updateBook);

router.delete("/:id", deleteBook);

export default router;
