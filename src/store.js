//funcion que devuelve el estado inicial
export const initialStore = () => {
  return {
    contacts: [],
    message: null,
  }
}

// Reductor que manejará las acciones de contactos
export default function storeReducer(store, action = {}) {
  switch (action.type) {
    //accion que carga todos los contactos
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

    case "update_contact":
      return {
        ...store,
        contacts: store.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
      };

    default:
      throw Error('Unknown action.');
  }
}