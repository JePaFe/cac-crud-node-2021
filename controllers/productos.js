const { validationResult } = require('express-validator')

const connection = require('../db')

const index = (req, res) => {
    // req.session.user_id = 1
    // console.log(req.session)
    connection.query('SELECT * FROM productos', (error, results) => {
        if (error) {
            throw error
        }
    
        res.render('productos/index', { productos: results })
    })
}

const show = (req, res) => {
    // console.log(req.session.user_id)
    connection.query('SELECT * FROM productos WHERE id = ?', [ req.params.nro ], (error, results) => {
        if (error) {
            throw error
        }

        if (results.length > 0) {
            res.render('productos/show', { producto: results[0] })
        } else {
            res.send('No se encontro el producto')
        }
    })
}

const create = (req, res) => {
    res.render('productos/create', { values: {} })
}

const store = (req, res) => {
    // console.log(req.body)
    // res.send('Procesando...')

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.render('productos/create', { values: req.body, errors: errors.array() })
    } else {

        connection.query('INSERT INTO productos SET ?', 
            { name: req.body.name, descripcion: req.body.descripcion }, (error) => {
            if (error) {
                throw error
            }

            res.redirect('/productos')
        })
    }
}

const edit = (req, res) => {
    connection.query('SELECT * FROM productos WHERE id = ?', [ req.params.nro ], (error, results) => {
        if (error) {
            throw error
        }

        if (results.length > 0) {
            res.render('productos/edit', { values: {}, producto: results[0] })
        } else {
            res.send('No se encontro el producto')
        }
    })
}

const update = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.render('productos/edit', { values: req.body, producto: {}, errors: errors.array() })
    } else {
        connection.query('UPDATE productos SET ? WHERE id = ?', [ { name: req.body.name, descripcion: req.body.descripcion }, req.body.id ], (error) => {
            if (error) {
                throw error
            }

            res.redirect('/productos')
        })
    }
}

const destroy = (req, res) => {
    connection.query('DELETE FROM productos WHERE id = ?', [ req.params.nro ], (error) => {
        if (error) {
            throw error
        }

        res.redirect('/productos')
    })
}

module.exports = {
    index,
    show,
    create,
    store,
    edit,
    update,
    destroy
}