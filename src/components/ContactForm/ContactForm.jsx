import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddContact } from 'redux/contacts/contacts-operations';
import { getAllContacts } from 'redux/contacts/contacts-selectors';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};

const ContactForm = () => {
  const [{ name, number }, setState] = useState({ ...INITIAL_STATE });
  const contacts = useSelector(getAllContacts);
  const dispatch = useDispatch();

  function onChange(e) {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    const newContact = {
      name,
      number,
    };

    dispatch(fetchAddContact({ name, number }));

    if (contacts.some(contact => contact.name === newContact.name)) {
      console.log(contacts.name);
      setState({ name, number });
    } else {
      setState({ ...INITIAL_STATE });
    }
  }

  const labelId = nanoid();
  return (
    <form className={css.addForm} onSubmit={onSubmit}>
      <label htmlFor={labelId}>Name</label>
      <input
        className={css.addInput}
        type="text"
        name="name"
        value={name}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        id={labelId}
        onChange={onChange}
      />
      <label htmlFor={labelId}>Phone</label>
      <input
        className={css.addInput}
        type="tel"
        name="number"
        value={number}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        id={labelId}
        onChange={onChange}
      />
      <button className={css.addButton}>Add contact</button>
    </form>
  );
};

export default ContactForm;
