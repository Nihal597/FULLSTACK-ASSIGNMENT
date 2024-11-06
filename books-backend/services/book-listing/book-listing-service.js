import { query } from "../../database/db.js"

export const getAllBookListings = async (userId) => {
    try {
        const res = await query('SELECT * FROM "book-users".book_listing WHERE owner_id = $1', [userId])
        return [res.rows, null];
    }
    catch (error) {
        return [null, error]
    }
}

export const getBookListing = async (bookId) => {
    try {
        const res = await query('SELECT bl.id, title, genre, author, location, condition, availability_status, name FROM "book-users".book_listing as bl JOIN "book-users".users as u ON (bl.owner_id = u.id) WHERE bl.id = $1 ', [bookId])
        return [res.rows[0], null];
    }
    catch (error) {
        return [null, error]
    }
}

export const insertBookListing = async (userId, { title, genre, author, condition, availability_status }) => {
    try {
        const res = await query('INSERT INTO "book-users".book_listing(condition, availability_status, owner_id, genre, title, author)VALUES ($1, $2, $3, $4, $5, $6);', [condition, availability_status, userId, genre, title, author])
        return [res.rows, null];
    }
    catch (error) {
        return [null, error]
    }
}

export const deleteBookListings = async (bookId) => {
    try {
        const res = await query('DELETE FROM "book-users".book_listing WHERE id = $1', [bookId])
        return [res.rows, null];
    }
    catch (error) {
        return [null, error]
    }
}

export const updateBookListings = async (condition, availability_status, genre, title, author, id) => {
    try {
        const res = await query('UPDATE "book-users".book_listing SET condition=$1, availability_status=$2, genre=$3, title=$4, author=$5 WHERE id=$6', [condition, availability_status, genre, title, author, id])
        return [res.rows, null];
    }
    catch (error) {
        return [null, error]
    }
}