const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const { body, validationResult, check, Result } = require("express-validator");

require("./utils/db");
const Contact = require("./model/contact");
const { findOne } = require("./model/contact");
const { error } = require("console");

const app = express();
const port = 3000;

// setup override
app.use(methodOverride("_method"));

// setup ejs
app.set("view engine", "ejs");
// setup express ejs layouts
app.use(expressLayouts);
// built in middleware
app.use(express.static("public"));
// milldeware untuk encode
app.use(express.urlencoded({ extended: true }));

// config flash
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

// web servernya
app.listen(port, () => {
   console.log(`Mongo Contact App | listening at http://localhost:${port}`);
});

// halaman home
app.get("/", (req, res) => {
   const mahasiswa = [];
   res.render("index", {
      layout: "../layouts/main-layouts",
      nama: "ademnfauzi",
      title: "Index",
      mahasiswa: mahasiswa,
   });
});

// halaman about
app.get("/about", (req, res) => {
   res.render("about", {
      layout: "../layouts/main-layouts",
      title: "about",
   });
});

// halaman contact
// dikarenakan contact dalam bentuk promise maka harus menggunakan async dan await agar menunggu promise selesai dijalankan terlebih dahulu
app.get("/contact", async (req, res) => {
   //    Contact.find().then((contact) => {
   //       res.send(contact);
   //    });
   const contacts = await Contact.find();
   // console.log(contacts);
   res.render("contact", {
      layout: "../layouts/main-layouts",
      title: "contact",
      contacts: contacts,
      msg: req.flash("msg"),
   });
});

// halaman tambah data
app.get("/contact/add", (req, res) => {
   res.render("add-contact", {
      layout: "../layouts/main-layouts",
      title: "Form tambah data contact",
   });
});

// proses tambah data contact
app.post(
   "/contact",
   [
      body("nama").custom(async (value) => {
         const duplicate = await Contact.findOne({ nama: value });
         if (duplicate) {
            throw new Error("Nama contact sudah terdaftar !");
         }
         return true;
      }),
      check("email", "Email tidak valid!").isEmail(),
      check("nohp", "No HP tidak valid !").isMobilePhone("id-ID"),
   ],
   (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         res.render("add-contact", {
            layout: "../layouts/main-layouts",
            title: "Form tambah data contact",
            errors: errors.array(),
         });
      } else {
         //  Contact.insertMany(req.body, (error, result) => {
         //     req.flash("msg", "Data contact berhasil ditambahkan!");
         //     res.redirect("/contact");
         //  });
         Contact.insertMany(req.body, (error, result) => {
            console.log(result);
            console.log(error);
            req.flash("msg", "Data contact berhasil ditambahkan!");
            res.redirect("/contact");
         });
      }
   }
);

// delete data
// app.get("/contact/delete/:nama", async (req, res) => {
//    const contact = await Contact.findOne({ nama: req.params.nama });
//    // if contact not found
//    if (!contact) {
//       res.status(404);
//       res.send("<h1>404</h1>");
//    } else {
//       Contact.deleteOne({ _id: contact._id }).then((result) => {
//          req.flash("msg", "Data contact berhasil dihapus!");
//          res.redirect("/contact");
//       });
//    }
// });

app.delete("/contact", (req, res) => {
   //    res.send(req.body);
   Contact.deleteOne({ nama: req.body.nama }).then((result) => {
      req.flash("msg", "Data contact berhasil dihapus!");
      res.redirect("/contact");
   });
});

// halaman ubah data
app.get("/contact/edit/:nama", async (req, res) => {
   const contact = await Contact.findOne({ nama: req.params.nama });
   res.render("edit-contact", {
      layout: "../layouts/main-layouts",
      title: "Form ubah data contact",
      contact,
   });
});

// proses ubah data
app.put(
   "/contact",
   [
      body("nama").custom(async (value, { req }) => {
         const duplicate = await Contact.findOne({ nama: value });
         if (value !== req.body.oldNama && duplicate) {
            throw new Error("Nama contact sudah terdaftar !");
         }
         return true;
      }),
      check("email", "Email tidak valid!").isEmail(),
      check("nohp", "No HP tidak valid !").isMobilePhone("id-ID"),
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
         Contact.updateOne(
            { _id: req.body._id },
            {
               $set: {
                  nama: req.body.nama,
                  email: req.body.email,
                  nohp: req.body.nohp,
               },
            }
         ).then((result) => {
            req.flash("msg", "Data contact berhasil diubah!");
            res.redirect("/contact");
         });
      }
   }
);

// halaman detail
app.get("/contact/:nama", async (req, res) => {
   //    const contact = findContact(req.params.nama);
   const contact = await Contact.findOne({ nama: req.params.nama });
   res.render("detail", {
      layout: "../layouts/main-layouts",
      title: "detail contact",
      contact: contact,
   });
});
