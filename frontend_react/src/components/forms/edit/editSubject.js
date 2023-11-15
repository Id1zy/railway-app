import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useForm } from 'react-hook-form';
import { updateSubjectName } from "../../../api/axiosSubject";

const EditSubject = ({ onClose, subjectData, subject, reloadSubjects }) => {

    const subjectId = subject?.id_subject; 
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm();

    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        if (subjectData) {
            setValue('name', subjectData.name || '');
        }
    }, [subjectData, setValue]);

    const onSubmit = async (data) => {
        setIsUpdating(true);
        try {
            const updatedSubjectData = {
                name: data.name
            };

            const res = await updateSubjectName(subjectId, updatedSubjectData);
           
            if (res && res.status === 200) { 
                toast.success('Asignatura editada correctamente.');
                reloadSubjects();
                onClose(); 
            } else {
                toast.error('Ocurrió un problema al editar la asignatura.');
            }
        } catch (error) {
            toast.error('Ocurrió un error al actualizar la asignatura.');
        } finally {
            setIsUpdating(false);
        }
    };

    const handleCancel = () => {
        onClose();
    };

    const styles = {
        true: 'bg-black-input input_tech_search_colorless_2 border-2 border-deep-red ring-2 ring-red ring-offset-deep-red focus:ring-transparent focus:border-none focus:ring-offset-admin-green',
        false: 'bg-black-input input_tech_search_colorless_2 border-none focus:ring-transparent focus:ring-offset-admin-green'
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="text-black">
            <div className="grid grid-cols-1 gap-4 mb-1">
    
                {/* ID de la Asignatura */}
                <div>
                    <p className='w-full inline-block rounded-t-lg text-xl1 text-blue font-medium'>ID de la Asignatura</p>
                    <input
                        value={subject?.id_subject}
                        disabled={true}
                        className={`${styles.false} cursor-not-allowed`}
                    />
                </div>
    
                {/* Escuela */}
                <div>
                    <p className='w-full inline-block rounded-t-lg text-xl1 text-blue font-medium'>Escuela</p>
                    <input
                        value={subject?.school}
                        disabled={true}
                        className={`${styles.false} cursor-not-allowed`}
                    />
                </div>
    
                {/* Información de Asignatura */}
                <div>
        <p className='w-full inline-block rounded-t-lg text-xl1 text-blue font-medium'>Nombre de la Asignatura</p>
        <input
            {...register('name', { required: "El nombre de la asignatura es requerido." })}
            className={errors.name ? styles.true : styles.false}
            defaultValue={subject?.name}
        />
        {errors.name && <p className="text-deep-red font-bold text-sm flex items-start justify-start mt-1">{errors.name.message}</p>}
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

export default EditSubject;