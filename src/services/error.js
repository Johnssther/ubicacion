import { Alert } from 'react-native';

export const handleErrors = response => {
    console.log(response);
    if (response) {
        if (response.status === 500) {
            Alert.alert('Error', 'Error realizando consulta con servidor.')
        }
    }
};

export const generalError = response => {
    if (response == 'TypeError: Network request failed') {
        Alert.alert('Error de red', 'Verifique su conexión de red')
    } else {
        // generic errors
    }
};

export const gpsError = (error) => {
    if (error.code === 1) {
        Alert.alert('Permiso denegado','La aplicacion no tiene permiso para saber su ubicación, por favor habilitar los permisos en: configuración > aplicaciones > app > permisos > permisos de ubicacion.')
    }
    if (error.code === 2) {
        Alert.alert('GPS deshabilitado', 'Por favor encienda el GPS')
    }

    if (error.code === 3) {
        Alert.alert('Solicitud de ubicacion agotada')
    }

    if (error.code === 4) {
        Alert.alert('El servicio Google play no está instalado o tiene una versión anterior')
    }

    if (error.code === 5) {
        Alert.alert('El servicio de ubicación no esta habiltado, o a ocurrido otro error')
    }

    if (error.code === -1) {
        Alert.alert('Ha ocurrido un error inesperado')
    }
    
};