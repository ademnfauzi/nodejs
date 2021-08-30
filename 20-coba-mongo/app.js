const { ObjectId } = require("bson");
const { MongoClient } = require("mongodb");
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "node";

async function main() {
   // Use connect method to connect to the server
   await client.connect();
   console.log("Connected successfully to server");
   const db = client.db(dbName);
   const collection = db.collection("mahasiswa");

   // the following code examples can be pasted here...

   // menambahkan data klo mau satu data bisa menggunakan insertOne lalu menggunakan langsung ke objek tanpa array
   //    const insertResult = await collection.insertMany([
   //       { nama: "coba", email: "coba@gmail.com" },
   //       { nama: "coba2", email: "coba2@gmail.com" },
   //    ]);
   //    console.log("Inserted documents =>", insertResult);

   //    finding data
   //    const findResult = await collection.find({}).toArray();
   //    console.log("Found documents =>", findResult);

   //    query filter data
   //    const filteredDocs = await collection
   //       .find({ _id: ObjectId("612c8385b9f44d2dc07b787c") })
   //       .toArray();
   //    console.log("Found documents filtered by { a: 3 } =>", filteredDocs);

   //    update data
   //    const updateResult = await collection.updateOne(
   //       { _id: ObjectId("612c8385b9f44d2dc07b787c") },
   //       { $set: { nama: "Fauzi", email: "fauzi@yahoo.com" } }
   //    );
   //    console.log("Updated documents =>", updateResult);

   //    update data banyak
   //    const updateResult = await collection.updateMany(
   //       { nama: "coba" },
   //       { $set: { nama: "coba aja" } }
   //    );
   //    console.log("Updated documents =>", updateResult);

   const deleteResult = await collection.deleteMany({ nama: "coba aja" });
   console.log("Deleted documents =>", deleteResult);

   return "done.";
}

main()
   .then(console.log)
   .catch(console.error)
   .finally(() => client.close());
