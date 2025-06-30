import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState } from "react";
import { ContactForm } from "../components/ContactForm";

export const AddContact = () => {
  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const [contact, setContact] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: ""
  });

  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!contact.fullName.trim() || !contact.email.trim() || !contact.phone.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    const newContact = {
      name: contact.fullName,  // usa 'full_name' para que coincida con ContactCard
      email: contact.email,
      phone: contact.phone,
      address: contact.address,
      agenda_slug: "alexestruch"
    };

    console.log("Sending new contact:", JSON.stringify(newContact));

    try {
      const res = await fetch("https://playground.4geeks.com/contact/agendas/alexestruch/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newContact)
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("API error response:", errorData);
        throw new Error(`Failed to create contact: ${JSON.stringify(errorData)}`);
      }

      // Nuevo contacto creado
      const createdContact = await res.json();

      // Ahora recargamos la lista completa
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
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        buttonLabel="Save Contact"
      />
    </div>
  );
};