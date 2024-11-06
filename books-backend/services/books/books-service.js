import { query } from "../../database/db.js";

const mapStringEmptyToNull = (text) => {
    return text === "" ? null : text;
}

export const getBookDetails = async (id) => {
    query("SELECT * FROM ")
}

export const bookSearch = async (
  searchQuery = null,
  genre = null,
  availabilty = null,
  location = null,
  condition = null,
  offset = null,
  limit = 10,
) => {
  console.log({ searchQuery, genre, availabilty, location, offset, limit });

    searchQuery = mapStringEmptyToNull(searchQuery)
    genre = mapStringEmptyToNull(genre)
    availabilty = mapStringEmptyToNull(availabilty)
    location = mapStringEmptyToNull(location)
    condition = mapStringEmptyToNull(condition)

  const queryStatement =
    "SELECT bl.id, condition, title, genre, availability_status, name, owner_id, location, author FROM \"book-users\".book_listing as bl JOIN \"book-users\".users as u ON (bl.owner_id = u.id) WHERE ($1::varchar is NULL OR genre ilike '%' || $1 || '%' OR title ilike '%' || $1 || '%' OR author ilike '%' || $1 || '%') AND ($2::varchar is NULL OR genre = $2) AND ($3::varchar is NULL OR availability_status = $3) AND ($4::varchar is NULL OR location = $4) AND ($5::varchar is NULL OR condition = $5)";

  const lim = +limit;
  const off = +offset;
  let limitStatement = " LIMIT " + lim;
  if (off) limitStatement += " OFFSET " + off;

  const res = await query(queryStatement + limitStatement + ";", [
    searchQuery,
    genre,
    availabilty,
    location,
    condition
  ]);

  return [res.rows, null];
};
