import express from 'express';
import carroNormalizer from '../negocio/carroNormalizer.js'

const router = express.Router();
router.get('/api/carro/:id', async (req, res) =>{
    const userId = req.params.id
    const todosCarritos = await new carroNormalizer().getAll(userId);
    if (!todosCarritos?.error){
        res.json({
            ok: true,
            mensaje: 'se leen todos los post correctamente',
            carro: todosCarritos
        })
    }else {
        res.json({
            ok: false,
            mensaje: 'fallo la lectura',
            error: todosCarritos.error,
        })
    }
});


router.post('/api/carro/:id/', async (req, res) => {
    const productoCarro = await  new carroNormalizer().guardarcarro(req.params.id, req.body);
    if (!productoCarro?.error){
        res.json({
            ok: true,
            mensaje: 'El Post se edito correctamente',
            id: productoCarro
        })
    }else {
        res.json({
            ok: false,
            mensaje: 'El post no se pudo editar ',
            error: productoCarro?.error,
        })
    }
})

 router.put('/api/carro/:id', async (req, res) => {
    const carritoCreado = await objCarrito.updateById(req.params.id, req.body);
    if (!carritoCreado?.error){
        res.json({
            ok: true,
            mensaje: 'El Post se edito correctamente',
            id: carritoCreado
        })
    }else {
        res.json({
            ok: false,
            mensaje: 'El post no se pudo editar ',
            error: carritoCreado?.error,
        })
    }
}) 

router.delete('/api/carro/:id', async (req, res) => {
    const carritoCreado = await new carroNormalizer().deleteByUserAndObject(req.params.id, req.body.idProducto);
    if (!carritoCreado?.error){
        res.json({
            ok: true,
            mensaje: 'El Post se borro correctamente',
            data: carritoCreado.data
        })
    }else {
        res.json({
            ok: false,
            mensaje: 'No se ejecuto el proceso',
            error: carritoCreado?.error,
        })
    }
})

export {router as CarritoRouter}