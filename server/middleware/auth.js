const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.models");
const secretkey = process.env.TOKEN_SECRET || "secret";

module.exports = {
    authenticate: async (req, res, next) => {
        try {
            let token = req.headers.authorization || req.body.authorization;
            token = token.split(' ')[1];
            if (token === 'null' || !token) {
                return res.status(401).json({ status: 401, message: "Unauthorized Access" });
            }
            else {
                jwt.verify(token, secretkey, async function (err, decoded) {
                    if (err) {
                        return res.status(401).json({ status: 401, message: "Unauthorized Access" });
                    } else {
                        const rootUser = await UserModel.findOne({ email: decoded.email, name: decoded.name });
                        if (!rootUser) throw new Error("User not found");
                        req.token = token;
                        req.rootUser = rootUser;
                        req.userId = rootUser._id;
                        next();
                    }
                })
            }
        } catch (error) {
            console.log(error);
            return res.status(401).json({ status: 401, message: "Unauthorized Access No token provided" });
        }
    },

    isUserAdminLogin: async(req, res, next) => {
        try {
            let token = req.headers.authorization || req.body.authorization;
            token = token.split(' ')[1];
            if (token === 'null' || !token) {
                return res.status(401).json({ status: 401, message: "Unauthorized Access" });
            }
            else {
                jwt.verify(token, secretkey, async function (err, decoded) {
                    if (err) {
                        return res.status(401).json({ status: 401, message: "Unauthorized Access" });
                    } else {
                        const rootUser = await UserModel.findOne({ email: decoded.email, name: decoded.name });
                        if(rootUser.isAdmin != true) {
                            return res.status(401).json({ status: 401, message: "Unauthorized Admin Access" });
                        }
                        if (!rootUser) throw new Error("User not found");
                        req.token = token;
                        req.rootUser = rootUser;
                        req.userId = rootUser._id;
                        next();
                    }
                });
            }
        } catch (error) {
            console.log(error);
            return res.status(401).json({ status: 401, message: "Unauthorized Access No token provided" });
        }
    }
}