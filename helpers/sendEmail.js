const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'Koxstore1@gmail.com',
        pass: 'Koxstore123'
    }
})

function sendEmail(email) {
    const options = {
        from: "'MeatBox' <no-reply@gmail.com>",
        to: email,
        subject: "Pesanan MeatBox",
        text: "Pesanan Anda sedang dalam perjalanan"
    };

    transporter.sendMail(options, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log('berhasil');
        }
    })
}

module.exports = sendEmail;