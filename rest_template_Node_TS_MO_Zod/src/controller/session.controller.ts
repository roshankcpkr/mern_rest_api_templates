import { Request, Response } from "express";
import { createSession, findSessions, updateSession } from "../service/session.service";
import { validatePassword } from "../service/user.service";
import {signJwt} from "../utils/jwt.utils"
import config  from "config";

export async function createUserSessionHandler(req: Request, res: Response)
{
    // Validate the email and password
    const user = await validatePassword(req.body)
    if(!user)
    {
        return res.status(401).send("Invalid username or password")
    }   
    // create a session
    const session = await createSession(user._id, req.get('user-agent') || "")
    // create access token
    const accessToken = signJwt(
        {...user, session: session._id},
        {expiresIn: config.get<string>('accessTokenTtl')}
)
//create refresh token
const refreshToken = signJwt(
    { ...user, session: session._id },
    {
        expiresIn: config.get<string>('refreshTokenTtl')
    }
)

// send refresh & access token back
return res.send({accessToken, refreshToken})

}

export async function getUserSessionHandler(req: Request, res: Response)
{
    const userId = res.locals.user._id
    const sessions = await findSessions({
        user: userId,
        valid: true
    })
    return res.send(sessions)

}

export async function deleteSessionHandler(req:Request, res: Response)
{
    const sessionId = res.locals.user.session

    await updateSession({ _id: sessionId }, { valid: false })
    
    return res.send({
        accessToken: null,
        refreshToken: null
    })
}