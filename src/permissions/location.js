import { PermissionsAndroid, Alert } from 'react-native'
import Geolocation from 'react-native-geolocation-service';

import { gpsError } from '../services/error'


export const hasLocationPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Permiso de Ubcación',
                message:
                    'Nesesitas otorgar permiso a la ubicación',
                buttonNeutral: 'Preguntarme mas tarde',
                buttonNegative: 'Cancelar',
                buttonPositive: 'OK',
            },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Permiso otorgado');
        } else {
            console.log('Permiso de ubicacion denegado');
        }
    } catch (err) {
        console.warn(err);
    }

};

export const location = hasLocationPermission => {
    if (hasLocationPermission) {
         Geolocation.getCurrentPosition(
            (position) => {
                return position
                // console.log(position);
            },
            (error) => {
                // Desde este metodo se manejan los errores  del gps
                gpsError(error)

            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }

};
