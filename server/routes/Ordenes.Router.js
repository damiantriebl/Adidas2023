import express from "express";
import OrdenesNormalizer from "../negocio/OrdenesNormalizer.js";
import transporter from "../config/nodeMailer.js";
import auth from '../middlewares/auth.js'

const router = express.Router();

router.get("/api/ordenes/:id",  async (req, res) => {
     const ordenes = await new OrdenesNormalizer().getAll(req.params.id);
    if (!ordenes?.error) {
        res.json({
        ok: true,
        mensaje: "la orden se genero correctamente",
        ordenes,
        });
    } else {
        res.json({
        ok: false,
        mensaje: "El post no se pudo editar ",
        error: ordenes?.error,
        });
    } 
});
router.post("/api/ordenes", auth,  async (req, res) => {
    const ordenes = await new OrdenesNormalizer().guardarOrden(req.body);
   
  if (!ordenes?.error) {
    const html = ordenes?.data?.orden.map((orden)=>`<h4>${orden.producto}</h4>`)
    const data = {
      from: "Adidas 2022", // sender address,
      to: ordenes?.data?.usuario?.email,
      subject: "Adidas: se hizo tu pedido de compra",
      html: `<body><h1>ordenes:</h1><br/>${html}</body>`,
    };
    const mail = await transporter.sendMail(data);
    res.json({
      ok: true,
      mensaje: "la Orden se edito correctamente",
      id: ordenes,
    });
  } else {
    res.json({
      ok: false,
      mensaje: "El post no se pudo editar ",
      error: ordenes?.error,
    });
  }
});

export { router as OrdenesRouter };
