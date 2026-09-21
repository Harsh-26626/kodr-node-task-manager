import UserModel from '../models/user.js';
import { hash, compare } from 'bcrypt';
import jswt from 'jsonwebtoken';
const {sign} = jswt;
import { config } from 'dotenv'

config();

const JWT_SECRET = process.env.JWT_SECRET;

const SignUp = async (req, res) => {
    try {
        let user = req['entity'];
        const hasedPassword = await hash(user['password'], 10);

        user = {...user, password: hasedPassword};
        await UserModel.create(user);
    } catch (e) {
        return res.status(400).json(e);
    }

    return res.status(201).json({'Success': 'Congratulations, Harsh welcomes you to TaskNest, kindly login to continue'});
};

const Login = async (req, res) => {
    try {
        let user = req['entity'];

        const dbUser = await UserModel.findOne({
            email: user['email']
        });

        if(!dbUser) {
            return res.status(404).json({'message': 'User does not exist, kindly signup firstly!'});
        }

        const isPasswordCorrect = await compare(user['password'], dbUser.password);

        if(isPasswordCorrect) {
            const jwt = sign({
                    id: dbUser._id.toString()
                },
                JWT_SECRET
            );

            return res.status(200).json({'Success': 'Login Successfull!', 'Access Token': jwt});
        } else {
            return res.status(401).json({'message': 'Incorrect Password, try again'});
        }

    } catch(e) {
        return res.status(400).json(e);
    }
}

export {SignUp, Login};