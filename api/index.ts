require("dotenv").config();

import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";

const db = drizzle(sql);

const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/", function (req, res) {
	// res.sendFile(path.join(__dirname, '..', 'components', 'home.htm'));
	res.send("You have hit root enpoint successfully.");
});

app.get("/users", function (req, res) {
	res.send("You have hit users enpoint successfully.");
});

/*
Make requests to port 3000 only. 
*/
app.listen(8080, () => console.log("Server ready on port 3000."));

module.exports = app;
