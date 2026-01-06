import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../config/firebase';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import AddRoutineModal from '../components/AddRoutineModal';
import ConfirmDialog from '../components/ConfirmDialog';
import './Dashboard.css';

function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [routines, setRoutines] = useState([]);
  const [todayRoutine, setTodayRoutine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRoutine, setEditingRoutine] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, routine: null, step: 1 });

  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const today = days[new Date().getDay()];

  useEffect(() => {
    if (currentUser) {
      loadRoutines();
    }
  }, [currentUser]);

  const loadRoutines = async () => {
    try {
      const q = query(
        collection(db, 'routines'),
        where('userId', '==', currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const routinesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setRoutines(routinesData);
      const todaysRoutine = routinesData.find(r => r.day === today);
      setTodayRoutine(todaysRoutine || null);
    } catch (error) {
      console.error('Error al cargar rutinas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRoutine = async (routineData) => {
    try {
      if (editingRoutine) {
        // Actualizar rutina existente
        const routineRef = doc(db, 'routines', editingRoutine.id);
        await updateDoc(routineRef, {
          ...routineData,
          updatedAt: new Date()
        });
      } else {
        // Crear nueva rutina
        await addDoc(collection(db, 'routines'), {
          ...routineData,
          userId: currentUser.uid,
          createdAt: new Date()
        });
      }
      
      setShowAddModal(false);
      setEditingRoutine(null);
      loadRoutines();
    } catch (error) {
      console.error('Error al guardar rutina:', error);
      alert('Error al guardar la rutina. Intenta de nuevo.');
    }
  };

  const handleDeleteRoutine = async (routine) => {
    setConfirmDialog({ isOpen: true, routine, step: 1 });
  };

  const confirmDelete = () => {
    if (confirmDialog.step === 1) {
      setConfirmDialog({ ...confirmDialog, step: 2 });
    } else {
      executeDelete();
    }
  };

  const executeDelete = async () => {
    try {
      await deleteDoc(doc(db, 'routines', confirmDialog.routine.id));
      setConfirmDialog({ isOpen: false, routine: null, step: 1 });
      loadRoutines();
    } catch (error) {
      console.error('Error al eliminar rutina:', error);
      alert('Error al eliminar la rutina. Intenta de nuevo.');
    }
  };

  const handleEditRoutine = (routine) => {
    setConfirmDialog({ isOpen: true, routine, step: 1, action: 'edit' });
  };

  const confirmEdit = () => {
    if (confirmDialog.step === 1) {
      setConfirmDialog({ ...confirmDialog, step: 2 });
    } else {
      executeEdit();
    }
  };

  const executeEdit = () => {
    setEditingRoutine(confirmDialog.routine);
    setShowAddModal(true);
    setConfirmDialog({ isOpen: false, routine: null, step: 1 });
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-logo">
          <img src="/images/icon-192.png" alt="Trainity" />
        </div>
        <h1>Trainity</h1>
        <p className="user-name">
          👤 {currentUser?.displayName || currentUser?.email}
        </p>
        <p className="today-label">Hoy es {today}</p>
      </div>

      <div className="dashboard-content">
        {loading ? (
          <div className="loading">Cargando rutinas...</div>
        ) : (
          <>
            {todayRoutine ? (
              <div className="today-routine">
                <div className="routine-header">
                  <h2>🏋️ Rutina de Hoy</h2>
                  <div className="routine-actions">
                    <button 
                      onClick={() => handleEditRoutine(todayRoutine)} 
                      className="btn-icon edit"
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button 
                      onClick={() => handleDeleteRoutine(todayRoutine)} 
                      className="btn-icon delete"
                      title="Eliminar"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                
                <h3 className="routine-name">{todayRoutine.name}</h3>
                
                <div className="exercises-list">
                  {todayRoutine.exercises.map((exercise, index) => (
                    <div key={index} className="exercise-item">
                      <div className="exercise-info">
                        <span className="exercise-num">#{index + 1}</span>
                        <h4>{exercise.name}</h4>
                      </div>
                      <div className="exercise-details">
                        <div className="detail-badge">
                          <span className="label">Series:</span>
                          <span className="value">{exercise.sets}</span>
                        </div>
                        <div className="detail-badge">
                          <span className="label">Reps:</span>
                          <span className="value">{exercise.reps}</span>
                        </div>
                        {exercise.weight && (
                          <div className="detail-badge">
                            <span className="label">Peso:</span>
                            <span className="value">{exercise.weight} kg</span>
                          </div>
                        )}
                        <div className="detail-badge">
                          <span className="label">Descanso:</span>
                          <span className="value">{exercise.rest}s</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="no-routine">
                <div className="no-routine-icon">📋</div>
                <h3>Aún no cuentas con una rutina</h3>
                <p>Crea tu primera rutina para el día de hoy y comienza a entrenar</p>
                <button onClick={() => setShowAddModal(true)} className="btn-primary">
                  + Crear Rutina
                </button>
              </div>
            )}

            {routines.length > 0 && (
              <div className="all-routines">
                <h3>Todas tus Rutinas</h3>
                <div className="routines-grid">
                  {routines.map(routine => (
                    <div key={routine.id} className={`routine-card ${routine.day === today ? 'today' : ''}`}>
                      <div className="card-header">
                        <div>
                          <h4>{routine.name}</h4>
                          <span className="day-badge">{routine.day}</span>
                        </div>
                        <div className="card-actions">
                          <button onClick={() => handleEditRoutine(routine)} className="btn-icon-small">✏️</button>
                          <button onClick={() => handleDeleteRoutine(routine)} className="btn-icon-small">🗑️</button>
                        </div>
                      </div>
                      <p className="exercise-count">
                        {routine.exercises.length} ejercicio{routine.exercises.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        <div className="dashboard-actions">
          {todayRoutine && (
            <button onClick={() => setShowAddModal(true)} className="btn-add-routine">
              + Nueva Rutina
            </button>
          )}
          <button onClick={handleLogout} className="logout-button">
            <span>Cerrar Sesión</span>
            <span>🚪</span>
          </button>
        </div>
      </div>

      <AddRoutineModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setEditingRoutine(null);
        }}
        onSave={handleSaveRoutine}
        editData={editingRoutine}
      />

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={
          confirmDialog.action === 'edit'
            ? confirmDialog.step === 1
              ? '¿Editar rutina?'
              : '¿Estás completamente seguro?'
            : confirmDialog.step === 1
            ? '¿Eliminar rutina?'
            : '¿Estás completamente seguro?'
        }
        message={
          confirmDialog.action === 'edit'
            ? confirmDialog.step === 1
              ? 'Vas a modificar esta rutina. Los cambios se guardarán permanentemente.'
              : 'Esta es tu última confirmación. ¿Deseas continuar con los cambios?'
            : confirmDialog.step === 1
            ? 'Esta acción no se puede deshacer.'
            : 'Confirma que deseas eliminar permanentemente esta rutina.'
        }
        onConfirm={confirmDialog.action === 'edit' ? confirmEdit : confirmDelete}
        onCancel={() => setConfirmDialog({ isOpen: false, routine: null, step: 1 })}
        type={confirmDialog.action === 'edit' ? 'warning' : 'danger'}
      />
    </div>
  );
}

export default Dashboard;
