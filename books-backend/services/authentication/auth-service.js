import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { query } from "../../database/db.js";
import { randomBytes } from "crypto";
import { sendEmail } from "../mailing/mail-service.js";

/**
 * Register User
 *
 * 1. user Model {
 *  email,
 *  password,
 *  name
 * }
 *
 * 2. passsword must be hashed.
 */

export const regsiterUser = async (user) => {
  user.password = await hashValue(user.password);

  try {
    const res = await query(
      'INSERT INTO "book-users".users(name, email, password, location) VALUES ($1, $2, $3, $4);',
      [user.name, user.email, user.password, user.location]
    );
    return [{ success: true }, null];
  } catch (err) {
    console.log(err);
    return [null, err];
  }
};

/**
 * Login User
 *
 * 1. {email, password}
 *
 * 2. GET user from Database using email
 *
 * 3. Compare passwords
 *
 * 4. Generate JWT
 *
 */

export const loginUser = async ({ email, password }) => {
  // Get user by emailId
  const res = await query(
    'SELECT id, email, password, name, location FROM "book-users".users WHERE email=$1',
    [email]
  );
  if (res.rowCount === 0) return [null, { message: "no user found" }];
  
  const user = res.rows[0];

  // Compaare password
  const pwdMatched = await bcrypt.compare(password, user.password);
  if (!pwdMatched) return [null, { message: "password is incorrect" }];

  // Generate JWT
  const token = jwt.sign(
    { ...user, password: undefined },
    process.env.JWT_SECRET ?? "JWT_SECRET",
    { expiresIn: "15m" }
  );
  return [{ token, user: { ...user, password: undefined } }, null];
};

/**
 * Validate Token
 *
 * 1. Validate JWT
 *
 * 2. return valid JWT payload
 *
 */

export const validateToken = (token) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET ?? "JWT_SECRET");
    return [payload, null];
  } catch (err) {
    return [null, err];
  }
};

/**
 * 1. Find the user using email - done
 *
 * 2. Check if password recovery email is already sent. If sent delete it. (id: uuid, code: string, userId: uuid)
 *
 * 3. Create a random string and hash it. - code
 *
 * 4. Create the url with request Id and code.
 *
 * 5. Trigger the email. And save the request to database.
 */

export const triggerPwdRecoveryMail = async (email) => {
  try {
    // Check if user exists with email Id
    const user = (
      await query('SELECT * FROM "book-users".users WHERE email=$1', [email])
    ).rows?.[0];
    if (!user) return [null, { message: "Invalid email." }];

    // Check if there is an existing password recovery request
    const pwdRecoveryRequest = (
      await query(
        'SELECT * FROM "book-users"."password-recovery" WHERE "userId" = $1',
        [user.id]
      )
    ).rows?.[0];
    if (pwdRecoveryRequest) {
      // DELETE existing password reovery request
      await query(
        'DELETE FROM "book-users"."password-recovery" WHERE "userId" = $1',
        [user.id]
      );
    }

    // Generate a random string as code.
    const code = generateRandomString();

    // Hash the code.
    const hashedCode = await hashValue(code);

    // Save password request to database
    await query(
      'INSERT INTO "book-users"."password-recovery" (code, "userId") VALUES ($1, $2)',
      [hashedCode, user.id]
    );

    const request = (
      await query(
        'SELECT * FROM "book-users"."password-recovery" WHERE "userId"=$1',
        [user.id]
      )
    ).rows?.[0];

    // Generate the password recovery URL
    const pwdRecoveryURL = genereatePwdRecoveryURL(request.id, code);

    // Send email
    await sendEmail(user.name, email, pwdRecoveryURL);
    return [{ message: "email sent" }, null];
  } catch (error) {
    return [null, error];
  }
};

const generateRandomString = () => {
  return randomBytes(30).toString("base64");
};

const hashValue = async (value) => {
  return await bcrypt.hash(value, +(process.env.SALT_ROUNDS ?? 10));
};

const genereatePwdRecoveryURL = (id, code) => {
  const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL;
  const url = new URL("/reset-password", FRONTEND_BASE_URL);

  url.searchParams.append("id", id);
  url.searchParams.append("code", code);

  return url.href;
};

/**
 * 1. Check if password recovery request exists
 *
 * 2. Compare code and hashed code stored in database
 *
 * 3. Hash new password and update the hashed password in Database
 */

export const resetPassword = async (id, code, password) => {
  // Check if password reset request exists
  const pwdRequest = (
    await query(
      'SELECT * FROM "book-users"."password-recovery" WHERE id = $1',
      [id]
    )
  ).rows?.[0];
  if (!pwdRequest) return [null, { message: "Invalid password reset request" }];

  // Compare code and hashed code stored in the database.
  const isMatched = await bcrypt.compare(code, pwdRequest.code);
  if (!isMatched) return [null, { message: "Code is incorrect." }];

  // Hash new password and update the user database with new hashed password
  const hashedPassword = await hashValue(password);
  await query('UPDATE "book-users"."users" SET password=$1 WHERE id=$2', [
    hashedPassword,
    pwdRequest.userId,
  ]);

  return [{ message: "updated password successfully" }, null];
};

/**
 * Check if password reset request is available
 */

export const checkPasswordReset = async (id) => {
  const res = await query('SELECT * FROM "book-users"."password-recovery" WHERE id=$1', [
    id,
  ]);

  return [res.rowCount !== 0, null];
};
