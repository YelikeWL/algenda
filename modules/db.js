const mongoose = require('mongoose')

// Connect to MongoDB
function connect() {
    try {
        const connectParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }

        mongoose.connect(process.env.DATABASE_URL, connectParams)
        mongoose.connection.on('error', error => console.log(error))
        mongoose.connection.once('open', () => console.log('Connected to MongoDB'))
        
    } catch (error) {
        console.log(error, "Could not connect to MongoDB")
    }
}

module.exports = connect