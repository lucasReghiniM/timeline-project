import React from "react";
import ReactDOM from "react-dom";
import "../styles/modal.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, start: string, end: string) => void;
}

const AddEventModal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const nameInput = form.elements.namedItem("name") as HTMLInputElement;
    const startInput = form.elements.namedItem("start") as HTMLInputElement;
    const endInput = form.elements.namedItem("end") as HTMLInputElement;

    const name = nameInput.value;
    const start = startInput.value;
    const end = endInput.value;

    onSubmit(name, start, end);
    form.reset();
    onClose();
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Add New Event</h3>
        <form onSubmit={handleFormSubmit}>
          <input name="name" placeholder="Event Name" required />
          <input
            name="start"
            type="date"
            min="2021-01-01"
            max="2021-12-31"
            required
          />
          <input
            name="end"
            type="date"
            min="2021-01-01"
            max="2021-12-31"
            required
          />
          <div className="modal-buttons">
            <button type="submit">Add Event</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default AddEventModal;
