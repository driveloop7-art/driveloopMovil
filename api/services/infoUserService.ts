import api from "../axiosConfig";

export const getInfoUser = async () => {
    try {
        // Gracias a tu axiosConfig, el token viaja automáticamente aquí
        const response = await api.get('/info-user');

        // Dependiendo de cómo lo construyas en Laravel puede ser response.data o response.data.data
        return response.data.data;
    } catch (error: any) {
        // Manejamos el error de forma segura en caso de que la respuesta venga vacía
        const message = error.response?.data?.message || 'Error al obtener la información del usuario';
        throw new Error(message);
    }
};

/**
 * Envía el nuevo correo electrónico a Laravel.
 * @param newEmail El nuevo correo electrónico ingresado
 */
export const updateEmailUser = async (newEmail: string) => {
    try {
        const response = await api.put('/user/email', {
            email: newEmail,
        });

        // Retornamos toda la data de la respuesta, que incluirá el 'message'
        return response.data;
    } catch (error: any) {
        // 1. Manejo específico para errores de validación de Laravel (HTTP 422)
        if (error.response && error.response.status === 422) {
            // Laravel envía los errores de validación dentro de un objeto "errors"
            const validationErrors = error.response.data.errors;

            if (validationErrors && validationErrors.email) {
                // validationErrors.email es un arreglo, tomamos el primer mensaje de error
                throw new Error(validationErrors.email[0]);
            }
        }

        // 2. Manejo genérico para cualquier otro error (ej. 401, 500, etc.)
        const message = error.response?.data?.message || 'Error al intentar actualizar el correo';
        throw new Error(message);
    }
};

