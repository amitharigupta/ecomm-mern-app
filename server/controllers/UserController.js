const bcrypt = require('bcrypt');
const saltRounds = 10;
const UserModel = require("../models/user.models.js");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");
const { sendEmail } = require("../utils/mail.utils");

// Password Hashing using bcrypt library
async function hashPassword(password) {
    let hashPassword = await bcrypt.hash(password, saltRounds);
    return hashPassword;
}

async function comparePassword(password, hashPassword) {
    return bcrypt.compare(password, hashPassword);
}
// End of Password Hashing using bcrypt library

async function generateToken(payload) {
    let token = await jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "1h" });
    return token;
}

module.exports = {
    register: async (req, res, next) => {
        try {
            let { name, email, password, cpassword } = req.body;
            const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
                folder: "avatars",
                width: 150,
                crop: "scale"
            });

            logging.info('UserController : register : body ' + JSON.stringify(req.body));

            if (!name || !email || !password || !cpassword) {
                return res.status(422).json({ status: 422, message: "Fill all Details" });
            }

            let userExist = await UserModel.findOne({ email });
            if (userExist) return res.status(401).json({ status: 401, message: "User Already Exist" });
            else if (password != cpassword) return res.status(422).json({ status: 422, message: "Password and Confirm Password does not match" });

            password = await hashPassword(password);
            cpassword = password ? password : await hashPassword(password);

            let userObj = {
                name,
                email,
                password,
                cpassword,
                avatar: {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url
                }
            }

            const finalUser = new UserModel(userObj);
            const saveUser = await finalUser.save();
            if (saveUser) {
                return res.status(201).json({ status: 201, message: "User Created Successfully", data: saveUser });
            } else {
                return res.status(401).json({ status: 401, message: "Error While creating user" });
            }

        } catch (error) {
            console.log(error);
            logging.info('UserController : register : Error : ' + error);
            return res.status(500).json({ status: 500, message: "Internal Server Error" });
        }
    },

    login: async (req, res, next) => {
        try {
            let { email, password } = req.body;
            console.log(email, password);

            logging.info('UserController : login : ' + JSON.stringify(req.body));

            if (!email || !password) {
                return res.json({ status: 400, message: "Please enter valid details" });
            }

            let userExist = await UserModel.findOne({ email });

            if (!userExist) return res.json({ status: 400, message: "Invalid email and password" });

            let isMatch = await comparePassword(password, userExist.password);
            if (!isMatch) return res.json({ status: 400, message: "Invalid email and password" });

            let payload = {
                name: userExist.name,
                email: userExist.email
            }
            let token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "1h" });

            const saveToken = new UserModel({ token: token });

            if (saveToken) {
                res.cookie("usercookie", token, {
                    expiresIn: new Date(Date.now() + 9000000),
                    httpOnly: true
                });
                payload = { ...payload, isAdmin: userExist.isAdmin };
                return res.json({ status: 200, message: "User logged in successfully", data: { ...payload, token } });
            } else {
                return res.json({ status: 400, message: "Error while loggin in" });
            }

        } catch (error) {
            console.log(error);
            logging.info('UserController : login : Error : ' + error);
            return res.status(500).json({ status: 500, message: "Internal Server Error" });
        }
    },

    validUser: async (req, res, next) => {
        try {
            const validUser = await UserModel.findOne({ email: req.rootUser.email, id: req.userId });

            if (validUser) {
                return res.status(200).json({ status: 200, message: "User is Authenticated", data: validUser });
            } else {
                return res.status(401).json({ status: 401, message: "Not a valid User" });
            }
        } catch (error) {
            logging.info('UserController : validUser : Error : ' + error);
            return res.json({ status: 500, message: "Internal Server Error" });
        }
    },

    logout: async (req, res, next) => {
        try {
            console.log('req : ', req);
            const token = req.token;
            console.log(token);

            res.clearCookie("usercookie", { path: "/" });

            req.rootUser.save();

            if (req.rootUser) {
                return res.status(200).json({ status: 200, message: "User logout successfully", data: req.token });
            } else {
                return res.status(401).json({ status: 401, message: "Not a valid User" });
            }

        } catch (error) {
            logging.info('UserController : logout : Error : ' + error);
            return res.json({ status: 500, message: "Internal Server Error" });
        }
    },

    sendPasswordLink: async (req, res, next) => {
        try {
            let { email } = req.body;
            if (!email) {
                return res.status(200).json({ status: 400, message: "Please enter valid mail" });
            }

            let user = await UserModel.findOne({ email });
            if (!user) {
                return res.status(404).json({ status: 404, message: "User Not Found" });
            }

            // Token creation for password reset
            let payload = {
                name: user.name,
                email: user.email
            }
            let token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRY_IN || "60s" });

            const setUserToken = await UserModel.findByIdAndUpdate({ _id: user._id }, { verifytoken: token }, { new: true });
            // console.log(req);
            let textMessage = `Dear User, \n\nThis link is valid for 2 mins ${req.protocol}://${req.hostname}:${process.env.FRONTEND_PORT}/forgot-password/${user._id}.\n\n If you have not requested for this email then please ignore it.`;
            if (setUserToken) {
                const mailOptions = {
                    from: process.env.SMTP_MAIL_USER,
                    to: user.email,
                    subject: `Amazon App Password Reset - Sending Email For Password Reset`,
                    text: textMessage
                }
                console.log(mailOptions.text);

                let isEmailSended = await sendEmail(mailOptions);
                console.log(isEmailSended);
                if (!isEmailSended) {
                    console.log("Error: ", error);
                    return res.status(401).json({ status: 401, message: "Email not send" });
                } else {
                    console.log("Email Sent");
                    return res.status(201).json({ status: 201, message: "Email sent successfully" });
                }
            } else {

            }
        } catch (error) {
            logging.info('UserController : sendPasswordLink : Error : ' + error);
            return res.json({ status: 500, message: "Internal Server Error" });
        }
    },

    // verify user for forgot password
    forgotPassword: async (req, res, next) => {
        try {
            console.log(req.params);

            const { id } = req.params;

            const validUser = await UserModel.findOne({ _id: id });
            if (!validUser) {
                return res.status(200).json({ status: 401, message: "User Not Found" });
            }

            if (validUser) {
                return res.status(201).json({ status: 201, message: "Valid User", data: validUser });
            } else {
                return res.status(200).json({ status: 401, message: "Error while vaildating" });
            }

        } catch (error) {
            console.log(error);
            logging.info('UserController : forgotPassword : Error : ' + error);
            return res.json({ status: 500, message: "Internal Server Error" });
        }
    },

    updatePassword: async (req, res, next) => {
        try {
            const { id } = req.params;

            const { password, token } = req.body;
            if (!password) {
                return res.status(200).json({ status: 401, message: "Please enter password" });
            }
            const validUser = await UserModel.findOne({ _id: id, verifytoken: token });
            const validToken = jwt.verify(token, process.env.TOKEN_SECRET);
            if (!validUser) {
                return res.status(200).json({ status: 401, message: "User Not Found" });
            }

            if (!validToken) {
                return res.status(200).json({ status: 401, message: "Token is not valid" });
            }

            if (validUser && validToken) {
                let newPassword = await bcrypt.hash(password, 10);
                await UserModel.findByIdAndUpdate({ _id: validUser._id }, { password: newPassword });

                return res.status(201).json({ status: 201, message: "Password updated successfully" });
            } else {
                return res.status(200).json({ status: 401, message: "Error while vaildating" });
            }
        } catch (error) {
            logging.info('UserController : updatePassword : Error : ' + error);
            return res.json({ status: 500, message: "Internal Server Error" });
        }
    },

    updateUserProfile: async (req, res, next) => {
        try {
            let { name, email } = req.body;
            const user = await UserModel.findById(req.user._id);

            if (user) {
                user.name = name || user.name;
                user.email = email || user.email;

                const finalUser = new UserModel(user);
                let updatedUser = await finalUser.save();

                updatedUser = { ...updatedUser, token: generateToken(user) };

                return res.status(200).json({ status: 200, message: "User updated successfully", data: updatedUser });
            } else {

            }
        } catch (error) {
            logging.info('UserController : updatePassword : Error : ' + error);
            return res.json({ status: 500, message: "Internal Server Error" });
        }
    }
}