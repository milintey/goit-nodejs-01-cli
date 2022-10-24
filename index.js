const {listContacts, getContactById, removeContact, addContact} = require('./db/contacts');

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();


async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
        const contactsList = await listContacts();
        console.table(contactsList);
      break;

    case "get":
        const getContact = await getContactById(id);
        console.log(getContact);
      break;

    case "add":
        const contact = await addContact(name, email, phone);
        console.log(contact);
      break;

    case "remove":
        const contacts = await removeContact(id);
        console.log(contacts);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);