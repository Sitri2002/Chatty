// Chatty -  A chatting webapp
// Jack Nguyen - 10/23/2023

const mongoose = require('mongoose');
const express = require('express');

const mongoDBURL = 'mongodb://127.0.0.1/Chatty';
const app = express();

// Database
mongoose.connect(mongoDBURL, { useNewUrlParser: true });
mongoose.connection.on('error', () => {
 console.log('Connection error')
});

const ChatMessageSchema = new mongoose.Schema({
    alias: String,
    message: String
});


const ChatMessage = mongoose.model("chats", ChatMessageSchema);

app.use(express.static('public_html'))
app.get('/message/:alias/:inp', (req, res)=> {
    console.log("Saving msg to database");
    var sender = req.params.alias;
    var input = req.params.inp
    console.log(sender);
    console.log(input);
    let newMSG = new ChatMessage({alias: sender, message: input});
    newMSG.save();
    ChatMessage.find({}).then(function(chat) {
        res.send(processJSON(chat));
    }).catch(function(err) {
        console.log(err);
    });
})

function processJSON(j) {
    console.log("Processing JSON");
    out = "";
    for (let i = 0; i < j.length; i++) {
        let obj = j[i];
        out+= "<b>"+obj.alias+"</b>" + ": "     +obj.message+"<br>";
    }
    console.log(out);
    return out;
}

app.listen(5000, () => {
    console.log("Server is running");
});
