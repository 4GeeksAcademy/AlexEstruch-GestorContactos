import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ContactForm } from "../components/ContactForm";

export const EditContact = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        fetch(`https://playground.4geeks.com/contact/agendas/alexestruch/contacts/${id}`)
            .then(res => res.json())
            .then(data => {
                setFormData({
                    name: data.result.name,
                    email: data.result.email,
                    phone: data.result.phone,
                    address: data.result.address
                });
            })
            .catch(err => console.error("Error fetching contact:", err));
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`https://playground.4geeks.com/contact/agendas/alexestruch/contacts/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...formData,
                agenda_slug: "alexestruch"
            })
        })
            .then(res => {
                if (!res.ok) throw new Error("Error updating contact");
                return res.json();
            })
            .then(() => {
                navigate("/");
            })
            .catch(err => console.error("Error updating:", err));
    };

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