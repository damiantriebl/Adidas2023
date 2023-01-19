import express from 'express';
import userNormalizer from '../negocio/userNormalizer.js';
import multer from 'multer';
import storage from '../config/multerConfig.js';
import transporter from "../config/nodeMailer.js";
import passport from 'passport'
import auth from "../middlewares/auth.js"

const router = express.Router();

const upload = multer({ storage })

const generarToken = (user) => {
    const token = jwt.sign({data: user}, PRIVATE_KEY, {expiresIn: '24h'})
    return token
  }
router.get('/api/user',  auth ,(req, res) => {
    res.send(req.session);
})

router.get('/api/logout',  async (req, res, next) => {
    req.session.destroy(function (err) {
        res.send('se deslogeo'); //Inside a callback… bulletproof!
      });
})

router.post('/api/signup',upload.single("file"), async (req, res, next) => {
    const data = {...req.body}
    const res2 = await new userNormalizer().guardarUsuario(data);  
    const respuesta = res2.data;
    const html= `<ul>
                    <li>nombre: ${respuesta?.nombre}</li>
                    <li>Email: ${respuesta?.email}</li>
                    <li>Edad: ${respuesta?.edad}</li>
                    <li>direccion: ${respuesta?.direccion}</li>
                    <li>telefono: ${respuesta?.telefono}</li>
            </ul>`
    const email = {
        from: "Adidas 2022", // sender address,
        to: "damiantriebl@gmail.com",
        subject: "Un nuevo usuario se a registrado",
        html: `<body><h1>se a registrado una persona:</h1><br/>${html}</body>`,
    };
      const mail = await transporter.sendMail(email);
  
    res.json(res2)   
})
router.get('/api/variables', auth,  (req, res) => {
  if(process.env.ENVIROMENT){
    res.send({
       MONGO_URI: process.env.MONGO_URI,
       ENVIROMENT:process.env.ENVIROMENT,
       PORT:process.env.PORT,
       WEBSOCKET_PORT:process.env.WEBSOCKET_PORT,
       MAIL_PASS:process.env.MAIL_PASS,
       MAIL_USER:process.env.MAIL_USER,
       MAIL_HOST:process.env.MAIL_HOST,
       MAIL_PORT:process.env.MAIL_PORT,
       PRIVATE_KEY:process.env.PRIVATE_KEY       
     });
   }else {
    res.send({
      mensaje:" no tiene ninguna variable de entorno, puede que este en modo debug"
    })
  }
})

export {router as UserRouter}
