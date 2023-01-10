import express from 'express';
import userNormalizer from '../negocio/userNormalizer.js';
import multer from 'multer';
import storage from '../config/multerConfig.js';
import transporter from "../config/nodeMailer.js";

const router = express.Router();

const upload = multer({ storage })

router.get('/api/user', (req, res) => {
    res.send('aca va a estar listado el usuario');
})

router.get('/api/logout',  async (req, res, next) => {
    req.session.destroy(function (err) {
        res.send('se deslogeo'); //Inside a callback… bulletproof!
      });
})

router.post('/api/signup',upload.single("file"), async (req, res, next) => {
    const data = {...req.body, avatar: req.file.filename}
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

export {router as UserRouter}
