import { useState } from 'react';
import './AddRoutineModal.css';

function AddRoutineModal({ isOpen, onClose, onSave, editData = null }) {
  const [formData, setFormData] = useState(editData || {
    name: '',
    day: '',
    exercises: [{ name: '', sets: '', reps: '' }]
  });

  const days = [
    { name: 'Lunes', emoji: '💪' },
    { name: 'Martes', emoji: '🔥' },
    { name: 'Miércoles', emoji: '⚡' },
    { name: 'Jueves', emoji: '💯' },
    { name: 'Viernes', emoji: '🎯' },
    { name: 'Sábado', emoji: '🏋️' },
    { name: 'Domingo', emoji: '🌟' }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDaySelect = (day) => {
    setFormData({ ...formData, day });
  };

  const handleExerciseChange = (index, field, value) => {
    const newExercises = [...formData.exercises];
    newExercises[index][field] = value;
    setFormData({ ...formData, exercises: newExercises });
  };

  const addExercise = () => {
    setFormData({
      ...formData,
      exercises: [...formData.exercises, { name: '', sets: '', reps: '' }]
    });
  };

  const removeExercise = (index) => {
    const newExercises = formData.exercises.filter((_, i) => i !== index);
    setFormData({ ...formData, exercises: newExercises });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editData ? 'Editar Rutina' : 'Nueva Rutina'}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="routine-form">
          <div className="form-group">
            <label className="form-label-main">
              <span className="label-icon">✏️</span>
              Nombre de la Rutina
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej: Pecho y Tríceps"
              className="input-main"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label-main">
              <span className="label-icon">📅</span>
              Selecciona el Día
            </label>
            <div className="days-grid">
              {days.map(({ name, emoji }) => (
                <button
                  key={name}
                  type="button"
                  className={`day-button ${formData.day === name ? 'selected' : ''}`}
                  onClick={() => handleDaySelect(name)}
                >
                  <span className="day-emoji">{emoji}</span>
                  <span className="day-name">{name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="exercises-section">
            <div className="exercises-header">
              <h3>
                <span className="header-icon">💪</span>
                Ejercicios
              </h3>
              <button type="button" onClick={addExercise} className="add-exercise-btn">
                <span>+</span> Agregar
              </button>
            </div>

            <div className="exercises-list-modal">
              {formData.exercises.map((exercise, index) => (
                <div key={index} className="exercise-card-modal">
                  <div className="exercise-header-modal">
                    <span className="exercise-badge">#{index + 1}</span>
                    {formData.exercises.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeExercise(index)}
                        className="remove-btn"
                        title="Eliminar ejercicio"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  <div className="exercise-inputs">
                    <div className="input-full">
                      <label>Nombre del Ejercicio</label>
                      <input
                        type="text"
                        value={exercise.name}
                        onChange={(e) => handleExerciseChange(index, 'name', e.target.value)}
                        placeholder="Ej: Press de Banca"
                        required
                      />
                    </div>

                    <div className="input-row">
                      <div className="input-half">
                        <label>Series</label>
                        <input
                          type="number"
                          value={exercise.sets}
                          onChange={(e) => handleExerciseChange(index, 'sets', e.target.value)}
                          placeholder="3"
                          required
                          min="1"
                        />
                      </div>

                      <div className="input-half">
                        <label>Repeticiones</label>
                        <input
                          type="number"
                          value={exercise.reps}
                          onChange={(e) => handleExerciseChange(index, 'reps', e.target.value)}
                          placeholder="12"
                          required
                          min="1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancelar
            </button>
            <button type="submit" className="btn-save">
              {editData ? 'Guardar Cambios' : 'Crear Rutina'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRoutineModal;
