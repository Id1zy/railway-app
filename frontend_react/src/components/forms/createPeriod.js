import { useState } from "react";
import { toast } from "react-hot-toast";
import { useForm } from 'react-hook-form';
import { createAcademicPeriod } from "../../api/axiosPeriod";

const CreateAcademicPeriod = ({ onClose, reloadPeriods }) => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const [isCreating, setIsCreating] = useState(false);

    const onSubmit = async (data) => {
        setIsCreating(true);
        try {
            const newAcademicPeriodData = {
                period_name: data.period_name,
                start_time_period: data.start_time_period,
                end_time_period: data.end_time_period
            };

            const res = await createAcademicPeriod(newAcademicPeriodData);

            if (res && res.status === 201) { 
                toast.success('Periodo académico creado correctamente.');
                reloadPeriods();
                onClose();
            } else {
                toast.error('Ocurrió un problema al crear el periodo académico.');
            }
        } catch (error) {
            console.error(error);
            toast.error('Ocurrió un error al crear el periodo académico.');
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

                {/* Nombre del Periodo Académico */}
                <div>
                    <p className='w-full inline-block rounded-t-lg text-xl1 text-blue font-medium'>Nombre del Periodo Académico</p>
                    <input
                        {...register('period_name', { required: "El nombre del periodo es requerido." })}
                        className={errors.period_name ? `${styles.true}` : `${styles.false}`}
                    />
                    {errors.period_name && <p className="text-deep-red font-bold text-sm flex items-start justify-start mt-1">{errors.period_name.message}</p>}
                </div>

                {/* Fecha de Inicio */}
                <div>
                    <p className='w-full inline-block rounded-t-lg text-xl1 text-blue font-medium'>Fecha de Inicio</p>
                    <input
                        type="date"
                        {...register('start_time_period', { required: "La fecha de inicio es requerida." })}
                        className={errors.start_time_period ? `${styles.true}` : `${styles.false}`}
                    />
                    {errors.start_time_period && <p className="text-deep-red font-bold text-sm flex items-start justify-start mt-1">{errors.start_time_period.message}</p>}
                </div>

                {/* Fecha de Fin */}
                <div>
                    <p className='w-full inline-block rounded-t-lg text-xl1 text-blue font-medium'>Fecha de Fin</p>
                    <input
                        type="date"
                        {...register('end_time_period', { required: "La fecha de fin es requerida." })}
                        className={errors.end_time_period ? `${styles.true}` : `${styles.false}`}
                    />
                    {errors.end_time_period && <p className="text-deep-red font-bold text-sm flex items-start justify-start mt-1">{errors.end_time_period.message}</p>}
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

export default CreateAcademicPeriod;