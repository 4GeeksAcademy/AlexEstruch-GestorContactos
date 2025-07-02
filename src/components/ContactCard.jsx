import { Link } from "react-router-dom";

//defino una imagen por defecto, si se quisiera modificar la foto habría que añadir una función
const imagenPorDefecto = "https://img.freepik.com/vector-premium/ilustracion-plana-vectorial-escala-grises-icono-perfil-usuario-avatar-persona-imagen-perfil-silueta-genero-neutral-apto-perfiles-redes-sociales-iconos-protectores-pantalla-como-plantillax9xa_719432-2210.jpg?semt=ais_hybrid&w=740";

export const ContactCard = ({ contact, onDelete }) => {
    return (
        <div className="card mb-3 shadow-sm">
            <div className="card-body d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                    <img
                        src={imagenPorDefecto}
                        alt="avatar"
                        className="h-100"
                        style={{
                            aspectRatio: "1 / 1", //imagen cuadrada
                            objectFit: "cover", //bien recortada
                            borderRadius: "50%", //estilo redondo
                            maxHeight: "150px", // Límite máximo para que no se descontrole
                        }}
                    />
                    <div className="flex-grow-1">
                        <h4 className="fw-bold mb-2">{contact.name}</h4>
                        <p className="mb-1"><i className="fas fa-map-marker-alt me-2"></i>{contact.address}</p>
                        <p className="mb-1"><i className="fas fa-phone me-2"></i>{contact.phone}</p>
                        <p className="mb-1"><i className="fas fa-envelope me-2"></i>{contact.email}</p>
                    </div>
                </div>

                <div className="d-flex align-items-center gap-2 ms-3">
                    <Link
                        to={`/edit-contact/${contact.id}`}
                        className="btn btn-outline-secondary btn-sm"
                    >
                        <i className="fas fa-pencil-alt"></i>
                    </Link>
                    <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => onDelete(contact.id)}
                    >
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};