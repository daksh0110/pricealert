var nodemailer = require("nodemailer");
require("dotenv").config();

function EmailModule(userEmail, productDoc) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_ID,
      pass: process.env.GMAIL_PASS,
    },
  });

  var mailOptions = {
    from: process.env.GMAIL_ID,
    to: userEmail,
    subject: "PRICE ALERT......",
    html: `
            <h2>Good news!</h2>
            <p>One of the products you're interested in, <strong>${productDoc.title}</strong>, has a price drop!</p>
            <p><strong>Newest Price: </strong>$${productDoc.price}</p>
           
            
            <br><br>
            <p>Thank you for staying with us!</p>
        `,
    text: `
            Good news!
            
            One of the products you're interested in, ${productDoc.title}, has a price drop!
            
            Newest Price: $${productDoc.price}
            
           
            
            Thank you for staying with us!
        `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
module.exports = EmailModule;
