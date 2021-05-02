const fs = require('fs').promises;
const path = require('path');
const { nanoid } = require('nanoid')

const contactsPath = path.join('db','contacts.json');

// the function reads data from the file that is located on "contactsPath" 
// and prints a list of contacts to the console
function listContacts() {
  fs.readFile(contactsPath, 'utf-8')
    .then((data) => console.table(JSON.parse(data)))
    .catch((err)=>console.log(err.message))
};

// the function reads data from the file that is located on "contactsPath" 
// and prints one contact with "contactId" to the console
function getContactById(contactId) {
  fs.readFile(contactsPath, 'utf-8')
    .then((data) => {
      const contacts = JSON.parse(data);
      console.table(contacts.filter(item => item.id === contactId))
    })
    .catch((err)=>console.log(err.message))
};


// the function deletes contact with "contactId"
// from the file that is located on "contactsPath"
function removeContact(contactId) {
   fs.readFile(contactsPath, 'utf-8')
    .then((data) => {
      const contacts = JSON.parse(data);
      const newContactsList = contacts.filter(item => item.id !== contactId);
      fs.writeFile(contactsPath, JSON.stringify(newContactsList))
        .then(() => console.log(`contact ${contactId} was successfully removed`))
        .catch((err)=>console.log(err.message));
    })
    .catch((err)=>console.log(err.message))
};

// the function add contact to the file that is located on "contactsPath"
function addContact(name, email, phone) {
  fs.readFile(contactsPath, 'utf-8')
    .then((data) => {
      const contacts = JSON.parse(data);
      const newContact={id: nanoid(5), name, email, phone}
      const newContactsList = [...contacts, newContact];
      fs.writeFile(contactsPath, JSON.stringify(newContactsList))
        .then(() => console.log(`contact ${name} was successfully added`))
        .catch((err)=>console.log(err.message));
    })
    .catch((err)=>console.log(err.message))
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
}