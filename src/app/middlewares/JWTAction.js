import jwt from 'jsonwebtoken';

const createJWT = (payload) => {
    let keySecret = process.env.JWT_SECRET_KEY;
    let token = null;
    try {
        token = jwt.sign(payload, keySecret);
    } catch (error) {
        console.log(error);
    }
    return token;
}

const verifyJWT = (token) => {
    let keySecret = process.env.JWT_SECRET_KEY;
    let payload = null;
    try {
        payload = jwt.verify(token, keySecret, function (err, decoded) {
            if (err) {
                return false;
            } else {
                return decoded;
            }
        })
    } catch (error) {
        console.log(error);
    }
    return payload;
}

export default {   
    createJWT,
    verifyJWT
}