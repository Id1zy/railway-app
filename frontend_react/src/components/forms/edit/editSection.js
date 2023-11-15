import { toast } from "react-hot-toast";
import { useForm } from 'react-hook-form';
import { updateSection2 } from "../../../api/axiosSection";
import { useState, useEffect } from "react";
import { getProfessors } from "../../../api/axiosProfessor";
import { getUTPSubjects } from "../../../api/axiosSubject";
import { getAcademicPeriods } from "../../../api/axiosSection";

const EditSection = ({ onClose, sectionData, reloadSections }) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [isUpdating, setIsUpdating] = useState(false);
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


  useEffect(() => {
    if (sectionData && subjects.length > 0) {
      setValue('name', sectionData.name || '');
      setValue('professor_rut', sectionData.professor_rut || '');
      setValue('subject', sectionData.subject_id.toString() || '');
      const periodId = sectionData.period.match(/\d+/)[0];
      if (periodId) {
        setValue('period_id', periodId);
      }
      setValue('is_active', sectionData.is_active);
    }
  }, [sectionData, subjects, setValue]);


  const onSubmit = async (data) => {
    setIsUpdating(true);
    try {
      const updatedSectionData = {
        name: data.name,
        professor_rut: data.professor_rut,
        subject: data.subject,
        period: data.period_id,
        is_active: data.is_active,
      };

      const res = await updateSection2(sectionData.section_id, updatedSectionData);

      if (res && res.status === 200) {
        toast.success('Sección editada correctamente.');
        reloadSections();
        onClose();
      } else {
        toast.error('Ocurrió un problema al editar la sección.');
      }
    } catch (error) {
      console.error('Error al actualizar la sección:', error);
      toast.error('Ocurrió un error al actualizar la sección.');
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
                  <p className='w-full inline-block rounded-t-lg text-xl1 text-blue font-medium'>Nombre de la Sección</p>
                  <input
                      {...register('name', { required: "El nombre de la sección es requerido." })}
                      className={errors.name ? `${styles.true}` : `${styles.false}`}
                  />
                  {errors.name && <p className="text-deep-red font-bold text-sm flex items-start justify-start mt-1">{errors.name.message}</p>}
              </div>
              
              <div>
                  <label className='block text-blue font-medium mb-1'>Profesor</label>
                  <select {...register('professor_rut', { required: true })} className={styles[!!errors.professor_rut]}>
                      {professors.map(professor => (
                          <option key={professor.professor_rut} value={professor.professor_rut}>{professor.user.full_name}</option>
                      ))}
                  </select>
                  {errors.professor_rut && <p className="text-deep-red font-bold text-sm mt-1">{errors.professor_rut.message}</p>}
              </div>
              <div>
                  <label className='block text-blue font-medium mb-1'>Asignatura</label>
                  <select {...register('subject', { required: true })} className={styles[!!errors.subject]}>
                      {subjects.map(subject => (
                          <option key={subject.id_subject} value={subject.id_subject}>{subject.name}</option>
                      ))}
                  </select>
                  {errors.subject && <p className="text-deep-red font-bold text-sm mt-1">{errors.subject.message}</p>}
              </div>

              <div>
                  <label className='block text-blue font-medium mb-1'>Período Académico</label>
                  <select {...register('period_id', { required: true })} className={styles[!!errors.period_id]}>
                      {periods.map(period => (
                          <option key={period.id} value={period.id}>{period.period_name}</option>
                      ))}
                  </select>
                  {errors.period_id && <p className="text-deep-red font-bold text-sm mt-1">{errors.period_id.message}</p>}
              </div>

              <div>
                  <p className='w-full inline-block rounded-t-lg text-xl1 text-blue font-medium'>Estado de Actividad</p>
                  <input
                      type="checkbox"
                      {...register('is_active')}
                      className="mt-2"
                  />
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

export default EditSection;