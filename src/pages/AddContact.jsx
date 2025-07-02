import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState } from "react";
import { ContactForm } from "../components/ContactForm";

export const AddContact = () => {
  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  //manejar cambios en los inputs del formulario
  //e.target.name actualizar el campo correspondiente de contact
  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value
    });
  };


  //funcion que envia el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    //.trim para quitar los espacios del principio y final, este if valida que no esten vacios los 3 campos
    if (!contact.name.trim() || !contact.email.trim() || !contact.phone.trim()) {
      alert("Please fill in all required fields.");
      return;
    }
    //creo un objeto con los datos del formulario por la API
    const newContact = {
      name: contact.name,  // usa 'full_name' para que coincida con ContactCard
      email: contact.email,
      phone: contact.phone,
      address: contact.address,
      agenda_slug: "alexestruch"
    };

    console.log("Sending new contact:", JSON.stringify(newContact));
    //solicitud POST a la API con el fetch para crear un nuevo contacto
    try {
      const res = await fetch("https://playground.4geeks.com/contact/agendas/alexestruch/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newContact)
      });
      
      //mostrar en consola el error si no es posible crear el contacto
      if (!res.ok) {
        const errorData = await res.json();
        console.error("API error response:", errorData);
        throw new Error(`Failed to create contact: ${JSON.stringify(errorData)}`);
      }

      // Nuevo contacto creado, convierte la respuesta del POST en JSON y lo guarda
      const createdContact = await res.json();

      // Ahora recargamos la lista completa con funcion GET para obtener la lista completa actualizada
      const resList = await fetch("https://playground.4geeks.com/contact/agendas/alexestruch/contacts");
      if (!resList.ok) throw new Error("Failed to fetch updated contacts list");

      const updatedList = await resList.json();

      // Actualizamos el store con la lista completa
      dispatch({ type: "set_contacts", payload: updatedList.result });

      // Redirigimos a home
      navigate("/");
    } catch (err) {
      console.error("Error adding contact:", err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Contact</h2>
      <ContactForm
        formData={contact}
        onChange={handleChange}
        onSubmit={handleSubmit}
        buttonLabel="Save Contact"
      />
      <div className="mt-3">
        <Link to="/">
          or get back to Contacts
        </Link>
      </div>
    </div>
  );
};