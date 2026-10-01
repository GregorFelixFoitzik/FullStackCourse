import { useState, useEffect } from 'react'
import personService from '../services/persons'

const usePhonebook = () => {
    const [phonebook, setPhonebook] = useState([])

    useEffect(() => {
        personService
            .getAll()
            .then(response => setPhonebook(response.data))
    }, [])
    
    const addPerson = (event) => {
        event.preventDefault()
        const form = new FormData(event.currentTarget)
        const newPerson = {
            name: form.get('name'),
            number: form.get('number'),
        }
        if (phonebook.some(person => person.name === newPerson.name)) {
            const existingPersonId = phonebook.find(person => person.name === newPerson.name).id
            return updatePerson(existingPersonId, newPerson)
        }
        personService
            .create(newPerson)
            .then(response => {
                setPhonebook(phonebook.concat(response.data))
            })    
    }

    const removePerson = (id) => {
        if (window.confirm(`Delete ${phonebook.find(person => person.id === id).name}?`)) { 
        personService
            .remove(id)
            .then(response => {
            setPhonebook(phonebook.filter(person => person.id !== id))
            })
        }
    }

    const updatePerson = (id, newObject) => {
        console.log('inside updatePerson')
        if (window.confirm(`${newObject.name} is already in the phonebook, replace the old number with a new one?`)) {
            personService
                .update(id, newObject)
                .then(response => {
                setPhonebook(phonebook.map(person => person.id !== id ? person : response.data))
                })
        }
    }

    return {
        phonebook,
        addPerson,
        removePerson,
        updatePerson,
    }
}

export default usePhonebook