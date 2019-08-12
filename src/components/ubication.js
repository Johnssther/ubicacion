import React, { Component } from 'react'
import { View, Text, Alert, ActivityIndicator, StyleSheet, Button, FlatList, AsyncStorage } from 'react-native'

import Geolocation from 'react-native-geolocation-service';
import { hasLocationPermission, location } from '../permissions/location'
import { buildFailureTestResult } from '@jest/test-result';
import { gpsError } from '../services/error'

class Ubicacion extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ubicacion: '',
            loader: false,
            array: []
        }
    }

    componentDidMount() {

        // Método llama el API de geolocalizacion construida en la carpeta ../permissions/location

        // console.log(location(hasLocationPermission));

        // this.setState({
        //     loader: true
        // })

    }
    _ubication = () => {
        this.setState({
            loader: true
        })
        if (hasLocationPermission) {
            Geolocation.getCurrentPosition(
                (position) => {
                    let latitud = position.coords.latitude;
                    let longitud = position.coords.longitude;
                    let aux = this.state.array;
                    let ubicacion = ` Latitud: ${latitud} Longitud: ${longitud}`;
                    aux.push({ ubicacion });
                    this.setState({
                        ubicacion: `Coordenadas = Latitud: ${latitud} Longitud: ${longitud}`,
                        loader: false,
                        array: aux,
                    })

                },
                (error) => {
                    // Manejo de los pposibles errores del GPS.
                    gpsError(error);

                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        }

    }



    render() {
        return (
            <View>
                <ActivityIndicator size="large" color="red" animating={this.state.loader} />
                <Text>Ubicacion</Text>
                <Text>{this.state.ubicacion}</Text>
                <Button
                    onPress={this._ubication}
                    title="Obtener mi ubicación"
                    color="#841584"
                />
                <FlatList
                    data={this.state.array}
                    extraData={this.state}
                    //keyExtractor={({ item }, index) => this.state.numero_orden.orden }
                    keyExtractor={({ item }, index) => {
                        return index.toString()
                    }}
                    renderItem={({ item, index }) =>
                        <View>

                            <Text>{index + 1}. {item.ubicacion}</Text>
                        </View>

                    }
                    refreshing
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 590,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
});

export default Ubicacion


