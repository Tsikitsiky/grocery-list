import React, { useEffect, useState } from 'react'

import { View, Text, SafeAreaView, ScrollView, FlatList, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import AddItem from '../components/AddItem';

//import uuid from 'uuid/v4';

import {v4 as uuid } from 'uuid';

import ListItem, { Separator } from '../components/ListItem'

//import nachos from '../data/nachos'

const updateStoredCurrentList = (list) => {
    AsyncStorage.setItem('@@GroceryList/currentList', JSON.stringify(list));
}
export default () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    const addItem = (text) => {
        const newList = [{id: uuid(), name: text}, ...list];
        setList(newList);
        updateStoredCurrentList(newList)
    }
    const removeItem = (id) => {
        const newList = list.filter(item => item.id !== id);
        setList(newList);
        updateStoredCurrentList(newList)
    }

    useEffect(() => {
        setTimeout(() => {
            AsyncStorage.getItem('@@GroceryList/currentList')
        .then(data => JSON.parse(data))
        .then(data => {
            if(data) {
                setList(data)
            }
            setLoading(false);
        })
        }, 1000);
    }, []);

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