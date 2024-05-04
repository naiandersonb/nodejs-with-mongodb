import { InvalidRequest } from "../errors/InvalidRequest.js";
export async function pagination(req, res, next) {
  try {
    let { perPage = 5, page = 1, ordination = "_id:-1" } = req.query;
    let [orderField, order] = ordination.split(":");

    perPage = parseInt(perPage);
    page = parseInt(page);
    order = parseInt(order);

    const result = req.result;

    if (perPage > 0 && perPage > 0) {
      const resultWithPagination = await result
        .find()
        .sort({ [orderField]: order })
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();
      res.status(200).json(resultWithPagination);
    } else {
      next(new InvalidRequest());
    }
  } catch (error) {
    next(error);
  }
}
