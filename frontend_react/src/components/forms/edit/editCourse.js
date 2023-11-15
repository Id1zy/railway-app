import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { toast } from "react-hot-toast";
import { updateCourseName } from "../../../api/axiosCourses";

const EditCourse = ({ onClose, courseData, reloadCourses }) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        if (courseData) {
            setValue('nivel', courseData.nivel || '');
        }
    }, [courseData, setValue]);

    const onSubmit = async (data) => {
        setIsUpdating(true);
        try {
            const res = await updateCourseName(courseData.id_course, { nivel: data.nivel }); 
            if (res && res.status === 200) {
                toast.success('Curso editado correctamente.');
                reloadCourses();
                onClose();
            } else {
                toast.error('Ocurrió un problema al editar el curso.');
            }
        } catch (error) {
            console.error('Error al editar el curso:', error);
            toast.error('Ocurrió un error al editar el curso.');
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
            <div>
                <label className='block text-blue font-medium mb-1'>Nombre del Curso</label>
                <input
                    {...register('nivel', { required: "El nombre del curso es requerido." })}
                    className={errors.nivel ? styles.true : styles.false}
                />
                {errors.nivel && <p className="text-deep-red font-bold text-sm mt-1">{errors.nivel.message}</p>}
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
};

export default EditCourse;