// express
const express = require("express");
var expressLayouts = require("express-ejs-layouts");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const {
   loadContact,
   findContact,
   addContact,
   cekDuplikat,
   deleteContact,
   updateContacts,
} = require("./utils/contacts");
const { check, body, validationResult } = require("express-validator");

const port = 3000;
// menggunakan ejs
app.set("view engine", "ejs");

// third party middleware
// setup express ejs layouts
app.use(expressLayouts);

// built in middleware
app.use(express.static("public"));
// milldeware untuk encode
app.use(express.urlencoded({ extended: true }));

// konfigurasi flash
app.use(cookieParser("secret"));
app.use(
   session({
      cookie: { maxAge: 6000 },
      secret: "secret",
      resave: true,
      saveUninitialized: true,
   })
);
app.use(flash());

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
      msg: req.flash("msg"),
   });
});

// form tambah data
app.get("/contact/add", (req, res) => {
   res.render("add-contact", {
      layout: "../layouts/main-layouts",
      title: "Form tambah data contact",
   });
});

// proses data contact
app.post(
   "/contact",
   [
      body("nama").custom((value) => {
         const duplicate = cekDuplikat(value);
         if (duplicate) {
            throw new Error("Nama contact sudah terdaftar !");
         }
         return true;
      }),
      check("email", "Email tidak valid!").isEmail(),
      check("noHP", "No HP tidak valid !").isMobilePhone("id-ID"),
   ],
   (req, res) => {
      // console.log(req.body);
      // res.send(req.body);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         // return res.status(400).json({ errors: errors.array() });
         res.render("add-contact", {
            layout: "../layouts/main-layouts",
            title: "Form tambah data contact",
            errors: errors.array(),
         });
      } else {
         addContact(req.body);
         // kirimkan flash message
         req.flash("msg", "Data contact berhasil ditambahkan!");

         // otomatis ke method get
         res.redirect("/contact");
      }
   }
);

// delete data
app.get("/contact/delete/:nama", (req, res) => {
   const contact = findContact(req.params.nama);
   // if contact not found
   if (!contact) {
      res.status(404);
      res.send("<h1>404</h1>");
   } else {
      deleteContact(req.params.nama);
      req.flash("msg", "Data contact berhasil dihapus!");
      res.redirect("/contact");
   }
});

// ubah data
app.get("/contact/edit/:nama", (req, res) => {
   const contact = findContact(req.params.nama);
   res.render("edit-contact", {
      layout: "../layouts/main-layouts",
      title: "Form ubah data contact",
      contact,
   });
});

// proses ubah data
app.post(
   "/contact/update",
   [
      body("nama").custom((value, { req }) => {
         const duplicate = cekDuplikat(value);
         if (value !== req.body.oldNama && duplicate) {
            throw new Error("Nama contact sudah terdaftar !");
         }
         return true;
      }),
      check("email", "Email tidak valid!").isEmail(),
      check("noHP", "No HP tidak valid !").isMobilePhone("id-ID"),
   ],
   (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         res.render("edit-contact", {
            layout: "../layouts/main-layouts",
            title: "Form ubah data contact",
            errors: errors.array(),
            contact: req.body,
         });
      } else {
         updateContacts(req.body);
         req.flash("msg", "Data contact berhasil diubah!");
         res.redirect("/contact");
      }
   }
);

// form detail data
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
