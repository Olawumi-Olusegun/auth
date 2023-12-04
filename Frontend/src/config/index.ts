import * as dotenv from 'dotenv';

dotenv.config();

interface ENV {
VITE_FIREBASE_API_KEY: string | undefined;
VITE_AUTH_DOMAIN: string | undefined;
VITE_PROJECT_ID: string | undefined;
VITE_STORAGE_BUCKECT: string | undefined;
VITE_MESSAGE_SENDER_ID: string | undefined;
VITE_APP_ID: string | undefined;
}


interface Config {
    VITE_FIREBASE_API_KEY: string;
    VITE_AUTH_DOMAIN: string;
    VITE_PROJECT_ID: string;
    VITE_STORAGE_BUCKECT: string;
    VITE_MESSAGE_SENDER_ID: string;
    VITE_APP_ID: string;
}


const getConfig = () => {
    return {
        VITE_FIREBASE_API_KEY: process.env.VITE_FIREBASE_API_KEY,
        VITE_AUTH_DOMAIN: process.env.VITE_AUTH_DOMAIN,
        VITE_PROJECT_ID: process.env.VITE_PROJECT_ID,
        VITE_STORAGE_BUCKECT: process.env.VITE_STORAGE_BUCKECT,
        VITE_MESSAGE_SENDER_ID: process.env.VITE_MESSAGE_SENDER_ID,
        VITE_APP_ID: process.env.VITE_APP_ID,
    }
}


const config = getConfig();


const getSanitizedConfig = (config: ENV) => {
    for(const [key, value] of Object.entries(config)) {
        if(key === undefined) {
            throw new Error(`Missing Key ${key} in your app`); 
        }
    }

    return config as Config;
}


const sanitizedConfig = getSanitizedConfig(config);

export default sanitizedConfig;