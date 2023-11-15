import { useState, useEffect } from "react";
import { login } from "../../../redux/actions/auth";
import { toast } from "react-hot-toast";
import { useForm } from 'react-hook-form';
import { connect } from "react-redux";
import { desactivateStudent } from "../../../api/axiosStudent";
import { desactivateUser } from "../../../api/axiosUsers";

const DeleteStudent = ({ login ,onClose, studentId }) => {
    const [isDeactivating, setIsDeactivating] = useState(false);

    const handleDeactivate = async () => {
        setIsDeactivating(true);
        try {
            const res = await desactivateStudent(studentId);
            
            if (res) {
                toast.success('Estudiante desactivado con éxito.'); 
                onClose();
                
            }
          
        } catch (error) {
            console.error(error);
            toast.error('Ocurrió un error al desactivar el estudiante.');
        } finally {
            setIsDeactivating(false);
        }
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <div className="text-white">
            <div className="flex justify-center mt-3">
                <button 
                    type="button" 
                    onClick={handleCancel} 
                    className='border-2 border-admin-red hover:bg-admin-red button_tech_colorless mr-2'>
                    Cancelar
                </button>
                <button 
                    type="button" 
                    onClick={handleDeactivate} 
                    disabled={isDeactivating} 
                    className='border-2 border-admin-green hover:bg-admin-green button_tech_colorless'>
                    Desactivar
                </button>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    loading: state.Auth.loading,
    auth: state.Auth.isAuthenticated,
    rol: state.Auth.rol,
  });

  export default connect(mapStateToProps, {
    login,
  })(DeleteStudent);
