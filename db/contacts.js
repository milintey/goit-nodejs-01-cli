const fs = require('fs').promises;
const path = require('path');
const { uid } = require('uid');

const contactsPath = path.resolve('./db/contacts.json');

async function listContacts() {
  const contactsList = await fs.readFile(contactsPath);
  const parceContactsList = JSON.parse(contactsList);
  return parceContactsList;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const getContact = contacts.find(contact => contact.id === contactId);
  return getContact;
}

async function removeContact(contactId) {
  const contactsList = await listContacts();
  const deleteContact = contactsList.find(cont => cont.id === contactId);
  const filterContacts = contactsList.filter(cont => cont.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(filterContacts));

  return deleteContact;
}

async function addContact(name, email, phone) {
  const id = uid();
  const contact = {id, name, email, phone};
  const contactsList = await listContacts();
  contactsList.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList));

  return contact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}