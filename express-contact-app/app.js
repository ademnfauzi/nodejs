// express
const express = require("express");
var expressLayouts = require("express-ejs-layouts");
const app = express();

const { loadContact, findContact } = require("./utils/contacts");

const port = 3000;
// menggunakan ejs
app.set("view engine", "ejs");

// third party middleware
// setup express ejs layouts
app.use(expressLayouts);

// built in middleware
app.use(express.static("public"));

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
   const contacts = loadContact();
   // console.log(contacts);
   res.render("contact", {
      layout: "../layouts/main-layouts",
      title: "contact",
      contacts: contacts,
   });
});

app.get("/contact/:nama", (req, res) => {
   const contact = findContact(req.params.nama);
   res.render("detail", {
      layout: "../layouts/main-layouts",
      title: "detail contact",
      contact: contact,
   });
});

// middleware
app.use((req, res) => {
   res.status(404);
   res.send("<h1>404</h1>");
});

app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`);
});
