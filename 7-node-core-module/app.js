// file system
const fs = require("fs");
// console.log(fs);

// menuliskan file secara synchronous
// try {
//    fs.writeFileSync("data/test.txt", "Hello World secara synchronous!");
// } catch (error) {
//    console.log(error);
// }

// menuliskan file secara asynchronous
// fs.writeFile("data/test.txt", "Hello World Secara asynchronous", (err) => {
//    console.log(err);
// });

// membaca file secara synchronous
// const data = fs.readFileSync("data/test.txt");
// console.log(data.toString());

// const data = fs.readFileSync("data/test.txt", "utf-8");
// console.log(data);

// membaca file secara synchronous
// fs.readFile("data/test.txt", "utf-8", (err, data) => {
//    if (err) throw err;
//    console.log(data);
// });

// readline
const readline = require("readline");
const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout,
});

rl.question("Masukan nama anda :  ", (answer) => {
   rl.question("Masukan no handphone anda :", (number) => {
      const contact = {
         nama: answer,
         noHP: number,
      };

      const file = fs.readFileSync("data/contacts.json", "utf-8");
      const contacts = JSON.parse(file);
      contacts.push(contact);

      //   console.log(contacts);
      fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
      console.log(`Terimakasih ${answer}, sudah menginputkan ${number}`);
      rl.close();
   });
});
