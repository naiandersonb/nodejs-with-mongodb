import { NotFound } from "../errors/NotFound.js";
import { author, book } from "../models/index.js";
import { InvalidRequest } from "../errors/InvalidRequest.js";

export class BookController {
  static async getAll(req, res, next) {
    try {
      const findBooks = book.find()
      req.result = findBooks
      next()
    } catch (error) {
      next(error);
    }
  }

  static async getBook(req, res, next) {
    try {
      const { id } = req.params;
      const findBook = await book.findById(id)

      if (findBook !== null) {
        res.status(200).json(findBook);
      } else {
        next(new NotFound("Book not found"));
      }
    } catch (error) {
      next(error);
    }
  }

  static async createBook(req, res, next) {
    try {
      const newBook = new book(req.body);
      const bookResponse = await newBook.save();
      res.status(201).send(bookResponse.toJSON());
    } catch (error) {
      next(error);
    }
  }

  static async updateBook(req, res, next) {
    try {
      const { id } = req.params;
      const bookResponse = await book.findByIdAndUpdate(id, req.body);

      if (bookResponse !== null) {
        res.status(200).send({ message: "Book updated successfully" });
      } else {
        next(new NotFound("Book id not found"));
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteBook(req, res, next) {
    try {
      const { id } = req.params;
      const bookResponse = await book.findByIdAndDelete(id);
      if (bookResponse !== null) {
        res.status(200).send({ message: "Book removed successfully" });
      } else {
        next(new NotFound("Book id not found"));
      }
    } catch (error) {
      next(error);
    }
  }

  static async filterBook(req, res, next) {
    try {
      const search = await getSearchParams(req.query);
      if (search !== null) {
        const result = book.find(search);
        req.result = result;
        next()
      } else {
        res.status(200).send([]);
      }
    } catch (error) {
      next(error);
    }
  }
}

async function getSearchParams(params) {
  const { company, title, minPages, maxPages, authorName } = params;

  let search = {};

  if (company) search.publishing_company = company;
  if (title) search.title = { $regex: title, $options: "i" };

  if (minPages || maxPages) search.pages = {};

  // $gte - greater than or equal - maior ou igual que
  if (minPages) search.pages.$gte = minPages;

  // $lte - less than or equal - menor ou igual que
  if (maxPages) search.pages.$lte = maxPages;

  if (authorName) {
    const findAuthor = await author.findOne({ name: authorName });
    if (findAuthor !== null) {
      search.author = findAuthor._id;
    } else {
      search = null;
    }
  }

  return search;
}
