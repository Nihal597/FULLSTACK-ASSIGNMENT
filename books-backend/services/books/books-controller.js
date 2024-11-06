import { bookSearch } from "../books/books-service.js";

export const searchBook = async (req, res) => {
    const {
      query,
      limit,
      offset,
      genre,
      availability_status,
      location,
      condition,
    } = req.query;
  
    const [books, error] = await bookSearch(
      query,
      genre,
      availability_status,
      location,
      condition,
      offset,
      limit
    );
  
    if (error) {
      res.status(500).json({ error });
      return;
    }
  
    res.status(201).json({
      books,
    });
  }