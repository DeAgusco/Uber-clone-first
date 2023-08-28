import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import tw from 'tailwind-react-native-classnames'
import { Icon } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'
import { FlatList } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { selectTravelTimeInformation } from '../slices/navSlice'

const data = [
	{
		id: "Delivery-X-123",
		title: "Techchap X",
		multiplier: 1,
		image: "https://t4.ftcdn.net/jpg/03/32/79/91/360_F_332799148_55PKYZ6OkLWfuQTTZ0jeD8gzNnweZ0mU.jpg"
	},
	{
		id: "Delivery-XL-456",
		title: "Techchap XL",
		multiplier: 1.2,
		image: "https://static.vecteezy.com/system/resources/previews/023/548/721/non_2x/courier-on-the-red-motorbike-vector.jpg"
	},
	{
		id: "Delivery-LUX-789",
		title: "Techchap LUX",
		multiplier: 1.75,
		image: "https://previews.123rf.com/images/chipus/chipus1908/chipus190800050/129295109-courier-on-the-red-motorbike-with-jet-rocket-engine-delivery-service-or-motorcycle-racing-concept.jpg"
	},
]

const SURGE_CHARGE_RATE = 1.5;
const RideOptions = () => {
  const navigation = useNavigation();
	const [selected, setSelected] = useState(null);
	const travelTimeInformation = useSelector(selectTravelTimeInformation);
  return (
    <SafeAreaView style={tw `bg-white flex-grow`}>
      <View>				
				<Text style={tw `text-center py-5 text-xl`}>Select a Ride - {travelTimeInformation?.distance?.text}les</Text>
				<TouchableOpacity
					style={tw `absolute top-3 left-5 p-3 rounded-full`}
					onPress={() => {
						navigation.navigate("NavigateCard");
					}}
				>
					<Icon name='chevron-left' type='fontawesome' size={18}/>
				</TouchableOpacity>
      </View>
			<FlatList
				data={data}
				keyExtractor={(item) => item.id}
				renderItem={({item:{id,title, multiplier, image}, item})=> (
					<TouchableOpacity 
					onPress={() => setSelected(item)}
					style={tw `flex-row justify-between items-center px-5 ${
						id === selected?.id && 'bg-gray-200'
					}`}>
						<Image
							style={{
								width: 100,
								height: 100,
								resizeMode: "contain"
							}}
							source={{uri: image}}
						/>
						<View style={tw `-ml-6`}>
							<Text style={tw `text-xl font-semibold`}>{title}</Text>
							<Text>{travelTimeInformation?.duration?.text}</Text>
						</View>
						<Text style={tw `text-xl`}>
							{new Intl.NumberFormat('en-gb', {
								style: 'currency',
								currency: 'GHS'
							}).format(
								(travelTimeInformation?.duration?.value * SURGE_CHARGE_RATE * multiplier)/ 310
							)}
						</Text>
					</TouchableOpacity>
				)}
			/>
			<View style={tw`mt-auto border-t border-gray-200`}>
				<TouchableOpacity disabled={!selected} style={tw `bg-black py-3 mx-12 mt-2 ${!selected && "bg-gray-300"}`}>
					<Text style={tw `text-center text-white text-xl`}>Choose {selected?.title}</Text>
				</TouchableOpacity>
			</View>
    </SafeAreaView>
  )
}

export default RideOptions

const styles = StyleSheet.create({})
