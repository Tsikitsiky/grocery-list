import React from 'react'

import { View, Text, SafeAreaView, ScrollView, SectionList, KeyboardAvoidingView, ActivityIn, SectionListdicator } from 'react-native'
import AddItem from '../components/AddItem';
import {useCurrentList} from '../util/ListManager'


import ListItem, { SectionHeader, Separator } from '../components/ListItem'

export default ({navigation}) => {
    const {list, loading, addItem, removeItem, addToCart, cart, addToFavourite} = useCurrentList();

if(loading) {
    return (
        <SafeAreaView>
            {/* <ActivityIndicator size="large" /> */}
            <Text>Loading ...</Text>
        </SafeAreaView>
    )
}

    return(
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView 
            style={{ flex: 1 }} 
            behavior="padding"
            >
            <SectionList
            sections={[
                {title: 'List', data: list},
                {title: 'Cart', data: cart},
            ]} 
            //data={list}
            renderSectionHeader={({ section }) => (
                <SectionHeader title={section.title} />
            )}
            renderItem={({item, index}) => (
                <ListItem 
                name={item.name}
                onFavouritePress={() => addToFavourite(item)}
                isFavourite={item.isFavourited} 
                onAddedSwipe={() => addToCart(item)}
                onDeleteSwipe={() => removeItem(item.id)}
                onRowPress={() => {
                    navigation.navigate('Item Details', {item})
                }}
                />
            )}
            keyExtractor={(item) => item.id} 
            ItemSeparatorComponent={() => <Separator />}
            ListHeaderComponent={() => (
            <AddItem
            onSubmitEditing={({nativeEvent: {text} }) => addItem(text)} />)}
            />
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
    // return (
    //     <SafeAreaView>
    //         <ScrollView>
    //         {nachos.map((item, index)=>(
    //             <React.Fragment key={item.id}>
    //                 <ListItem 
    //                 name={item.name} 
    //                 onFavouritePress={() => alert('todo: handle favorite')}
    //                 isFavourite={index < 2} 
    //                 />
    //                 <Separator />
    //             </React.Fragment>
    //         )
    //         )}
    //         </ScrollView>
    //     </SafeAreaView>

    // )

};