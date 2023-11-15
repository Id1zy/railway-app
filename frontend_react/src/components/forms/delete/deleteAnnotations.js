import { desactivateStudentObservation } from "../../../api/axiosObservations";
import { useState, useEffect } from "react";
import { login } from "../../../redux/actions/auth";
import { toast } from "react-hot-toast";
import { useForm } from 'react-hook-form';
import { connect } from "react-redux";

export const desactivateAnnotation = async (id) => {
    try {
        const response = await desactivateStudentObservation(id);
        if (response && response.status === 200) {
            toast.success("Observación desactivada con éxito.");
            return true;
        } else {
            toast.error("Algo salió mal al desactivar la observación. Inténtalo de nuevo.");
            return false;
        }
    } catch (error) {
        console.error("Error al desactivar la observación:", error.response);
        toast.error("Error al desactivar la observación");
        return false;
    }
}


const mapStateToProps = state => ({
    loading: state.Auth.loading,
    auth: state.Auth.isAuthenticated,
    rol: state.Auth.rol,
  });

  export default connect(mapStateToProps, {
    login,
  })(desactivateAnnotation);  