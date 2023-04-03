import React, { useState } from "react";
import { GoogleMap, InfoWindow, LoadScript } from "@react-google-maps/api";
import { MarkerF } from '@react-google-maps/api'
import { InfoWindowF } from "@react-google-maps/api";

const MapComponent = () => {
    const myKey = process.env.REACT_APP_GOOGLE_MAPS_KEY
    const [activeInfoWindow, setActiveInfoWindow] = useState("");


    const containerStyle = {
        width: "100%",
        height: "400px",
    }

    const center = {
        lat: 37.97384877711239,
        lng: -122.56415425623996,

    }
    const position = {
        lat: 37.97384877711239,
        lng: -122.56415425623996,

    }
    const onLoad = infoWindow => {
        // console.log('infoWindow: ', infoWindow)
    }



    return (
        <LoadScript googleMapsApiKey={myKey}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={17}
            >

                <MarkerF

                    position={position}
                >
                    <InfoWindowF
                    position={position}
                    onLoad={onLoad}>
                        <p>Alma Del Tango Studio </p>

                    </InfoWindowF>

                </MarkerF>

            </GoogleMap>
        </LoadScript>
    );
};

export default MapComponent;