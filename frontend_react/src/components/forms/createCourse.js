import { toast } from "react-hot-toast";
import { useForm } from 'react-hook-form';
import { postCourse } from "../../api/axiosCourses";
import { useState } from "react";

const CreateCourse = ({ onClose, reloadCourses }) => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const [isCreating, setIsCreating] = useState(false);

    const onSubmit = async (data) => {
        setIsCreating(true);
        try {
            const res = await postCourse(data.nivel);
    
            if (res && res.status === 201) { 
                toast.success('Curso creado correctamente.');
                reloadCourses();
                onClose();
                return;  
            } else {
                toast.error('Ocurrió un problema al crear el curso.');
            }
        } catch (error) {
            console.error(error);
            toast.error('Ocurrió un error al crear el curso.');
        } finally {
            setIsCreating(false);
        }
    };
    

    const handleCancel = () => {
        onClose();
    };

    const styles = ({
        true: 'bg-black-input input_tech_search_colorless_2 border-2 border-deep-red ring-2 ring-red ring-offset-deep-red focus:ring-transparent focus:border-none focus:ring-offset-admin-green',
        false: 'bg-black-input input_tech_search_colorless_2 border-none focus:ring-transparent focus:ring-offset-admin-green'
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="text-black">
            <div className="grid grid-cols-1 gap-4 mb-1">

                <div>
                    <p className='w-full inline-block rounded-t-lg text-xl1 text-blue font-medium'>Nombre del Curso</p>
                    <input
                        {...register('nivel', { required: "El nombre del curso es requerido." })}
                        className={errors.nivel ? `${styles.true}` : `${styles.false}`}
                    />
                    {errors.nivel && <p className="text-deep-red font-bold text-sm flex items-start justify-start mt-1">{errors.nivel.message}</p>}
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

export default CreateCourse;