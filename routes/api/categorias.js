const express = require('express')
const router = express.Router()

const controller = require('../../controllers/api/categorias')

// Read
router.get('/categorias', controller.index)
router.get('/categorias/:id', controller.show)

// Create
router.post('/categorias', controller.store)

// Update
router.put('/categorias/:id', controller.update)

// Delete
router.delete('/categorias/:id', controller.destroy)

module.exports = router