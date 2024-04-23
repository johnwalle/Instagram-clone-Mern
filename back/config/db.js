const { connect } = require("mongoose")


const connectDB = async () => {

    try {
        connect(process.env.MONGODB_URI)
        console.log(`Mongodb connected.`.bgYellow);
    } catch (error) {
        console.error(error);
        console.log(`Error while connecting`.red)
    }
}

module.exports = connectDB