import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container d-flex justify-content-between align-items-center">
				<h1 className="m-0">Lista de Contactos</h1>
				<div className="ml-auto">
					<Link to="/add-contact">
						<button className="btn btn-success">Add new contact</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};