import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ContactForm } from "../components/ContactForm";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const EditContact = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    // Estado para controlar si estamos cargando contactos
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const res = await fetch(
                    "https://playground.4geeks.com/contact/agendas/alexestruch/contacts"
                );
                const data = await res.json();
                dispatch({ type: "set_contacts", payload: data.contacts });
            } catch (error) {
                console.error("Error fetching contacts:", error);
            }
        };

        // Si no hay contactos, los cargamos
        if (!store.contacts || store.contacts.length === 0) {
            fetchContacts().then(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [store.contacts, dispatch]);

    useEffect(() => {
        if (!loading) {
            const contact = store.contacts.find((c) => c.id === Number(id));
            if (contact) {
                setFormData({
                    name: contact.name,
                    email: contact.email,
                    phone: contact.phone,
                    address: contact.address,
                });
            } else {
                alert("Contact not found");
                navigate("/");
            }
        }
    }, [loading, id, store.contacts, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`https://playground.4geeks.com/contact/agendas/alexestruch/contacts/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...formData,
                agenda_slug: "alexestruch",
            }),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Error updating contact");
                return res.json();
            })
            .then((data) => {
                dispatch({
                    type: "update_contact",
                    payload: data,
                });
                navigate("/");
            })
            .catch((err) => console.error("Error updating:", err));
    };

    if (loading) return <p>Loading contact data...</p>;

    return (
        <div className="container mt-5">
            <h2>Edit Contact</h2>
            <ContactForm
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                buttonLabel="Update Contact"
            />
        </div>
    );
};