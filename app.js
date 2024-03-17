const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');

const app = express();

var streamdata = fs.readFileSync('D:/Project/Bharat_intern_1/public/index.html', 'utf-8');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));

mongoose.connect('mongodb+srv://Admin:sZyTYyK6c5uQhVJR@cluster0.gnd8jqi.mongodb.net/internship');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    console.log('Connected to MongoDB');
});

const registrationSchema = new mongoose.Schema({
    username: String,
    password: String
});

const Registration = mongoose.model('login', registrationSchema);

app.get('/', (req, res) => {
    res.end(streamdata);
});

app.post('/signupForm', (req, res) => {
    const { username, password } = req.body;

    const newRegistration = new Registration({
        username: username,
        password: password
    });

    newRegistration.save()
        .then((data) => {
            console.log(data);
            res.send("User registered successfully!");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Error registering user");
        });
});

app.post('/signinForm', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await Registration.findOne({ username, password });
        if (user) {
            console.log("Credentials matched!");
            res.json({ username: user.username, isMatched: 1 });
        } else {
            console.log("Credentials not matched!");
            res.json({ isMatched: 2 });
            // res.status(401).send("Credentials not matched!");
        }
    } catch (err) {
        console.error("Error retrieving data:", err);
    }
});

const add = new mongoose.Schema({
    username: String,
    ncu: Number
});

const mod = mongoose.model('balance', add);

app.get('/', (req, res) => {
    res.end(streamdata);
});

app.post('/current', async (req, res) => {
    const { username, ncu } = req.body;

    try {
        // Save the updated balance to the new table
        const updatedBalanceEntry = new mod({
            username: username,
            ncu: ncu
        });

        await updatedBalanceEntry.save();

        // Fetch the updated balance from the new table
        const updatedBalance = await mod.findOne({ username });

        if (!updatedBalance) {
            return res.status(404).send("Updated balance not found");
        }

        // Respond with the updated balance
        res.json({ currentbalance: updatedBalance.ncu });
    } catch (err) {
        console.error("Error updating/retrieving balance:", err);
        res.status(500).send("Error updating/retrieving balance");
    }
});

app.get('/getNcu', async (req, res) => {
    try {
        const balance = await mod.findOne().sort({ _id: -1 });
        if (!balance) {
            return res.status(404).send("NCU value not found");
        }
        res.json({ ncu: balance.ncu });
    } catch (err) {
        console.error("Error retrieving NCU value:", err);
        res.status(500).send("Error retrieving NCU value");
    }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
