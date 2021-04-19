import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { Text } from 'react-native'
import CurrentList from '../screens/CurrentList'
import ItemDetails from '../screens/ItemDetails';

// const CurrentListStack = createStackNavigator({
//     CurrentList: {
//         screen: CurrentList,
//     },
//     // ItemDetails: {

//     // },
// })

// export default createAppContainer(CurrentListStack);

const Stack = createStackNavigator();

const CurrentListStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Current List" component={CurrentList} />
                <Stack.Screen name="Item Details" component={ItemDetails} options={({route}) => {
                    return {
                        headerTitle: () => <Text>{route.params.item.name}</Text>
                    }
                }}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default CurrentListStack