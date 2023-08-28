import { StyleSheet, Image, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../slices/navSlice';
// Import the images directly
import deliveryImage from '../images/Delivery-service-motorbike-illustration-transparent-PNG.png';

const data = [
  {
    id: "123",
    title: "Request Delivery",
    image: deliveryImage,
    screen: "MapScreen",
  },
  // Add other items as needed
];
const NavOptions = () => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin)
  
  return (
    <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
           <TouchableOpacity 
            onPress={() => {
                navigation.removeListener();
                navigation.navigate(item.screen);
            }}
            style={tw `p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-80 items-center`}
            disabled={!origin}
            >

                <View style={tw`${!origin && "opacity-20"}`}>
                    <Image 
                        style={{width: 120, height:120, resizeMode: "contain"}}
                        source={item.image}
                    />
                    <Text style={tw `mt-2 text-lg font-semibold`}>{item.title}</Text>
                    <Icon 
                        style={tw `p-2 bg-black rounded-full w-10 mt-4 mx-auto`}
                        type='antdesign' name='arrowright' color='white'
                    />
                </View>
           </TouchableOpacity> 
        )}
    />
  )
}

export default NavOptions

const styles = StyleSheet.create({});