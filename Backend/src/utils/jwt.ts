import jwt from 'jsonwebtoken';

export const signJWT = (id: string, key: string, expiresIn: number | string) => {
    return jwt.sign(id, key, {expiresIn: `${expiresIn}`});
}

export const verifyJWT = async (token: string, key: string) => {
    try {
       const decoded = jwt.verify(token, key);
        return { decoded, expired: false };
    } catch (error) {
        if(error instanceof jwt.TokenExpiredError) {
            return { decoded: null, expired: true }
        } else if(error instanceof jwt.JsonWebTokenError) {
            return { decoded: null, expired: true }
        } else if(error instanceof jwt.NotBeforeError) {
            return { decoded: null, expired: true }
        } else {
            return { decoded: null, expired: true }
        }
    }
}



export const generateToken = (id: string, key: string, expiresIn: number | string) => {
    return jwt.sign(id, key, {expiresIn: `${expiresIn}`});
}


