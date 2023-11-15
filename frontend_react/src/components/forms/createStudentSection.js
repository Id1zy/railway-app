import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { toast } from "react-hot-toast";
import { addStudentsToCourseSections } from "../../api/axiosStudentSection";
import { listCourse } from "../../api/axiosCourses";

const AddStudentsToCourseModal = ({ onClose, selectedStudents, onCompletion  }) => {

    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await listCourse();
                if (response && response.data) {
                    setCourses(response.data);
                }
            } catch (error) {
                toast.error('Error al obtener los cursos.');
            }
        }

        fetchCourses();
    }, []);

    const onSubmit = async (data) => {
        setIsLoading(true);
    
        try {
          const response = await addStudentsToCourseSections(data.course_id, selectedStudents);
    
          if (response && response.status === 201) {
            toast.success('Estudiantes asignados correctamente.');
            onCompletion && onCompletion(); 
            onClose();
          } else {
            toast.error('Ocurrió un problema al asignar los estudiantes.');
          }
        } catch (error) {
          toast.error('Error al asignar los estudiantes.');
        } finally {
          setIsLoading(false);
        }
    };

    const styles = {
        true: 'bg-black-input input_tech_search_colorless_2 border-2 border-deep-red ring-2 ring-red ring-offset-deep-red focus:ring-transparent focus:border-none focus:ring-offset-admin-green',
        false: 'bg-black-input input_tech_search_colorless_2 border-none focus:ring-transparent focus:ring-offset-admin-green'
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="text-black">
            <div className="grid grid-cols-1 gap-4 mb-1">
                
                <div>
                    <p className='w-full inline-block rounded-t-lg text-xl1 text-blue font-medium'>Curso</p>
                    <select {...register('course_id', { required: "Curso es requerido." })}
                            className={errors.course_id ? `${styles.true}` : `${styles.false}`}>
                        {courses.map(courseData => {
                            const course = courseData.Course;
                            return (
                                <option key={course.id} value={course.id}>
                                    {course.nivel} - {course.school}
                                </option>
                            );
                        })}
                    </select>
                    {errors.course_id && <p className="text-deep-red font-bold text-sm flex items-start justify-start mt-1">{errors.course_id.message}</p>}
                </div>
            </div>
            <div className="flex justify-center mt-3">
                <button type="button" onClick={onClose} className='border-2 border-admin-red bg-red-500 hover:bg-admin-red button_tech_colorless mr-2'>
                    Cancelar
                </button>
                <button type="submit" disabled={isLoading} className='border-2 border-admin-green bg-new-green hover:bg-admin-green button_tech_colorless'>
                    Asignar
                </button>
            </div>
        </form>
    );
}

export default AddStudentsToCourseModal;
