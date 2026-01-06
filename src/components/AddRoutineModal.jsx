import { useState } from 'react';
import './AddRoutineModal.css';

function AddRoutineModal({ isOpen, onClose, onSave, editData = null }) {
  const [formData, setFormData] = useState(editData || {
    name: '',
    day: '',
    exercises: [{ name: '', sets: '', reps: '' }]
  });

  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
            <label>Nombre de la Rutina</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej: Día de Pecho"
              required
            />
          </div>

          <div className="form-group">
            <label>Día de la Semana</label>
            <select name="day" value={formData.day} onChange={handleChange} required>
              <option value="">Seleccionar día</option>
              {days.map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>

          <div className="exercises-section">
            <div className="exercises-header">
              <h3>Ejercicios</h3>
              <button type="button" onClick={addExercise} className="add-exercise-btn">
                + Agregar Ejercicio
              </button>
            </div>

            {formData.exercises.map((exercise, index) => (
              <div key={index} className="exercise-card">
                <div className="exercise-header">
                  <span className="exercise-number">#{index + 1}</span>
                  {formData.exercises.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeExercise(index)}
                      className="remove-exercise-btn"
                    >
                      🗑️
                    </button>
                  )}
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    value={exercise.name}
                    onChange={(e) => handleExerciseChange(index, 'name', e.target.value)}
                    placeholder="Nombre del ejercicio"
                    required
                  />
                </div>

                <div className="exercise-stats">
                  <div className="stat-input">
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

                  <div className="stat-input">
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
            ))}
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
