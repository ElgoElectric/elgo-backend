import { char, pgTable } from "drizzle-orm/pg-core";
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';

const db = drizzle(sql);

export const users = pgTable('users', {
  name: char('name', { length: 256 }),
  user_id: char('user_id', { length: 256 }).primaryKey(),
  email: char('email', { length: 256 }),
});
