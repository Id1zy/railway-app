import { useState } from "react";
import { toast } from "react-hot-toast";
import { deleteAcademicPeriod } from "../../../api/axiosPeriod";

const DeleteAcademicPeriod = ({ onClose, periodToDelete, reloadPeriods }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const response = await deleteAcademicPeriod(periodToDelete.id);
            if (response.status === 200) {
                toast.success('Periodo académico eliminado correctamente.');
                reloadPeriods();
            } else {
                toast.error('Ocurrió un problema al eliminar el periodo académico.');
            }
        } catch (error) {
            console.error('Error al eliminar el periodo académico:', error);
            toast.error('Ocurrió un error al eliminar el periodo académico.');
        } finally {
            setIsDeleting(false);
        }
        onClose();
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
                    className='border-2 border-admin-red bg-red-500 hover:bg-admin-red button_tech_colorless mr-2'>
                    Cancelar
                </button>
                <button 
                    type="button" 
                    onClick={handleDelete} 
                    disabled={isDeleting} 
                    className='border-2 border-admin-green bg-new-green hover:bg-admin-green button_tech_colorless'>
                    {isDeleting ? 'Eliminando...' : 'Eliminar'}
                </button>
            </div>
        </div>
    );
};

export default DeleteAcademicPeriod;