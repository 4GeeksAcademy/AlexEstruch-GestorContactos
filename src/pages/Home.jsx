import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { ContactCard } from "../components/ContactCard";

export const Home = () => {
	//accedo a store 
	const { store, dispatch } = useGlobalReducer();

	useEffect(() => {
		const agendaSlug = "alexestruch";

		const loadContacts = async () => {
			try {
				let res = await fetch(`https://playground.4geeks.com/contact/agendas/${agendaSlug}/contacts`);

				if (res.status === 404) {
					// Crear agenda porque no existe
					const createRes = await fetch("https://playground.4geeks.com/contact/agendas", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ agenda_slug: agendaSlug }),
					});

					if (!createRes.ok) throw new Error("Failed to create agenda");

					// Volver a intentar obtener contactos tras crear la agenda
					res = await fetch(`https://playground.4geeks.com/contact/agendas/${agendaSlug}/contacts`);
				}

				if (!res.ok) throw new Error("Failed to fetch contacts");

				const data = await res.json();
				console.log("API response:", data);
				dispatch({ type: "set_contacts", payload: data.contacts || [] });
			} catch (err) {
				console.error("Error fetching contacts:", err);
			}
		};

		loadContacts();
	}, [dispatch]);

	//funcion para eliminar un contacto y pide confirmación antes de borrar
	const handleDelete = async (id) => {
		const confirmed = window.confirm("Are you sure you want to delete this contact?");
		if (!confirmed) return;
		//metodo DELETE para eliminar con la ID del contacto
		try {
			const res = await fetch(`https://playground.4geeks.com/contact/agendas/alexestruch/contacts/${id}`, {
				method: "DELETE"
			});

			if (!res.ok) throw new Error("Failed to delete contact");

			// Actualizamos el store
			dispatch({ type: "delete_contact", payload: id });
		} catch (err) {
			console.error("Error deleting contact:", err);
		}
	};

	console.log("Contacts in store:", store.contacts);
	return (
		<div className="container mt-5">
			{store.contacts && store.contacts.length > 0 ? (
				<div className="row">
					{store.contacts.map((contact) => (
						<div key={contact.id} className="col-12 mb-3">
							<ContactCard contact={contact} onDelete={handleDelete} />
						</div>
					))}
				</div>
			) : (
				<p>No contacts found.</p>
			)}
		</div>
	);
};