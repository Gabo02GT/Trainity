import './ConfirmDialog.css';

function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel, type = 'warning' }) {
  if (!isOpen) return null;

  return (
    <div className="confirm-overlay">
      <div className="confirm-dialog">
        <div className={`confirm-icon ${type}`}>
          {type === 'warning' ? '⚠️' : type === 'danger' ? '🗑️' : 'ℹ️'}
        </div>
        <h3 className="confirm-title">{title}</h3>
        <p className="confirm-message">{message}</p>
        <div className="confirm-buttons">
          <button onClick={onCancel} className="confirm-btn cancel">
            Cancelar
          </button>
          <button onClick={onConfirm} className={`confirm-btn ${type}`}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
