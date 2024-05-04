import { Router } from "express";
import { BookController } from "../controllers/bookController.js";
import { pagination } from "../middlewares/pagination.js";

const bookRoutes = Router();

bookRoutes
  .get("/books", BookController.getAll, pagination)
  .get("/books/search", BookController.filterBook, pagination)
  .get("/books/:id", BookController.getBook)
  .post("/books", BookController.createBook)
  .put("/books/:id", BookController.updateBook)
  .delete("/books/:id", BookController.deleteBook);

export { bookRoutes };
