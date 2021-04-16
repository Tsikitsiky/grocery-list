import React, { useState } from 'react'

import { View, Text, SafeAreaView, ScrollView, FlatList, KeyboardAvoidingView } from 'react-native'
import AddItem from '../components/AddItem';

//import uuid from 'uuid/v4';

import {v4 as uuid } from 'uuid';

import ListItem, { Separator } from '../components/ListItem'

import nachos from '../data/nachos'
export default () => {
    const [list, setList] = useState(nachos);

    const addItem = (text) => {
        setList([{id: uuid(), name: text}, ...list])
    }
    const removeItem = (id) => {
        const newList = list.filter(item => item.id !== id);
        setList(newList);
    }
    return(
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView 
            style={{ flex: 1 }} 
            behavior="padding"
            >
            <FlatList 
            data={list}
            renderItem={({item, index}) => (
                <ListItem 
                name={item.name}
                onFavouritePress={() => alert('todo: handle favorite')}
                isFavourite={index < 2} 
                onAddedSwipe={() => removeItem(item.id)}
                onDeleteSwipe={() => removeItem(item.id)}
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