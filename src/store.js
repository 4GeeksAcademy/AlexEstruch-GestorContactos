export const initialStore = () => {
  return {
    contacts: [],
    message: null,
  }
}

// Reductor que manejará las acciones de contactos
export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'set_contacts':
      return {
        ...store,
        contacts: action.payload
      };
    case 'add_contact':
      return {
        ...store,
        contacts: [...store.contacts, action.payload]
      };
    case 'delete_contact':
      return {
        ...store,
        contacts: store.contacts.filter(contact => contact.id !== action.payload)
      };
    // Aquí irán más acciones como 'add_contact', 'delete_contact', 'update_contact' más adelante

    default:
      throw Error('Unknown action.');
  }
}