import { useState } from 'react';
import "./App.css";
import contactsData from "./contacts.json";


function App() {
  const [contacts, setContacts] = useState(contactsData.slice(0, 5))
  const remainingContacts = contactsData.slice(5)

  const addRandomContact = () => {
    if (remainingContacts.length > 0) {
      const randomIndex = Math.floor(Math.random() * remainingContacts.length)

      const randomContact = remainingContacts[randomIndex]
      setContacts([...contacts, randomContact])

      remainingContacts.splice(randomIndex, 1)
    } else {
      alert ('no contacts to add')
    }
  }

  const sortByName = () => {
    const sortedByName = [...contacts].sort((a, b) => a.name.localeCompare(b.name)
    )
    setContacts(sortedByName)
  }

  const sortByPopularity = () => {
    const sortedByPopularity = [...contacts].sort((a, b) => b.popularity - a.popularity
    )
    setContacts(sortedByPopularity)
  }

  const deleteContact = contactId => {
    const filteredContacts =  [...contacts].filter ( contact => {
     return contact.id !== contactId
    })
    setContacts(filteredContacts)
  }

  return (
    <section>
      <h1>IronContacts</h1>
      <div className="buttons">
        <button className="button" onClick = {addRandomContact}>Add Random Contact</button>
        <button className="button" onClick = {sortByName}>Sort By Name</button>
        <button className="button" onClick = {sortByPopularity}>Sort By Popularity</button>
      </div>
      
    <table>
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won Oscar</th>
          <th>Won Emmy</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((contact) => (
          <tr key={contact.id}>
            <td>
              <img src={contact.pictureUrl} alt={contact.name} />
            </td>
            <td>{contact.name}</td>
            <td>{contact.popularity}</td>
            {contact.wonOscar ? <td>🏆</td> : <td></td>}
            {contact.wonEmmy? <td>🏆</td> : <td></td>}
            <td><button onClick = {() => deleteContact(contact.id)}>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
    </section>
  );
}

export default App;