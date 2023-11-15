import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useForm } from 'react-hook-form';
import { updateAcademicPeriod } from "../../../api/axiosPeriod";

const EditAcademicPeriod = ({ onClose, periodData, reloadPeriods }) => {

    const periodId = periodData?.id; 
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm();

    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        if (periodData) {
            setValue('period_name', periodData.period_name || '');
            setValue('start_time_period', periodData.start_time_period || '');
            setValue('end_time_period', periodData.end_time_period || '');
        }
    }, [periodData, setValue]);

    const onSubmit = async (data) => {
        setIsUpdating(true);
        try {
            const updatedPeriodData = {
                period_name: data.period_name,
                start_time_period: data.start_time_period,
                end_time_period: data.end_time_period
            };

            const res = await updateAcademicPeriod(periodId, updatedPeriodData);

            if (res && res.status === 200) { 
                toast.success('Periodo académico editado correctamente.');
                reloadPeriods();
                onClose(); 
            } else {
                toast.error('Ocurrió un problema al editar el periodo académico.');
            }
        } catch (error) {
            toast.error('Ocurrió un error al actualizar el periodo académico.');
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

                {/* ID del Periodo Académico */}
                <div>
                    <p className='w-full inline-block rounded-t-lg text-xl1 text-blue font-medium'>ID del Periodo Académico</p>
                    <input
                        value={periodData?.id}
                        disabled={true}
                        className={`${styles.false} cursor-not-allowed`}
                    />
                </div>

                {/* Nombre del Periodo Académico */}
                <div>
                    <p className='w-full inline-block rounded-t-lg text-xl1 text-blue font-medium'>Nombre del Periodo Académico</p>
                    <input
                        {...register('period_name', { required: "El nombre del periodo es requerido." })}
                        className={errors.period_name ? styles.true : styles.false}
                        defaultValue={periodData?.period_name}
                    />
                    {errors.period_name && <p className="text-deep-red font-bold text-sm flex items-start justify-start mt-1">{errors.period_name.message}</p>}
                </div>

                {/* Fecha de Inicio */}
                <div>
                    <p className='w-full inline-block rounded-t-lg text-xl1 text-blue font-medium'>Fecha de Inicio</p>
                    <input
                        type="date"
                        {...register('start_time_period', { required: "La fecha de inicio es requerida." })}
                        className={errors.start_time_period ? styles.true : styles.false}
                        defaultValue={periodData?.start_time_period}
                    />
                    {errors.start_time_period && <p className="text-deep-red font-bold text-sm flex items-start justify-start mt-1">{errors.start_time_period.message}</p>}
                </div>

                {/* Fecha de Fin */}
                <div>
                    <p className='w-full inline-block rounded-t-lg text-xl1 text-blue font-medium'>Fecha de Fin</p>
                    <input
                        type="date"
                        {...register('end_time_period', { required: "La fecha de fin es requerida." })}
                        className={errors.end_time_period ? styles.true : styles.false}
                        defaultValue={periodData?.end_time_period}
                    />
                    {errors.end_time_period && <p className="text-deep-red font-bold text-sm flex items-start justify-start mt-1">{errors.end_time_period.message}</p>}
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

export default EditAcademicPeriod;
