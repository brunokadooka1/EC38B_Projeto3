const mongoose = require('mongoose');

async function main() {
  await mongoose.connect(process.env.DB_CONN);
  console.log("Conectou ao Mongoose!");
}

main().catch((err) => console.log(err));

module.exports = mongoose;