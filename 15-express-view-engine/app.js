// express
const express = require("express");
const app = express();
const port = 3000;

// menggunakan ejs
app.set("view engine", "ejs");

app.get("/", (req, res) => {
   // res.sendFile("./index.html", { root: __dirname });
   const mahasiswa = [
      // {
      //    nama: "ademnfauzi",
      //    email: "ademnfauzi76@gmail.com",
      // },
      // {
      //    nama: "tulisan",
      //    email: "tulisan@gmail.com",
      // },
      // {
      //    nama: "pelajar",
      //    email: "pelajar@gmail.com",
      // },
   ];
   res.render("index", {
      nama: "ademnfauzi",
      title: "Index",
      mahasiswa: mahasiswa,
   });
});
app.get("/about", (req, res) => {
   res.render("about");
});
app.get("/contact", (req, res) => {
   res.render("contact");
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
