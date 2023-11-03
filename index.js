const { Command } = require("commander");
const contactsOperation = require("./contacts");

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
      const contacts = await contactsOperation.listContacts();
      console.table(contacts);
      break;
    case "get":
      const contact = await contactsOperation.getContactById(id);
      if (!contact) {
        console.log(`Contact with id ${id} not found!`);
      } else {
        console.log(contact);
      }

      break;

    case "add":
      const addContact = await contactsOperation.addContact(name, email, phone);
      console.log("Add contact: ", addContact);
      break;

    case "remove":
      const removeContacts = await contactsOperation.removeContact(id);
      if (removeContacts) {
        console.log(`Remove contact: `, removeContacts);
      } else {
        console.log(`Contact with id:${id} not found!`);
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);