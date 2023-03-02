import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFilter, getItem, deleteContact } from 'redux/contacts-slice';
import css from './ContactList.module.css';

const ContactList = () => {
  const contacts = useSelector(getItem);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  function contactsFillet() {
    if (filter === '') {
      return false;
    }

    return contacts.filter(x => x.name.toLowerCase().includes(filter));
  }

  const fillter = contactsFillet();

  const list = fillter ? fillter : contacts;
  return (
    <ul className={css.contactList}>
      {list.map(({ name, id, number }) => {
        return (
          <li key={id} className={css.contactItem}>
            <span className={css.contactName}>{name}:</span>
            <span className={css.contactNumber}>{number}</span>
            <button
              className={css.delButton}
              onClick={() => dispatch(deleteContact(id))}
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
