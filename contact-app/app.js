const { argv } = require("process");
const { describe, demandOption } = require("yargs");
const yargs = require("yargs");
const contacts = require("./contacts");

yargs
   .command({
      command: "add",
      describe: "Menambahkan Contact Baru",
      builder: {
         nama: {
            describe: "Nama Lengkap",
            demandOption: true,
            type: "string",
         },
         email: {
            describe: "Email",
            demandOption: false,
            type: "string",
         },
         noHP: {
            describe: "No Handphone",
            demandOption: true,
            type: "string",
         },
      },
      handler(argv) {
         contacts.simpanContact(argv.nama, argv.email, argv.noHP);
      },
   })
   .demandCommand();

//    menampilkan daftar semua nama & no hp contact
yargs.command({
   command: "list",
   describe: "Menampilkan Semua nama & no hp Contact",
   handler() {
      contacts.listContact();
   },
});

// menampilkan detail sebuah contact
yargs.command({
   command: "detail",
   describe: "Menampilkan Detail Semua Contact Berdasarkan Nama",
   builder: {
      nama: {
         describe: "Nama Lengkap",
         demandOption: true,
         type: "string",
      },
   },
   handler(argv) {
      contacts.detailContact(argv.nama);
   },
});

// menghapus contact berdasarkan nama
yargs.command({
   command: "delete",
   describe: "Menampilkan Contact Berdasarkan Nama",
   builder: {
      nama: {
         describe: "Nama Lengkap",
         demandOption: true,
         type: "string",
      },
   },
   handler(argv) {
      contacts.deleteContact(argv.nama);
   },
});

yargs.parse();
