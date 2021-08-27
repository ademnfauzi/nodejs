// express
const express = require("express");
var expressLayouts = require("express-ejs-layouts");
const app = express();
const port = 3000;

// menggunakan ejs
app.set("view engine", "ejs");

// setup express ejs layouts
app.use(expressLayouts);

app.get("/", (req, res) => {
   const mahasiswa = [];
   res.render("index", {
      layout: "../layouts/main-layouts",
      nama: "ademnfauzi",
      title: "Index",
      mahasiswa: mahasiswa,
   });
});
app.get("/about", (req, res) => {
   res.render("about", {
      layout: "../layouts/main-layouts",
      title: "about",
   });
});
app.get("/contact", (req, res) => {
   res.render("contact", {
      layout: "../layouts/main-layouts",
      title: "contact",
   });
});
app.get("/product/:id", (req, res) => {
   res.send(
      `Product ID : ${req.params.id} <br> Category ID : ${req.query.category}`
   );
});
app.use("/", (req, res) => {
   res.status(404);
   res.send("<h1>404</h1>");
});

app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`);
});
