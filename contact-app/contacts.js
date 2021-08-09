const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");

//   membuat folder data
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
   fs.mkdirSync(dirPath);
}

//   membuat contact.json juka belum ada
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
   fs.writeFileSync(dataPath, "[]", "utf-8");
}

const loadContact = () => {
   const file = fs.readFileSync("data/contacts.json", "utf-8");
   const contacts = JSON.parse(file);
   return contacts;
};
const simpanContact = (nama, email, noHP) => {
   const contact = {
      //    nama: nama dipersingkat jadi nama aja klo sama
      nama: nama,
      email: email,
      noHP,
   };
   const contacts = loadContact();

   //    cek duplikat
   const duplikat = contacts.find((contact) => contact.nama === nama);
   if (duplikat) {
      console.log(
         chalk.red.inverse.bold("contact sudah terdaftar. gunakan nama lain !")
      );
      return false;
   }

   //    cek email
   if (email) {
      if (!validator.isEmail(email)) {
         console.log(chalk.red.inverse.bold("Email tidak valid !"));
         return false;
      }
   }

   //    cek no hp
   if (!validator.isMobilePhone(noHP, "id-ID")) {
      console.log(chalk.red.inverse.bold("No HP tidak valid !"));
      return false;
   }

   contacts.push(contact);

   //    console.log(contacts);
   fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
   console.log(chalk.green.inverse.bold`Terimakasih sudah menginputkan data`);
};

const listContact = () => {
   const contacts = loadContact();
   console.log(chalk.cyan.inverse.bold`Daftar Contact`);
   contacts.forEach((contact, i) => {
      console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}`);
   });
};

const detailContact = (nama) => {
   const contacts = loadContact();
   const contact = contacts.find(
      (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
   );

   if (!contact) {
      console.log(chalk.red.inverse.bold(`${nama} Tidak Ditemukan !`));
      return false;
   }
   console.log(chalk.cyan.inverse.bold(contact.nama));
   console.log(chalk.cyan.inverse.bold(contact.noHP));
   if (contact.email) {
      console.log(contact.email);
   }
};

const deleteContact = (nama) => {
   const contacts = loadContact();
   const newContacts = contacts.filter(
      (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
   );

   if (contacts.length === newContacts.length) {
      console.log(chalk.red.inverse.bold(`${nama} Tidak Ditemukan !`));
      return false;
   }
   fs.writeFileSync("data/contacts.json", JSON.stringify(newContacts));
   console.log(chalk.green.inverse.bold`data contact ${nama} berhasil dihapus`);
};

module.exports = {
   simpanContact,
   listContact,
   detailContact,
   deleteContact,
};
