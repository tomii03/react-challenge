import React from "react";
import PropTypes from "prop-types";
import "../../styles/popUp.scss";

const PokePopUp = ({
  isOpen,
  onClose,
  pokemon,
  customData,
  setIsModalOpen,
}) => {
  if (!isOpen) return null;

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={handleCloseModal}>
          Cerrar
        </button>
        <img
          src={customData.image}
          alt={pokemon.name}
          className="modal-image"
        />
        <h2 className="name">{pokemon.name || pokemon.pokemon_name}</h2>
        75%
        <div class="progress-bar-container">
          <div class="progress-bar" id="progressBar">
            Poder...
          </div>
        </div>
        <div className="modal-description">
          <p>{customData.description}</p>
        </div>
      </div>
    </div>
  );
};

PokePopUp.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  pokemon: PropTypes.object.isRequired,
  customData: PropTypes.object.isRequired,
};

export default PokePopUp;
