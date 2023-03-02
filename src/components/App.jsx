import { useSelector } from 'react-redux';
import { getItem } from 'redux/contacts-slice';

import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

import css from './App.module.css';

const App = () => {
  const contacts = useSelector(getItem);
  return (
    <div className={css.Box}>
      <h1>Phonebook</h1>
      <ContactForm />

      <div className={css.ContactsBox}>
        <h2>Contacts</h2>

        {contacts.length > 0 && <Filter />}

        <ContactList />
        {contacts.length === 0 && (
          <p className={css.notificationMessage}>
            There are no contacts in your phonebook
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
