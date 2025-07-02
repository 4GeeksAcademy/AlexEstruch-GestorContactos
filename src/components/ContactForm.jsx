import React from "react";


//objeto con datos formulario, funcion manejar cambios input, funcion envia formulario, texto dentro del boton
export const ContactForm = ({ formData, onChange, onSubmit, buttonLabel }) => {
    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                name="name"
                className="form-control mb-3"
                placeholder="Name"
                value={formData.name || ""}
                onChange={onChange}
                required
            />
            <input
                type="text"
                name="address"
                className="form-control mb-3"
                placeholder="Address"
                value={formData.address || ""}
                onChange={onChange}
                required
            />
            <input
                type="email"
                name="email"
                className="form-control mb-3"
                placeholder="Email"
                value={formData.email || ""}
                onChange={onChange}
                required
            />
            <input
                type="text"
                name="phone"
                className="form-control mb-3"
                placeholder="Phone"
                value={formData.phone || ""}
                onChange={onChange}
                required
            />
            <button type="submit" className="btn btn-primary">
                {buttonLabel}
            </button>
        </form>
    );
};