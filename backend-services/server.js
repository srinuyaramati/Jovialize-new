require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const CORSOptions = require("./cors/cors");
const port = process.env.PORT || 6001;
const app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true,  }));
app.use(express.static('assets'));
const citiesRoute = require("./routes/cities");
const adminUserRoute = require("./routes/users")
const dealsRoute = require("./routes/deals");
const rolesRoute = require("./routes/roles");
const authenticationRoute = require("./routes/authentication");
const massMailingRoute = require("./routes/massMailing");
const webAppRoute = require("./webAppAPIs/routes");
const commonRoute = require("./routes/common");

app.use(express.json({ limit: '50mb' })); // Adjust the size as needed
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');

    // allowing any kind of headers, like Authentication or empty headers
    res.setHeader('Access-Control-Allow-Headers', '*');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// app.use(cors(CORSOptions.CORSSetting()))

app.get('/', function (req, res) {
    res.sendFile( __dirname + "/index.html");
})

app.get('/sample', function (req, res) {
    res.send([
        {
            message: "Message 1"
        },
        {
            message: "Message 2"
        },
        {
            message: "Message 3"
        }
    ]);
})

// app.get('*', function (req, res) {
//     res.sendFile( __dirname + "/404.html");
// })

app.use("/cities", citiesRoute);
app.use("/admin", adminUserRoute);
app.use("/deals", dealsRoute);
app.use("/roles", rolesRoute);
app.use("/authentication", authenticationRoute);
app.use("/massMailing", massMailingRoute);
app.use("/web", webAppRoute);
app.use("/common", commonRoute);

// Error handling middleware
app.use((err, req, res, next) => {
    if (err.status === 413) {
        console.log('Payload too large')
        return res.status(413).json({ error: 'Payload too large' });
    } else {
        next(err);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});