import { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Platform } from "react-native";
import * as Location from 'expo-location';
import * as Device from "expo-device";
// import Icon from 'react-native-vector-icons/FontAwesome';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { Box, Center,Pressable ,Button} from 'native-base';
import { Ionicons } from '@expo/vector-icons'; 
import { getUbikeInfo } from '../api';
import metroJson from "../json/metro.json";
import mapStyle from "../styles/mapStyles.json";
import ActionButton from '../components/ActionButton';

const MapScreen=()=>{
    const [msg, setMsg] = useState("Waiting...");
    const [onCurrentLocation, setOnCurrentLocation] = useState(false);
    const [metro, setMetro] = useState(metroJson);
    const [ubike, setUbike] = useState([]);
    const [zoomRatio, setZoomRatio] = useState(1);
    let i=0;
    const [region, setRegion] = useState({
        longitude: 121.544637 ,
        latitude:  25.024624,
        longitudeDelta: 0.02,
        latitudeDelta: 0.04,
    })
    const [marker, setMarker] = useState({
        coord: {
        longitude: 121.544637,
        latitude: 25.024624,
        },
        // name: "國立臺北教育大學",
        // address: "台北市和平東路二段134號",
    });

    // const setRegionAndMarker = (location) => {
    //     setRegion({
    //     ...region,
    //     longitude: location.coords.longitude,
    //     latitude: location.coords.latitude,
    //     });
    //     setMarker({
    //     ...marker,
    //     coord: {
    //         longitude: location.coords.longitude,
    //         latitude: location.coords.latitude,
    //     },
    //     });
    // };

    const onRegionChangeComplete = (rgn) => {
        console.log(0.02 / rgn.longitudeDelta)
        if (rgn.longitudeDelta > 0.02)
        setZoomRatio(0.02 / rgn.longitudeDelta);
        else
        setZoomRatio(1);
    }

    // const getLocation = async () => {
    //     let { status } = await Location.requestForegroundPermissionsAsync();
    //     if (status !== 'granted') {
    //     setMsg('Permission to access location was denied');
    //     return;
    //     }
    //     let location = await Location.getCurrentPositionAsync({});
    //     setRegionAndMarker(location);
    //     setOnCurrentLocation(true);
    // }

    const getUbikeData = async () => {
        const ubikeData = await getUbikeInfo();
        setUbike(ubikeData);
    };

    useEffect(()=>{
        
        getUbikeData();
        
    }, []);




 return(
    <Box flex={1}>
            <MapView
                initialRegion={region} 
                style={{ flex: 1 }}
                showsTraffic          
                onRegionChangeComplete={onRegionChangeComplete}
            >
                {(zoomRatio > 0.14) && ubike.map((site) => (
                

                // <Marker
                //     coordinate={{
                //     latitude: Number(site.lat),
                //     longitude: Number(site.lng),
                //     }}
                //     key={site.sno}
                //     title={site.sna}
                //     description={site.ar}
                // >
                
               
                   
                // </Marker>
                    
                    <ActionButton zoomRatio={zoomRatio} site={site} key={site.sno} />
                    
               
                ))}

                {(zoomRatio > 0.14) && metro.map((site) => (
                


                <Marker
                    coordinate={{ latitude: site.lat, longitude: site.lon }}
                    key={site.construction_id}
                    title={site.station_name_tw}
                    description={site.address}
                   
                >
                    {/* <Button title={'sss'} onPress={ ()=>console.log('test')}/> */}
                    <Center bg="white" borderRadius={60} p={3 * zoomRatio} borderWidth={2 * zoomRatio} borderColor="black">
                   
                    <Ionicons name="bus" size={30 * zoomRatio} color="black" />
                    </Center>
                </Marker>
                ))}
                
            </MapView>
            {/* {!onCurrentLocation && (
                <Box
                bg="white"
                borderRadius={60}
                position="absolute"
                shadow="2"
                zIndex={99}
                right={5}
                bottom={5}
                >
                <Ionicons name={"ios-locate"}
                    size={60}
                    color="black"
                    onPress={getLocation}
                />
                </Box>

            )} */}
    </Box>
 );
};
export default MapScreen;