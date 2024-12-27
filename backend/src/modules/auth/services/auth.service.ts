const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export class AuthService{
    comparePassword(password: string, hash: string){
        return bcrypt.compare(password, hash);
    }

    hashPassword(password: string){
        return bcrypt.hash(password, 10);
    }

    generateToken(id: unknown){
        return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3d' });
    }
}