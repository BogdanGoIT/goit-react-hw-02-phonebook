import { Component } from "react";
import { nanoid } from 'nanoid';
import { ContactForm } from "./ContactForm/ContactForm";
import {ContactList} from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";

export class App extends Component  {
  state = {
    contacts: [],
    filter: '',
  }

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }))
  }

  addContacts = (data) => {
    console.log(data);

    const { name, number } = data;

    const namesArray = this.state.contacts.map(contact => contact.name);

    console.log(namesArray);

    if (namesArray.includes(name)) {
      alert("Rosie Simpson is already in contacts");
    }
    else {
      const contacts = {
        id: nanoid(),
        name,
        number,
      };
      
      this.setState(prevState => ({
        contacts: [contacts, ...prevState.contacts],
      }))
    }
   

  }

  changeFilter = e => {
    this.setState({filter: e.currentTarget.value})
  }

  getFilterdContacts = () => {
    const { contacts, filter } = this.state;

    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );

  }


  render() {
    const { filter } = this.state;

    const filteredContacts = this.getFilterdContacts();

    return (
      <div>
        
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContacts} />
        
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList contacts={filteredContacts} onDeleteContact={this.deleteContact} />

      </div>
    )
  }

  
};
