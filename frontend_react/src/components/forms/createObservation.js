import { useState } from "react";
import { toast } from "react-hot-toast";
import { useForm } from 'react-hook-form';
import { createStudentObservation } from "../../api/axiosObservations";

const CreateObservation = ({ onClose, studentData, reloadObservations }) => {
    const [color, setColor] = useState(
        window.localStorage.getItem("color"));

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const [isCreating, setIsCreating] = useState(false);

    const onSubmit = async (data) => {
        setIsCreating(true);
        try {
            const newObservationData = {
                rut_student: studentData.student_rut,
                id_schedule: data.schedule_id,
                type_observation: data.type_observation,
                description: data.description,
                is_active: true
            };

            const res = await createStudentObservation(newObservationData);

            if (res && res.status === 201) { 
                toast.success('Anotación creada correctamente.');
                reloadObservations();
                onClose();
            } else {
                toast.error('Ocurrió un problema al crear la anotación.');
            }
        } catch (error) {
            console.error(error);
            toast.error('Ocurrió un error al crear la anotación.');
        } finally {
            
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

                {/* Información del estudiante */}
                <div>
                    <p className={`w-full inline-block rounded-t-lg text-xl1 ${Style.textSchool} font-medium`}>Estudiante</p>
                    <p className="text-black font-medium">{studentData.student_name}</p>
                </div>

                {/* Sección */}
                <div>
                    <p className={`w-full inline-block rounded-t-lg text-xl1 ${Style.textSchool} font-medium`}>Sección</p>
                    <p className="text-black">{studentData.sectionName}</p>
                </div>

                <div>
                    <p className={`w-full inline-block rounded-t-lg text-xl1 ${Style.textSchool} font-medium`}>Horario</p>
                    <select 
                        {...register('schedule_id', { required: "Horario es requerido." })} 
                        name="schedule_id" 
                        className={errors.schedule_id ? `${styles.true}` : `${styles.false}`}
                    >
                        {studentData.sectionSchedule && studentData.sectionSchedule.map(schedule => (
                            <option 
                                key={schedule.schedule_id} 
                                value={schedule.schedule_id}
                            >
                                {schedule.start_time_block} - {schedule.end_time_block} ({schedule.day_of_week})
                            </option>
                        ))}
                    </select>
                    {errors.schedule_id && <p className="text-deep-red font-bold text-sm flex items-start justify-start mt-1">{errors.schedule_id.message}</p>}
                </div>

                {/* Tipo de Observación */}
                <div>
                    <p className={`w-full inline-block rounded-t-lg text-xl1 ${Style.textSchool} font-medium`}>Tipo de Observación</p>
                    <select 
                        {...register('type_observation', { required: "Tipo de Observación es requerido." })}
                        className={errors.type_observation ? `${styles.true}` : `${styles.false}`}
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
                    />
                    {errors.description && <p className="text-deep-red font-bold text-sm flex items-start justify-start mt-1">{errors.description.message}</p>}
                </div>

            </div>
            <div className="flex justify-center mt-3">
            <button type="button" onClick={handleCancel} className='border-2 border-admin-red bg-red-500 hover:bg-admin-red button_tech_colorless mr-2'>
                    Cancelar
                </button>
                <button type="submit" disabled={isCreating} className='border-2 border-admin-green bg-new-green hover:bg-admin-green button_tech_colorless'>
                    Crear
                </button>
            </div>
        </form>
    );
}

export default CreateObservation;
