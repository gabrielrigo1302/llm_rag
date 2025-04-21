import {
    config
} from 'dotenv';

export const configDotenvAdapter = () => {
    return config() 
}