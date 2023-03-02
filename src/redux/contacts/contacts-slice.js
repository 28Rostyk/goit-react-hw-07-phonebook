import { createSlice } from '@reduxjs/toolkit';

import {
  fetchAllContacts,
  fetchAddContact,
  fetchDeleteContact,
} from './contacts-operations';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchAllContacts.pending, store => {
        store.loading = true;
      })
      .addCase(fetchAllContacts.fulfilled, (store, { payload }) => {
        store.loading = false;
        store.items = payload;
      })
      .addCase(fetchAllContacts.rejected, (store, { payload }) => {
        store.loading = false;
        store.error = payload;
      })
      .addCase(fetchAddContact.pending, store => {
        store.loading = true;
      })
      .addCase(fetchAddContact.fulfilled, (store, { payload }) => {
        store.loading = false;
        store.items.push(payload);
      })
      .addCase(fetchAddContact.rejected, (store, { payload }) => {
        store.loading = false;
        store.error = payload;
      })
      .addCase(fetchDeleteContact.pending, store => {
        store.loading = true;
      })
      .addCase(fetchDeleteContact.fulfilled, (store, { payload }) => {
        store.loading = false;
        const index = store.items.findIndex(item => item.id === payload);
        store.items.splice(index, 1);
      })
      .addCase(fetchDeleteContact.rejected, (store, { payload }) => {
        store.loading = false;
        store.error = payload;
      });
  },
});

export default contactsSlice.reducer;

// Slice
// const contacts = createSlice({
//   name: 'contacts:',
//   initialState: {
//     item: contactsList,
//     filter: '',
//   },
//   reducers: {
//     addContact(state, action) {
//       state.item = [...state.item, action.payload];
//     },
//     deleteContact(state, action) {
//       state.item = state.item.filter(x => x.id !== action.payload);
//     },
//     filterValue(state, action) {
//       state.filter = action.payload;
//     },
//   },
// });

// const persistConfig = {
//   key: 'contacts-list',
//   storage,
//   whitelist: ['item'],
// };

// export const contactsReducer = persistReducer(persistConfig, contacts.reducer);
// export const { addContact, deleteContact, filterValue } = contacts.actions;

// // Select

// export const getItem = state => state.contacts.item;
// export const getFilter = state => state.contacts.filter;
