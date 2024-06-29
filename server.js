const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 3007;
app.use(express.static(__dirname))
const users = [
    { username: 'darshan', password: bcrypt.hashSync('123456', 8) , role:'admin'},
    { username: 'nihar', password: bcrypt.hashSync('123456', 8) , role: 'admin'}, 
    { username: 'aryan', password: bcrypt.hashSync('123456', 8) , role: 'examiner'}, 
    { username: 'bhishma', password: bcrypt.hashSync('123456', 8) , role: 'examiner'}, 
    { username: 'khush', password: bcrypt.hashSync('123456', 8) , role: 'examiner'}, 
    { username: 'dishant', password: bcrypt.hashSync('123456', 8) , role: 'examiner'}, 
    { username: 'maan', password: bcrypt.hashSync('123456', 8) , role: 'examiner'}, 
    { username: 'aayush', password: bcrypt.hashSync('123456', 8) , role: 'examiner'}, 
    { username: 'moosam', password: bcrypt.hashSync('123456', 8) , role: 'examiner'}, 
    { username: 'hiren', password: bcrypt.hashSync('123456', 8) , role: 'examiner'} 
];

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
var name = ''
// Login endpoint
app.post('/login', (req, res) => {
    const username = req.body.username;
    const pass = req.body.password;
    name  =  req.body.username;
    // Find user by username (replace with database query)
    const user = users.find(u => u.username === username);

    if (!user) {
        return res.status(404).send('User not found');
    }

    // Compare passwords (using bcrypt to compare hashed passwords)
    bcrypt.compare(pass, user.password, (err, result) => {
        if (err || !result) {
            return res.status(401).send('Invalid username or password');
        }
        res.redirect(`/${user.role}`)
    });
});

app.get("/admin",(req,res)=>{
    res.sendFile(__dirname+'/admin.html')
})


// server.js

const multer = require('multer');
const path = require('path');
const fs = require('fs');


// Multer configuration for file upload handling
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: function (req, file,cb) {
        cb(null,file.originalname);
    }
});

const upload = multer({ storage: storage });

// Serve static files (optional)
app.use(express.static(__dirname,{index:'admin.html'}));

// POST endpoint for file upload
app.post('/upload', upload.single('file'), (req, res) => {
    try {
        // File upload successful
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }
        res.status(200).send('File uploaded successfully!');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/examiner',(req,res)=>{
    res.sendFile(__dirname+"/examiner.html")
   
})

function sub(){
    
}

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


