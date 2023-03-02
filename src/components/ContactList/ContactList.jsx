import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFilteredContacts } from 'redux/contacts/contacts-selectors';
import { getFilter } from 'redux/filter/filter-selectors';
import { fetchDeleteContact } from 'redux/contacts/contacts-operations';
import css from './ContactList.module.css';

const ContactList = () => {
  const filteredContacts = useSelector(getFilteredContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  function contactsFillet() {
    if (filter === '') {
      return false;
    }
    return filteredContacts.filter(x => x.name.toLowerCase().includes(filter));
  }

  const fillter = contactsFillet();
  const list = fillter ? fillter : filteredContacts;

  return (
    <ul className={css.contactList}>
      {list.map(({ name, id, number }) => {
        return (
          <li key={id} className={css.contactItem}>
            <span className={css.contactName}>{name}:</span>
            <span className={css.contactNumber}>{number}</span>
            <button
              className={css.delButton}
              onClick={() => dispatch(fetchDeleteContact(id))}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};
export default ContactList;
