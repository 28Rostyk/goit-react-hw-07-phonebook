import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const contactsList = [];

// Slice
const contacts = createSlice({
  name: 'contacts:',
  initialState: {
    item: contactsList,
    filter: '',
  },
  reducers: {
    addContact(state, action) {
      state.item = [...state.item, action.payload];
    },
    deleteContact(state, action) {
      state.item = state.item.filter(x => x.id !== action.payload);
    },
    filterValue(state, action) {
      state.filter = action.payload;
    },
  },
});

const persistConfig = {
  key: 'contacts-list',
  storage,
  whitelist: ['item'],
};

export const contactsReducer = persistReducer(persistConfig, contacts.reducer);
export const { addContact, deleteContact, filterValue } = contacts.actions;

// Select

export const getItem = state => state.contacts.item;
export const getFilter = state => state.contacts.filter;
