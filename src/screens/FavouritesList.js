import React from 'react'
import { SafeAreaView, FlatList, View, Text } from 'react-native'
import {useCurrentList} from '../util/ListManager'
import ListItem, { Separator } from '../components/ListItem'

export default () => {
    const {removeItem, addToCart, cart, addToFavourite, favourites} = useCurrentList();
    return (
        <SafeAreaView style={{ flex: 1 }}>
        <FlatList
        data={favourites}
        renderItem={({item, index}) => (
            <ListItem 
            name={item.name}
            onFavouritePress={() => addToFavourite(item)}
            isFavourite={item.isFavourited} 
            onAddedSwipe={() => addToCart(item)}
            onDeleteSwipe={() => removeItem(item.id)}
            // onRowPress={() => {
            //     navigation.navigate('Item Details', {item})
            // }}
            />
        )}
        keyExtractor={(item) => item.id} 
        ItemSeparatorComponent={() => <Separator />}
        />
    </SafeAreaView>
    )
}