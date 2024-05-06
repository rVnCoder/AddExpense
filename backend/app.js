const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
const {readdirSync} = require('fs')
const app = express()
var userid='4';
const webhook=require('./webhook.js');
// import { Webhook } from 'svix';
const { Webhook } = require('svix');
require('dotenv').config()
const PORT = process.env.PORT
//middlewares
app.use(express.json())
app.use(cors())
//app.use(webhook);
// app.post('/api/webhook', async function (req, res) {
//   try {
//     const payloadString = JSON.stringify(req.body);
//     const svixHeaders = req.headers;
//     const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);
//     const evt = wh.verify(payloadString, svixHeaders);
//     const { id, ...attributes } = evt.data;
//     // Handle the webhooks
//     const eventType = evt.type;
//     console.log('webhook here ----------------->')
//     if (eventType === 'user.created') {
//       const firstName = attributes.first_name;
//       const lastName = attributes.last_name;
//       const user = new User({
//         clerkUserId: id,
//         firstName: firstName,
//         lastName: lastName,
//       });
//       await user.save();
//       res.locals.UserData = { clerkUserId: id };
//       console.log('User saved to database');
//     }

//     else if(eventType === 'session.created') {
//         console.log('Session created');
//         res.locals.UserData = { clerkUserId: id };
//     }
//     res.status(200).json({
//       success: true,
//       message: 'Webhook received',
//     });
    
//   } catch (err) {
//     res.status(400).json({
//       success: false,
//       message: err.message,
//     });
//   }
// });
//routes

readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}

server()

