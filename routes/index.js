const express = require("express")
const router = express.Router()

//middleware specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})

//define the index route
router.get('/', (req, res) => {
    res.send('Wow! This is working! aMANUJnbdkuwabhdk')
})

module.exports = router