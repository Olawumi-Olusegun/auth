import * as dotenv from 'dotenv';

dotenv.config();


interface ENV {    
    PORT: string | undefined;
    MONGODB_URI: string | undefined;
    JWT_SECRET: string | undefined;
}

interface Config {    
    PORT: string;
    MONGODB_URI: string;
    JWT_SECRET: string;
}

const getConfig = () => {
    return {
        PORT: process.env.PORT,
        MONGODB_URI: process.env.MONGODB_URI,
        JWT_SECRET: process.env.JWT_SECRET,
    }
}

const getSanitizedConfig = (config: ENV) => {
    for(const [key, value] of Object.entries(config)) {
        if(key === undefined) {
            throw new Error(`Missing key: ${key} in your app`);
        }
    }
    return config as Config;
}

const config = getConfig();

const sanitizedConfig = getSanitizedConfig(config);

export default sanitizedConfig;