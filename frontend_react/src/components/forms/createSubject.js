import { useState } from "react";
import { toast } from "react-hot-toast";
import { useForm } from 'react-hook-form';
import { createSubject } from "../../api/axiosSubject";

const CreateSubject = ({ onClose, reloadSubjects }) => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const [isCreating, setIsCreating] = useState(false);

    const onSubmit = async (data) => {
        setIsCreating(true);
        try {
            const newSubjectData = {
                name: data.name,
                school: data.school,
                is_active: true 
            };

            const res = await createSubject(newSubjectData);

            if (res && res.status === 201) { 
                toast.success('Asignatura creada correctamente.');
                reloadSubjects();
                onClose();
            } else {
                toast.error('Ocurrió un problema al crear la asignatura.');
            }
        } catch (error) {
            console.error(error);
            toast.error('Ocurrió un error al crear la asignatura.');
        } finally {
            setIsCreating(false);
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

                {/* Nombre de la Asignatura */}
                <div>
                    <p className='w-full inline-block rounded-t-lg text-xl1 text-blue font-medium'>Nombre de la Asignatura</p>
                    <input
                        {...register('name', { required: "El nombre de la asignatura es requerido." })}
                        className={errors.name ? `${styles.true}` : `${styles.false}`}
                    />
                    {errors.name && <p className="text-deep-red font-bold text-sm flex items-start justify-start mt-1">{errors.name.message}</p>}
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

export default CreateSubject;
