const express = require("express")
const router = express.Router()
// Initialize firestore
const firestore = require("firebase/firestore");
// Create a reference to the database
const db = firestore.getFirestore()

//middleware specific to this router
router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})

//define the index route
router.get('/', (req, res) => {
    const postsQuery = firestore.getDocs(firestore.collection(db, "posts"))
    const postsArray = []

    postsQuery
    .then((response) => {
        response.forEach((post) => {
            console.log(post.data())
            postsArray.push({id: post.id, ...post.data() })
        });
        res.send(postsArray)

    }).catch((error) => {
        console.log(error)
        res.send(error)
    });

    // return querySnapshot.forEach((post) => {
    //     console.log(`${post.id} => ${post.data()}`)
    // })

})

module.exports = router