import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';
import { verifyJwt } from '../utils/jwt.utils';
import { reIssueAccessToken } from '../service/session.service';

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = get(req, "headers.x-refresh") || req.cookies["x-refresh"] || null;
    const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "");
    if(!accessToken) return next();
    try {
        const { decoded, expired } = verifyJwt(accessToken, );
        console.log("decoded user",decoded, expired);
        if(decoded) {
            res.locals.user = decoded;
            return next();
        }

        if(expired && refreshToken)
        {
            const newAccessToken = await reIssueAccessToken(refreshToken);

            if(newAccessToken)
            {
                res.setHeader("x-access-token", newAccessToken);
               
            }
            const result = verifyJwt(newAccessToken as string, );
            res.locals.user = result.decoded;
        }
        return next();
    } catch (e) {
        return next();
    }
}

export default deserializeUser;