import {
    insertBookListing,
    getAllBookListings,
    updateBookListings,
    deleteBookListings,
    getBookListing
  } from "./book-listing-service.js";

  export const getAllBooks  = async (req, res) => {
    const userId = req.user.id;
  
    const [data, error] = await getAllBookListings(userId);
  
    if (error) {
      res.status(500).json({ error });
      return;
    }
  
    res.json({ booklistings: data });
  }

  export const getBook =  async (req, res) => {
    const id = req.params.id;
  
    const [data, error] = await getBookListing(id);
  
    if (error) {
      res.status(500).json({ error });
      return;
    }
  
    res.json(data);
  }

  export const insertBook = async (req, res) => {
    const userId = req.user.id;
    const booklisting = req.body;
  
    const [data, error] = await insertBookListing(userId, booklisting);
  
    if (error) {
      res.status(500).json({ error });
      return;
    }
  
    res.status(201).json({
      data,
    });
  }

  export const updateBook = async (req, res) => {
    const bookListing = req.body;
    if (!bookListing) res.status(400).json({ message: "missing request body" });
  
    const id = req.params.id;
  
    const { condition, availability_status, genre, title, author } = bookListing;
  
    const [data, error] = await updateBookListings(
      condition,
      availability_status,
      genre,
      title,
      author,
      id
    );
    if (error) {
      res.status(500).json({ error });
      return;
    }
  
    res.status(201).json({
      data: "Book updated successfully"
    });
  }

  export const deleteBook = async (req, res) => {
    const id = req.params.id;
  
    const [data, error] = await deleteBookListings(id);
    if (error) {
      res.status(500).json({ error });
      return;
    }
  
    res.status(201).json({
      data: "Book updated successfully"
    });
  }