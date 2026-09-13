const jwt = require("jsonwebtoken");

// ===================================
// AUTH MIDDLEWARE
// ===================================

const authMiddleware = (req, res, next) => {

    try {

        // ===================================
        // GET TOKEN FROM AUTHORIZATION HEADER
        // ===================================

        const authHeader = req.headers.authorization;

        if (!authHeader) {

            return res.status(401).json({

                success: false,

                message: "Please Login First"

            });

        }

        // ===================================
        // Bearer TOKEN
        // ===================================

        const token = authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : null;

        if (!token) {

            return res.status(401).json({

                success: false,

                message: "Invalid Token"

            });

        }

        // ===================================
        // VERIFY TOKEN
        // ===================================

        const decoded = jwt.verify(

            token,

            process.env.JWT_SECRET

        );

        // ===================================
        // SAVE USER DATA
        // ===================================

        req.user = decoded;

        next();

    }

    catch (error) {

        console.log("Auth Error:", error.message);

        return res.status(401).json({

            success: false,

            message: "Invalid Or Expired Token"

        });

    }

};

module.exports = authMiddleware;
