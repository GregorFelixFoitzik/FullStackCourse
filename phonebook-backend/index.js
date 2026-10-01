const express = require('express')
const crypto = require('crypto')
const morgan = require('morgan')
const db = require('./db.json')

const app = express()
const cors = require('cors')

app.use(express.static('dist'))
app.use(express.json())
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url => :status | :res[content-length] | :response-time ms | :body'))
app.use(cors())

// GET REQUESTS
app.get('/api/persons', (req, res) => {
    res.json(db.persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = db.persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.get('/info', (req, res) => {
    res.send('<p>Phonebook has info for ' + db.persons.length + ' people</p><p>' + new Date() + '</p>')
})


// ADDING NEW PERSONS
const generateId = () => {
  let id
  do {
    id = crypto.randomBytes(16).toString('hex')
  } while (db.persons.some(p => p.id === id))
  return id
}

app.post('/api/persons', (req, res) => {
    const { name, number } = req.body ?? {}
    if (!name || !number) {
        return res.status(400).json({ error: 'name or number is missing' })
    }

    if (db.persons.some(p => p.name === name)) {
        return res.status(400).json({ error: 'name must be unique' })
    }

    const cryptoID = generateId()
    const newPerson = { id: cryptoID, name: name, number:number }
    db.persons.push(newPerson)
    res.json(newPerson)
})


// DELETING PERSONS
app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = db.persons.find(person => person.id === id)
    if (person) {
        db.persons = db.persons.filter(person => person.id !== id)
        res.status(204).end()
    } else {
        res.status(404).end()
    }
})


// MISCELLANEOUS
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
