const mongoose = require("mongoose");

// membuat schema / model
const contact = mongoose.model("contact", {
   nama: {
      type: String,
      required: true,
   },
   nohp: {
      type: String,
      required: true,
   },
   email: {
      type: String,
   },
});

module.exports = contact;
