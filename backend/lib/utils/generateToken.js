import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: '15d'
    })

    res.cookie("jwt", token, {
        maxAge: 15*24*60*10000, //Milliseconds
        httpOnly: true, //Prevents XSS attacks (cross-site scripting attacks) - token in unaccessible via javascript
        sameSite: "strict", //Prevents CSRF attacks (cross-site request forgery attacks)
        secure: process.env.NODE_ENV !== "development",
    })
}