import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useForm } from 'react-hook-form';
import { connect } from "react-redux";
import { updateStudentObservation } from "../../../api/axiosObservations";

const EditAnnotation = ({ onClose, observationData, observation, updateObservationList, reloadObservations}) => {
    const [color, setColor] = useState(
        window.localStorage.getItem("color"));

    const observationId = observation?.id_observation;
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm();

    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        if (observationData) {
            setValue('type_observation', observationData.type_observation || '');
            setValue('description', observationData.description || '');
        }
    }, [observationData, setValue]);

    const onSubmit = async (data) => {
        setIsUpdating(true);
        try {
            const updatedObservationData = {
                type_observation: data.type_observation,
                description: data.description,  
            };

            const res = await updateStudentObservation(observationId, updatedObservationData);
           
            if (res && res.status === 200) { 
                toast.success('Anotación editada correctamente.');
                reloadObservations();
                onClose(); 
            } else {
                
                toast.error('Ocurrió un problema al editar la anotación.');
            }
            reloadObservations();
            } catch (error) {
            console.error(error);
            toast.error('Ocurrió un error al actualizar la anotación.');
            } finally {
            setIsUpdating(false);
            }
        };

    const handleCancel = () => {
        onClose();
    };
    const Style = {
        colorSchool :  `bg-new-`+color,
        textSchool: `text-new-`+color,
        hoverSchool: `bg-new-h`+color,
        borderSchool: `border-new-`+color,
        buttonSchool: `bg-new-`+color+' hover:bg-new-h'+color,
    }

    const styles = {
        true: 'bg-black-input input_tech_search_colorless_2 border-2 border-deep-red ring-2 ring-red ring-offset-deep-red focus:ring-transparent focus:border-none focus:ring-offset-admin-green',
        false: 'bg-black-input input_tech_search_colorless_2 border-none focus:ring-transparent focus:ring-offset-admin-green'
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="text-black">
            <div className="grid grid-cols-1 gap-4 mb-1">
    
                {/* Información de Subsector */}
                <div>
                    <p className={`w-full inline-block rounded-t-lg text-xl1 ${Style.textSchool} font-medium`}>Subsector</p>
                    <p className="text-black font-medium">{observation?.section_details?.subject_details?.name}</p>
                </div>
    
                {/* Información de Horario */}
                <div>
                    <p className={`w-full inline-block rounded-t-lg text-xl1 ${Style.textSchool} font-medium`}>Horario</p>
                    <p className="text-black font-medium">{observation?.schedule_details?.day_of_week} de {observation?.schedule_details?.start_time_block} a {observation?.schedule_details?.end_time_block}</p>
                </div>
    
                {/* Tipo de Observación */}
                <div>
                    <p className={`w-full inline-block rounded-t-lg text-xl1 ${Style.textSchool} font-medium`}>Tipo de Observación</p>
                    <select 
                        {...register('type_observation', { required: "Tipo de Observación es requerido." })}
                        className={errors.type_observation ? `${styles.true}` : `${styles.false}`}
                        defaultValue={observation?.type_observation}
                    >
                        <option value="positiva">Positiva</option>
                        <option value="negativa">Negativa</option>
                    </select>
                    {errors.type_observation && <p className="text-deep-red font-bold text-sm flex items-start justify-start mt-1">{errors.type_observation.message}</p>}
                </div>

                {/* Descripción */}
                <div>
                    <p className={`w-full inline-block rounded-t-lg text-xl1 ${Style.textSchool} font-medium`}>Descripción</p>
                    <textarea
                        {...register('description', { required: "Descripción es requerida." })}
                        className={errors.description ? `${styles.true}` : `${styles.false}`}
                        defaultValue={observation?.description}
                    />
                    {errors.description && <p className="text-deep-red font-bold text-sm flex items-start justify-start mt-1">{errors.description.message}</p>}
                </div>
    
            </div>
            <div className="flex justify-center mt-3">
                <button type="button" onClick={handleCancel} className='border-2 border-admin-red bg-red-500 hover:bg-admin-red button_tech_colorless mr-2'>
                    Cancelar
                </button>
                <button type="submit" disabled={isUpdating} className='border-2 border-admin-green bg-new-green hover:bg-admin-green button_tech_colorless'>
                    Editar
                </button>
            </div>
        </form>
    );
}

export default EditAnnotation;
