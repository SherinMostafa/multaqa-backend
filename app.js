const express = require('express');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();


///////////////////session///////
app.use(session({
    secret: 'arwa500',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));

////////////Routers//////////////////////////
const userRouter = require('./src/routers/user.js');
const eventAttendee = require('./src/routers/event-attendee.js')
const feedback = require('./src/routers/feedback.js')
const feedbackAttendee = require('./src/routers/feedback-attendee.js')
const organizer = require('./src/routers/organizer.js')
const photoEvent = require('./src/routers/photo-event.js')
const ticket = require('./src/routers/ticket.js')
const ticketChannel = require('./src/routers/ticket-channel.js')
const plan = require('./src/routers/plan.js')
const userPhone = require('./src/routers/user-phone.js')
const contactUs = require('./src/routers/contact.js')
const eventRouter = require("./src/routers/event.js")

app.use(cors());
// app.use(bodyParser.json());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const url = "mongodb+srv://sherinmostafa:Multaqa%402024@multaqa.fforxrx.mongodb.net/?retryWrites=true&w=majority&appName=multaqa";

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        mongoose.connect(url);
        console.log('Connect to Mongo DB');
    } catch (error) {
        console.log('Error while connecting to Mongo DB ' + error);
        process.exit();
    }
}

connectDB();

//////////CALL ROUTERS/////////////////////////////
app.use(express.urlencoded({ extended: true }));
app.use('/', userRouter);
app.use(eventAttendee)
app.use(feedback)
app.use(feedbackAttendee)
app.use(organizer)
app.use(photoEvent)
app.use(ticket)
app.use(ticketChannel)
app.use(plan)
app.use(userPhone)
app.use(contactUs)
app.use(eventRouter)

///////////////////////////////////////////////////////////
app.get('/organizer', (req, res) => res.send('Organizer Page'));
app.get('/events', (req, res) => res.send('Attendee Page'));



app.listen(5000, () => {
    console.log('Server is running on port 5000')
});