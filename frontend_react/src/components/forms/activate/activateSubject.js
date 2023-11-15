import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useForm } from 'react-hook-form';
import { connect } from "react-redux";
import { activateSubject } from "../../../api/axiosSubject";

export const activateASubject = async (id) => {
    try {
        const response = await activateSubject(id);
        if (response && response.status === 200) {
            toast.success("Asignatura activada con éxito.");
            return true;
        } else {
            toast.error("Algo salió mal al activar la asignatura. Inténtalo de nuevo.");
            return false;
        }
    } catch (error) {
        console.error("Error al activar la asignatura:", error.response);
        toast.error("Error al activar la asignatura");
        return false;
    }
}

const mapStateToProps = state => ({
    loading: state.Auth.loading,
    auth: state.Auth.isAuthenticated,
    rol: state.Auth.rol,
});

export default connect(mapStateToProps, {})(activateSubject); 