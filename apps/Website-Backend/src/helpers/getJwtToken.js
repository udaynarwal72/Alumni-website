import { sign } from 'jsonwebtoken';

const getJwtToken = (user) => {
    return sign(user, process.env.JWT_SECRET, {
        expiresIn: '1 day',
    });
}

export default getJwtToken;