import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Icon } from '@rneui/base';
import tw from 'tailwind-react-native-classnames';
import { GOOGLE_MAPS_APIKEY } from "@env";

const data = [
  {
    id: "123",
    icon: "home",
    location: "Home",
    destination: "Suhum, Ghana",
  },
  {
    id: "456",
    icon: "briefcase",
    location: "Shop",
    destination: "Accra, Ghana",
  },
];

const NavFavourites = ({ onPress }) => {
  const [fetchedData, setFetchedData] = useState([]); // Store fetched data

  useEffect(() => {
    const getTravelTime = async (destination) => {
      try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${destination}&key=${GOOGLE_MAPS_APIKEY}`);
        const data = await response.json();
        // Update state with fetched data
        setFetchedData(prevData => [...prevData, data]);
      } catch (error) {
        console.error("Error fetching travel time:", error);
      }
    };

    // Loop through the data to fetch travel time for each destination
    data.forEach(item => {
      getTravelTime(item.destination);
    });
  }, []); // Empty dependency array to ensure useEffect runs only once

  return (
    <FlatList 
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View style={[tw `bg-gray-200`, { height: 0.5 }]}/>
      )}
      renderItem={({ item: { location, destination, icon }, index }) => {
        const lat = fetchedData[index]?.results[0]?.geometry?.location?.lat;
        const lng = fetchedData[index]?.results[0]?.geometry?.location?.lng;
        const loc = fetchedData[index]?.results[0]?.geometry?.location
        return (
          <TouchableOpacity
            style={tw `flex-row items-center p-5`}
            onPress={() => onPress(loc, destination)}
          >
            <Icon 
              style={tw `mr-4 rounded-full bg-gray-300 p-3`}
              name={icon}
              type='ionicon'
              color='white'
              size={18}
            />
            <View>
              <Text style={tw `font-semibold text-lg`}>{location}</Text>
                <Text style={tw `text-gray-500`}>{destination}</Text>
            
                

            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}

export default NavFavourites;

const styles = StyleSheet.create({});
