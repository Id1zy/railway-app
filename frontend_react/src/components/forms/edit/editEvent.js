import { toast } from "react-hot-toast";
import { useForm } from 'react-hook-form';
import { updateEvent } from "../../../api/axiosEvent";
import { getSectionForProfessor2 } from "../../../api/axiosSection";
import { useState, useEffect } from "react";

const EditEvent = ({ onClose, reloadEvents, eventToEdit }) => {
    const [selectedSection, setSelectedSection] = useState(eventToEdit ? eventToEdit.section_id : "");

    function compareSectionsforlatter(a, b) {
        const levelA = a.course.nivel;
        const levelB = b.course.nivel;
        return levelA.localeCompare(levelB);
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm();

    useEffect(() => {
        if (eventToEdit) {
            setValue("title", eventToEdit.title || "");
            setValue("description", eventToEdit.description || "");
            setValue("start_date_time", new Date(eventToEdit.start).toISOString().split('.')[0]);
            setValue("section_id", eventToEdit.section_id || "");
        }
    }, [eventToEdit, setValue]);
    

    const [isUpdating, setIsUpdating] = useState(false);
    const [sections, setSections] = useState([]);

    const fetchSections = async () => {
        try {
            const res = await getSectionForProfessor2();
            if (res && res.data && Array.isArray(res.data.results)) {
                const sortedSections = res.data.results.sort(compareSectionsforlatter);
                setSections(sortedSections);
            }
        } catch (error) {
            console.error("Error fetching sections:", error);
        }
    };
    
    useEffect(() => {
        fetchSections();
    }, []);

    const onSubmit = async (data) => {
        setIsUpdating(true);
        try {
            const updatedEventData = {
                title: data.title,
                description: data.description,
                start_date_time: data.start_date_time,
                section_id: parseInt(data.section_id),
            };
    
            const res = await updateEvent(eventToEdit.id, updatedEventData);  
    
            if (res && res.status === 200) { 
                toast.success('Evento actualizado correctamente.');
                reloadEvents();
                onClose();
                return;  
            } else {
                toast.error('Ocurrió un problema al actualizar el evento.');
            }
        } catch (error) {
            console.error(error);
            toast.error('Ocurrió un error al actualizar el evento.');
        } finally {
            setIsUpdating(false);
        }
    };

    const handleCancel = () => {
        onClose();
    };

    const styles = ({
        true: 'bg-black-input input_tech_search_colorless_2 border-2 border-deep-red ring-2 ring-red ring-offset-deep-red focus:ring-transparent focus:border-none focus:ring-offset-admin-green',
        false: 'bg-black-input input_tech_search_colorless_2 border-none focus:ring-transparent focus:ring-offset-admin-green'
    });

    console.log("Section ID del evento:", eventToEdit.section_id);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="text-black">
            <div className="grid grid-cols-1 gap-4 mb-1">

                {/* Sección del Evento */}
                <div>
                    <p className='w-full inline-block rounded-t-lg text-xl1 text-blue font-medium'>Sección del Evento</p>
                    <select
                        {...register('section_id', { required: "La sección del evento es requerida." })}
                        className={errors.section_id ? `${styles.true}` : `${styles.false}`}
                        value={selectedSection}
                        onChange={e => {
                            setValue("section_id", e.target.value);
                            setSelectedSection(e.target.value);
                        }}
                    >
                        <option value="">Selecciona una sección</option>
                        {sections.map(section => (
                            <option key={section.section_id} value={section.section_id}>
                                {`${section.course.nivel} - ${section.name}`}
                            </option>
                        ))}
                    </select>
                    {errors.section_id && <p className="text-deep-red font-bold text-sm flex items-start justify-start mt-1">{errors.section_id.message}</p>}
                </div>

                {/* Título del Evento */}
                <div>
                    <p className='w-full inline-block rounded-t-lg text-xl1 text-blue font-medium'>Título del Evento</p>
                    <input
                        {...register('title', { required: "El título del evento es requerido." })}
                        className={errors.title ? `${styles.true}` : `${styles.false}`}
                    />
                    {errors.title && <p className="text-deep-red font-bold text-sm flex items-start justify-start mt-1">{errors.title.message}</p>}
                </div>

                {/* Descripción del Evento */}
                <div>
                    <p className='w-full inline-block rounded-t-lg text-xl1 text-blue font-medium'>Descripción del Evento</p>
                    <textarea
                        {...register('description', { required: "La descripción del evento es requerida." })}
                        className={errors.description ? `${styles.true}` : `${styles.false}`}
                    />
                    {errors.description && <p className="text-deep-red font-bold text-sm flex items-start justify-start mt-1">{errors.description.message}</p>}
                </div>

                {/* Fecha y Hora de Inicio del Evento */}
                <div>
                    <p className='w-full inline-block rounded-t-lg text-xl1 text-blue font-medium'>Fecha y Hora de Inicio</p>
                    <input
                        type="datetime-local"
                        {...register('start_date_time', { required: "La fecha y hora de inicio son requeridas." })}
                        className={errors.start_date_time ? `${styles.true}` : `${styles.false}`}
                        onChange={e => setValue("start_date_time", e.target.value)}
                    />
                    {errors.start_date_time && <p className="text-deep-red font-bold text-sm flex items-start justify-start mt-1">{errors.start_date_time.message}</p>}
                </div> 

            </div>
            <div className="flex justify-center mt-3">
                <button type="button" onClick={handleCancel} className='border-2 border-admin-red bg-red-500 hover:bg-admin-red button_tech_colorless mr-2'>
                    Cancelar
                </button>
                <button type="submit" disabled={isUpdating} className='border-2 border-admin-green bg-new-green hover:bg-admin-green button_tech_colorless'>
                    Actualizar
                </button>
            </div>
        </form>
    );
}

export default EditEvent;