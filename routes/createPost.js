const express = require("express")
const router = express.Router()
// Initialize firestore
const firestore = require("firebase/firestore");
// Create a reference to the database
const db = firestore.getFirestore()

const createPostForm = `
<h1>Create Post</h1>
<form action="/create/submit">
    <div style="display: flex; flex-direction: column; max-width: 400px; margin: 10px;">
        <label for="title">Title</label>
        <input type="text" name="title" placeholder="Title" style="margin-bottom: 20px;"/>
        <label for="text">Text</label>
        <input type="text" name="text" placeholder="Text" style="margin-bottom: 20px;"/>
        <label for="author">Author</label>
        <input type="text" name="author" placeholder="Author" style="margin-bottom: 20px;"/>
        <button type="submit">Submit</button>
    </div>
</form>
`;

//middleware specific to this router
router.use((_, __, next) => {
    console.log('Time: ', Date.now())
    next()
})

router.get("/", (req, res) => {
    res.send(createPostForm)
})

router.get("/submit", (req, res) => {
    res.send('hi')
})

module.exports = router;