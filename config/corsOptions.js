// whitelisting domain to allow
const whitelist = ['https://www.google.com', 'http://localhost:3500', 'http://127.0.0.1:5500'];
const corsOptions = {
    origin: (origin, callback) => {
        // Why used (!origin) in if below
        // This happens when you load your page in the same origin that you are making API calls to. The browser doesn't set the "Origin" header unless the API call's domain is different from the one where the page is being served.
        if(whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        }else {
            callback(new Error('Not Allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;