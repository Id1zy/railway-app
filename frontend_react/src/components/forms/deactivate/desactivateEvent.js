import { useState } from "react";
import { toast } from "react-hot-toast";
import { desactivateEvent } from "../../../api/axiosEvent";

const DesactivateEvent = ({ onClose, eventToDesactivate, reloadEvents }) => {
    const [isDeactivating, setIsDeactivating] = useState(false);

    const handleDeactivate = async () => {
        setIsDeactivating(true);
        try {
            const response = await desactivateEvent(eventToDesactivate.id);
            if (response.status === 200) {
                toast.success('Evento desactivado correctamente.');
                reloadEvents();
            } else {
                toast.error('Ocurrió un problema al desactivar el evento.');
            }
        } catch (error) {
            console.error('Error al desactivar el evento:', error);
            toast.error('Ocurrió un error al desactivar el evento.');
        } finally {
            setIsDeactivating(false);
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
                    onClick={handleDeactivate} 
                    disabled={isDeactivating} 
                    className='border-2 border-admin-green bg-new-green hover:bg-admin-green button_tech_colorless'>
                    {isDeactivating ? 'Desactivando...' : 'Desactivar'}
                </button>
            </div>
        </div>
    );
};

export default DesactivateEvent;

