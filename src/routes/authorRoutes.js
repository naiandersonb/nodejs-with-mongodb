import { Router } from "express";
import { AuthorController } from "../controllers/authorController.js";
import { pagination } from "../middlewares/pagination.js";

const authorRoutes = Router();

authorRoutes
  .get("/authors", AuthorController.getAll, pagination)
  .get("/authors/:id", AuthorController.getAuthor)
  .post("/authors", AuthorController.createAuthor)
  .put("/authors/:id", AuthorController.updateAuthor)
  .delete("/authors/:id", AuthorController.deleteAuthor);

export { authorRoutes };
