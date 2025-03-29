exports.generateSixDigitNumber = () => {
    const min = 100000; // Smallest 6-digit number
    const max = 999999; // Largest 6-digit number 
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.SMTP_CONFIG = {
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
        user: "791114001@smtp-brevo.com",
        pass: "IRA1dcxZODaP4Vv8"
    }
}