import { toast } from "react-hot-toast";
import { useForm } from 'react-hook-form';
import { createSection } from "../../api/axiosSection";
import { getProfessors } from "../../api/axiosProfessor";
import { getUTPSubjects } from "../../api/axiosSubject";
import { getAcademicPeriods } from "../../api/axiosSection";
import { useState, useEffect } from "react";

const CreateSection = ({ courseId, courseName, onClose, reloadSections }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isCreating, setIsCreating] = useState(false);
    const [professors, setProfessors] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [periods, setPeriods] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const profs = await getProfessors();
            const subs = await getUTPSubjects();
            const pers = await getAcademicPeriods();
            setProfessors(profs.data.results);
            setSubjects(subs.data.results);
            setPeriods(pers.data.results);
        };
        fetchData();
    }, []);

    const onSubmit = async data => {
        setIsCreating(true);
        try {
            const body = {
                name: data.name,
                course: courseId, 
                subject: data.subject, 
                professor_rut: data.professor_rut, 
                period: data.period_id 
            };
    
            const res = await createSection(body);

            if (res && res.status === 201) {
                toast.success('Sección creada correctamente.');
                reloadSections();
                onClose();
            } else {
                toast.error('Ocurrió un problema al crear la sección.');
            }
        } catch (error) {
            console.error('Error al crear la sección:', error);
            toast.error('Ocurrió un error al crear la sección.');
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
            <div className="mb-4">
                <label className="block text-blue font-medium mb-1">Curso</label>
                <input 
                    type="text" 
                    value={courseName} 
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    readOnly 
                />
            </div>

            <div className="mb-4">
                <label className="block text-blue font-medium mb-1">Profesor</label>
                <select {...register('professor_rut', { required: true })} className="w-full p-2 border border-gray-300 rounded-lg">
                    {professors.map((professor) => (
                        <option key={professor.professor_rut} value={professor.professor_rut}>
                            {professor.user.full_name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-blue font-medium mb-1">Asignatura</label>
                <select {...register('subject', { required: true })} className="w-full p-2 border border-gray-300 rounded-lg">
                    {subjects.map(subject => (
                        <option key={subject.id_subject} value={subject.id_subject}>{subject.name}</option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-blue font-medium mb-1">Período Académico</label>
                <select {...register('period_id', { required: true })} className="w-full p-2 border border-gray-300 rounded-lg">
                    {periods.map((period) => (
                        <option key={period.id} value={period.id}>
                            {period.period_name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-blue font-medium mb-1">Nombre de la Sección</label>
                <input 
                    type="text" 
                    {...register('name', { required: "El nombre de la sección es requerido." })} 
                    className="w-full p-2 border border-gray-300 rounded-lg"
                />
                {errors.name && <p className="text-deep-red font-bold text-sm flex items-start justify-start mt-1">{errors.name.message}</p>}
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
};

export default CreateSection;
