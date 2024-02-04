const mongoose = require('mongoose')

const connectDB = async () => {
    try {
       let res = await mongoose.connect(process.env.MONGO_URI)
       console.log(`DB Connected to ${process.env.MONGO_URI}`)
    } catch (err) {
        console.log({error: err.message})
    }
}

module.exports = connectDB;