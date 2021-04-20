import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { Text, Image, Platform } from 'react-native'
import CurrentList from '../screens/CurrentList'
import ItemDetails from '../screens/ItemDetails';
import FavouritesList from '../screens/FavouritesList'

// const CurrentListStack = createStackNavigator({
//     CurrentList: {
//         screen: CurrentList,
//     },
//     // ItemDetails: {

//     // },
// })

// export default createAppContainer(CurrentListStack);

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const CurrentListStack = () => {
    return (
            <Stack.Navigator>
                <Stack.Screen name="Current List" component={CurrentList} />
                <Stack.Screen name="Item Details" component={ItemDetails} options={({route}) => {
                    return {
                        headerTitle: () => <Text>{route.params.item.name}</Text>
                    }
                }}/>
            </Stack.Navigator>
    )
}

const FavouriteListStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Favourite List" component={FavouritesList} />
        </Stack.Navigator>
    )
}

const Tabs =() => {
    return (
        <NavigationContainer>
            <Tab.Navigator 
            screenOptions={({route}) => ({
                tabBarIcon: ({ color, focused }) => {
                  let image;
                  if (route.name === 'Current') {
                      image = Platform.select({
                          ios: require('../assets/icons/ios-list.png'),
                          android: require('../assets/icons/md-list.png')
                      })
                  } else if (route.name === 'Favourites') {
                    image = Platform.select({
                        ios: focused ? require('../assets/icons/ios-star.png') : require('../assets/icons/ios-star-outline.png'),
                        android: focused ?  require('../assets/icons/md-star.png') : require('../assets/icons/md-star-outline.png')
                    })
                  }
                  return <Image source={image} resized="contain" style={{ width: 25, tintColor: color}} />;
                },
              })}
              >
                <Tab.Screen name="Current" component={CurrentListStack} />
                <Tab.Screen name="Favourites" component={FavouriteListStack} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
export default Tabs