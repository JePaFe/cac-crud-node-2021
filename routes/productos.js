const express = require('express')
const router = express.Router()

const { body } = require('express-validator')

const controller = require('../controllers/productos')

// Update
router.get('/productos/:nro/edit', controller.edit)
router.put('/productos/update', [
    body('name', 'El nombre del producto tiene que tener 3 carateres como minimo')
        .isLength(3).trim().escape(),
    body('descripcion').escape()
], controller.update)

// Delete
router.delete('/productos/:nro/delete', controller.destroy)

// Create
router.get('/productos/create', controller.create)
router.post('/productos/store', [
    body('name', 'El nombre del producto tiene que tener 3 carateres como minimo')
        .isLength(3).trim().escape(),
    body('descripcion').escape()
], controller.store)

// Read
router.get('/productos', controller.index)
router.get('/productos/:nro', controller.show)

module.exports = router