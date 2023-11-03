const path = require("path");
const fs = require("fs/promises");

const contactsPath = path.join(__dirname, "db", "contacts.json");


async function listContacts() {
  const json = await fs.readFile(contactsPath);
  const contacts = JSON.parse(json);
  return contacts;
}


async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact;
}


async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  const removeElement = contacts.splice(idx, 1);
  fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removeElement;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const addContact = { id: createId(contacts), name, email, phone };
  contacts.push(addContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts));
  return addContact;
}


function createId(contacts) {
  const listId = contacts.map((contact) => Number(contact.id));
  return (Math.max(...listId) + 1).toString();
}

module.exports = { listContacts, getContactById, removeContact, addContact };
