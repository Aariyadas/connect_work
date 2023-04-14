




const mongoose = require("mongoose");
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.set("strictQuery", false);
module.exports = mongoose
  .connect('mongodb+srv://dbUser:dbUser@cluster0.3ljghjd.mongodb.net/connect-work?retryWrites=true&w=majority', connectionParams)
  .then()
  .catch((error) => console.log(error.message));


