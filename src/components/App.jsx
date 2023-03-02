import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

import { fetchAllContacts } from 'redux/contacts/contacts-operations';
import { getAllContacts } from '../redux/contacts/contacts-selectors';
import css from './App.module.css';

const App = () => {
  const dispatch = useDispatch();
  const allContacts = useSelector(getAllContacts);

  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch]);

  return (
    <div className={css.Box}>
      <h1>Phonebook</h1>
      <ContactForm />

      <div className={css.ContactsBox}>
        <h2>Contacts</h2>

        {allContacts.length > 0 && <Filter />}

        <ContactList />
        {allContacts.length === 0 && (
          <p className={css.notificationMessage}>
            There are no contacts in your phonebook
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
