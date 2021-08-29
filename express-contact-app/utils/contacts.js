const fs = require("fs");

//   membuat folder data
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
   fs.mkdirSync(dirPath);
}

//   membuat contact.json jika belum ada
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
   fs.writeFileSync(dataPath, "[]", "utf-8");
}

// ambil semua data contact di json
const loadContact = () => {
   const file = fs.readFileSync("data/contacts.json", "utf-8");
   //    mengubah string menjadi objek
   const contacts = JSON.parse(file);
   return contacts;
};

// ambil data contact berdasarkan nama
const findContact = (nama) => {
   const contacts = loadContact();
   const contact = contacts.find((contact) => contact.nama === nama);
   return contact;
};

// menimpa / menuliskan file contacts.json dengan data yg baru
const saveContacts = (contacts) => {
   // mengubah objek menjadi string
   fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
};

// menambahkan contact baru
const addContact = (contact) => {
   const contacts = loadContact();
   contacts.push(contact);
   saveContacts(contacts);
};

// cek nama yg duplicate
const cekDuplikat = (nama) => {
   const contacts = loadContact();
   return contacts.find((contact) => contact.nama === nama);
};

const deleteContact = (nama) => {
   const contacts = loadContact();
   const filteredContacts = contacts.filter((contact) => contact.nama !== nama);
   console.log(filteredContacts);
   saveContacts(filteredContacts);
};
const updateContacts = (contactBaru) => {
   const contacts = loadContact();
   // hilangkan contact lama yg namanya sama dengan oldNama
   const filteredContacts = contacts.filter(
      (contact) => contact.nama !== contactBaru.oldNama
   );
   // hapus dulu data lama tambahkan data baru
   delete contactBaru.oldNama;
   filteredContacts.push(contactBaru);
   saveContacts(filteredContacts);
};
module.exports = {
   loadContact,
   findContact,
   addContact,
   cekDuplikat,
   deleteContact,
   updateContacts,
};
