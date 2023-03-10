const bcrypt = require("bcrypt");

const users = [
    {
        name: "admin",
        email: "admin@gmail.com",
        password: bcrypt.hashSync('demorm', 10),
        cpassword: bcrypt.hashSync('demorm', 10),
        isAdmin: true
    },
    {
        name: "amit",
        email: "amit@gmail.com",
        password: bcrypt.hashSync('demorm', 10),
        cpassword: bcrypt.hashSync('demorm', 10),
        isAdmin: true
    },
    {
        name: "user",
        email: "user@gmail.com",
        password: bcrypt.hashSync('demorm', 10),
        cpassword: bcrypt.hashSync('demorm', 10),
        isAdmin: false
    }
]

module.exports = users