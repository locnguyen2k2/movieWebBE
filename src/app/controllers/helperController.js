import jwt from 'jsonwebtoken';
const checkUserExists = (username, users) => {
    return users.find(user => user.username === username && user.status === 0);
}

const setUserSession = (req) => {
    return req.session.user ? req.session : {};
}

export default {
    checkUserExists,
    setUserSession
};