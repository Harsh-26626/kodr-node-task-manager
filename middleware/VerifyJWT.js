import jswt from 'jsonwebtoken';
const { verify } = jswt;
import { config } from 'dotenv'

config();

const JWT_SECRET = process.env.JWT_SECRET;

const verifyJWT = (req, res, next) => {
    const auth = req['headers']['authorization'];

    if(!auth) return res.status(401).json({'message': 'Authorization Headers missing'});

    if(!auth.startsWith('Bearer ')) return res.status(401).json({'message': 'Invalid Authorization Headers'});

    const authToken = auth.split(' ')[1];

    try {
        const decodedToken = verify(authToken, JWT_SECRET);

        if(!req['body']) {
            req['body'] = {};
        }
    
        req.body.userId = decodedToken['id'];
    
        next();
    } catch(e) {
        return res.status(403).json({'message': 'Invalid Access Token'});
    }
}

export default verifyJWT;