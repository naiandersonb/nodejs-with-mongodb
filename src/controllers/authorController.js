import { NotFound } from "../errors/NotFound.js";
import { author } from "../models/index.js";

export class AuthorController {
  static async getAll(req, res, next) {
    try {
      const authorsList = author.find({});
      req.result = authorsList;
      next()
    } catch (error) {
      next(error);
    }
  }

  static async getAuthor(req, res, next) {
    try {
      const { id } = req.params;
      const findAuthor = await author.findById(id);

      if (findAuthor !== null) {
        res.status(200).send(findAuthor);
      } else {
        next(new NotFound("Author not found"));
      }
    } catch (error) {
      next(error);
    }
  }

  static async createAuthor(req, res, next) {
    try {
      const newAuthor = new author(req.body);
      const authorResponse = await newAuthor.save();
      res.status(201).json({
        message: "Author created successfully",
        author: authorResponse.toJSON(),
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateAuthor(req, res, next) {
    try {
      const { id } = req.params;
      const authorResponse = await author.findByIdAndUpdate(id, {
        $set: req.body,
      });

      if (authorResponse !== null) {
        res.status(200).json({
          message: "Author successfully updated",
        });
      } else {
        next(new NotFound("Author not found"));
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteAuthor(req, res, next) {
    try {
      const { id } = req.params;
      const authorResponse = await author.findByIdAndDelete(id);

      if (authorResponse !== null) {
        res.status(200).json({
          message: "Author deleted updated",
        });
      } else {
        next(new NotFound("Author not found"));
      }
    } catch (error) {
      next(error);
    }
  }
}
