import crypto from 'crypto';

export const randomString = ()=>{
    return crypto.randomBytes(128).toString('base64');
}
const SECRET = 'eohaoshgpea32t1'
export const authentication = (salt:string, password:string) =>{
    return crypto.createHmac('sha256', [
        salt,
        password].join('/')).update(SECRET).digest('hex')
    
}