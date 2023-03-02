import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterValue, getItem, addContact } from 'redux/contacts-slice';
import css from './ContactForm.module.css';
import { nanoid } from 'nanoid';

const INITIAL_STATE = {
  name: '',
  number: '',
};

const ContactForm = () => {
  const [{ name, number }, setState] = useState(INITIAL_STATE);
  const dispatch = useDispatch();
  const contacts = useSelector(getItem);

  function onChange(eve) {
    const { name, value } = eve.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  }

  function onSubmit(eve) {
    eve.preventDefault();
    const newContact = {
      id: nanoid(5),
      name,
      number,
    };

    if (contacts.some(x => x.name === newContact.name)) {
      alert(`${newContact.name} is already is contacts`);
      return;
    }

    dispatch(addContact(newContact));
    dispatch(filterValue(''));

    setState({ ...INITIAL_STATE });
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
