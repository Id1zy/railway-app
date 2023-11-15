import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useForm } from 'react-hook-form';
import { connect } from "react-redux";
import { desactivateSubject } from "../../../api/axiosSubject";

export const desactivateASubject = async (id) => {
    try {
        const response = await desactivateSubject(id);
        if (response && response.status === 200) {
            toast.success("Asignatura desactivada con éxito.");
            return true;
        } else {
            toast.error("Algo salió mal al desactivar la asignatura. Inténtalo de nuevo.");
            return false;
        }
    } catch (error) {
        console.error("Error al desactivar la asignatura:", error.response);
        toast.error("Error al desactivar la asignatura");
        return false;
    }
}

const mapStateToProps = state => ({
    loading: state.Auth.loading,
    auth: state.Auth.isAuthenticated,
    rol: state.Auth.rol,
});

export default connect(mapStateToProps, {})(desactivateASubject);  
