import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { ContactCard } from "../components/ContactCard";

export const Home = () => {
	const { store, dispatch } = useGlobalReducer();

	useEffect(() => {
		fetch("https://playground.4geeks.com/contact/agendas/alexestruch/contacts")
			.then((res) => res.json())
			.then((data) => {
				console.log("API response:", data);
				dispatch({ type: "set_contacts", payload: data.contacts });
			})
			.catch((err) => console.error("Error fetching contacts:", err));
	}, []);

	const handleDelete = async (id) => {
		const confirmed = window.confirm("Are you sure you want to delete this contact?");
		if (!confirmed) return;

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

	return (
		<div className="container mt-5">
			{store.contacts && store.contacts.length > 0 ? (
				<div className="row">
					{store.contacts.map((contact) => (
						<div key={contact.id} className="col-12 mb-3">
							<ContactCard contact={contact} onDelete={handleDelete}/>
						</div>
					))}
				</div>
			) : (
				<p>No contacts found.</p>
			)}
		</div>
	);
};