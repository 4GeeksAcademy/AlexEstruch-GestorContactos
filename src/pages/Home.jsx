import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	return (
		<div className="container mt-5">
			{store.contacts && store.contacts.length > 0 ? (
				<div className="row">
					{store.contacts.map((contact) => (
						<div key={contact.id} className="col-md-4 mb-3">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">{contact.full_name}</h5>
									<p className="card-text">Email: {contact.email}</p>
									<p className="card-text">Phone: {contact.phone}</p>
									<p className="card-text">Address: {contact.address}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			) : (
				<p>No contacts found.</p>
			)}
		</div>
	);
}; 