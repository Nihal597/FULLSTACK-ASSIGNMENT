import { Router } from "express";
import { validateMiddleware } from "../authentication/auth-middleware.js";
import { searchBook } from "./books-controller.js";


const router = Router();

router.use(validateMiddleware);

/**
 * http://localhost:3000/api/v1/books?query=""&limit=10&offset=10&genre=&availability=&location=
 *
 */

router.get("/", searchBook);

export default router;
