import React from 'react';
import { Center, Pressable, Actionsheet, useDisclose,Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionScreen from '../screens/ActionScreen';
import { Ionicons } from '@expo/vector-icons'; 
import { Marker } from 'react-native-maps';

export default (props) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const { zoomRatio, site } = props;

  return (
    
    /* <Button  title='btn' onPress={()=>{
            onOpen() 
            console.log('actionsheet')}}
      /> */
      <Marker
                coordinate={{
                latitude: Number(site.lat),
                longitude: Number(site.lng),
                }}
                key={site.sno}
                title={site.sna}
                description={site.ar}
                onPress={onOpen} 
        >

    
          <Center bg="white" borderRadius={60} p={3 * zoomRatio} borderWidth={2 * zoomRatio} borderColor="black">
            {/* <Icon name={"bicycle"} size={30 * zoomRatio} color="black" /> */}
            <Ionicons name="bicycle-outline" size={30 * zoomRatio} color="black" />
          </Center>
        
      
          <Actionsheet isOpen={isOpen} onClose={onClose} >

              <ActionScreen onClose={onClose} site={site} />
        
          </Actionsheet>
      </Marker>
    
  );
}