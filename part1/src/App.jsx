import { useState, useEffect } from 'react'

import usePhonebook from './hooks/usePhonebook'
import { DisplayForm, DisplayPhonebook, DisplayFilter } from './components/Phonebook'

const App = () => {
  const { phonebook, addPerson, removePerson, updatePerson } = usePhonebook()
  const [form, setForm] = useState({
    name: '',
    number: '',
  })
  const [filterString, setFilterString] = useState('')

  const handleNewPhonebookEntry = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    setForm({
      ...form,
      [name]:value,
    })
  }
  
  const handleFilterPhonebook = (event) => {
    event.preventDefault()
    setFilterString(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <DisplayFilter filterString={filterString} handleFilterPhonebook={handleFilterPhonebook} />

      <h2>add a new</h2>
      <DisplayForm form={form} addPerson={addPerson} handleNewPhonebookEntry={handleNewPhonebookEntry} />
      
      <h2>Numbers</h2>
      <DisplayPhonebook 
        phonebook={phonebook} 
        filterString={filterString}
        removePerson={removePerson}
        />
    </div>
  )
}

export default App