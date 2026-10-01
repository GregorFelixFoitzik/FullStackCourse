export const DisplayForm = ({form, addPerson, handleNewPhonebookEntry}) => {
  return <div>
    <form onSubmit={addPerson}>
      <div>name: <input name='name' value={form.name} onChange={handleNewPhonebookEntry} /></div>
      <div>number: <input name='number' value={form.number} onChange={handleNewPhonebookEntry} /></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </div>
}

export const DisplayPhonebook = ({phonebook, filterString, removePerson}) => {
  const filteredPhonebooks = phonebook.filter(
      person => person.name.toLowerCase().includes(filterString.toLowerCase())
  )

  return <div>
    {filteredPhonebooks.map((person, id) => (<DisplayPerson key={id} person={person} removePerson={removePerson}/>))}
  </div>
}

const DisplayPerson = ({person, removePerson}) => {
  return <div>
    <p>{person.name}: {person.number} {' '} <button onClick={() => removePerson(person.id)}>delete</button>
    </p>
  </div>
}

export const DisplayFilter = ({filterString, handleFilterPhonebook}) => {
  return <div>
    filter shown with: <input name='filterString' value={filterString} onChange={handleFilterPhonebook}/>
  </div>
}

