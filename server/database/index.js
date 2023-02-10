const mongoose = require("mongoose");

const connectDB = () => {
    try {
        mongoose.connect(process.env.MONGO_DB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        .then(() => {
            console.log(`Database is connect to mongod host`.green);
        })
        .catch((err) => {
            console.log(`Error while connecting database : ${err}`.red);
        })
    } catch (error) {
        console.log(`Error : ${error}`.red);
        process.exit(1);
    }
}

connectDB();