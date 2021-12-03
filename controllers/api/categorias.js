const connection = require('../../db')

const index = (req, res) => {
    connection.query('SELECT * FROM categorias', (error, results) => {
        if (error) {
            res.sendStatus(500)
        }

        res.send(results)
    })
}

const show = (req, res) => {
    connection.query('SELECT * FROM categorias WHERE id = ?', [ req.params.id ], (error, results) => {
        if (error) {
            res.sendStatus(500)
        }

        if (results.length > 0) {
            res.send(results.shift()) // results[0]
        } else {
            res.sendStatus(404)
        }
    })
}

const store = (req, res) => {
    connection.query('INSERT INTO categorias SET ?', { nombre: req.body.nombre }, (error, results) => {
        if (error) {
            res.sendStatus(500)
        }

        res.send({ id: results.insertId, nombre: req.body.nombre })
    })
}

const update = (req, res) => {
    connection.query('UPDATE categorias SET ? WHERE id = ?', [ { nombre: req.body.nombre }, req.params.id ], (error, results) => {
        if (error) {
            res.sendStatus(500)
        }

        res.send({ id: req.params.id, nombre: req.body.nombre })
    })
}

const destroy = (req, res) => {
    connection.query('DELETE FROM categorias WHERE id = ?', [ req.params.id ], (error, results) => {
        if (error) {
            res.sendStatus(500)
        }

        res.send(results)
    })
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy
}