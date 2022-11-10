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
        <input type="text" name="postTitle" placeholder="Title" style="margin-bottom: 20px;"/>
        <label for="text">Text</label>
        <input type="text" name="postText" placeholder="Text" style="margin-bottom: 20px;"/>
        <label for="author">Author</label>
        <input type="text" name="postAuthor" placeholder="Author" style="margin-bottom: 20px;"/>
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
    const queryParams = req.query //Query params from URL
    const title = queryParams.postTitle
    const text = queryParams.postText
    const author = queryParams.postAuthor
    //Create ID from title
    const idFromTitle = title.replace(/\s+/g, "-").toLowerCase()

    //Submit post to firebase
    const setBlogPost = firestore.setDoc(
        firestore.doc(db, "posts", idFromTitle),
        {
            title: title, 
            text: text, 
            author: author,
        }
    )

    setBlogPost
        .then((response) => {
            //if successful, send correct message
            console.log(response)
            res.send(`
            <h1>Submission Successful!</h1>
            <p><a href="/create">Create New Post</a></p>
            <p><a href="/">Return Home</a></p>
            `)
        })
        .catch((error) => {
            console.warn(error)
            res.send(`Error submitting:  ${error.toString()}`)
        })
})

module.exports = router;