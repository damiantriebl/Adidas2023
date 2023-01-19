import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
    const token = req.headers.authorization 
    if (!token) {
        res.status(401).json({error: 'Usuario no autorizado'})
    }

    jwt.verify(token, 'secreto', (err, decoded) => {
        if (err) {
            res.status(401).json({error: 'Usuario no autorizado'})
        }
        req.user = decoded.data
        next()
    })
    next()
}
export default auth;