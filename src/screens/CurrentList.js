import React from 'react'

import { View, Text, SafeAreaView, ScrollView } from 'react-native'

import ListItem, { Separator } from '../components/ListItem'

import nachos from '../data/nachos'
export default () => {
    return (
        <SafeAreaView>
            <ScrollView>
            {nachos.map((item, index)=>(
                <React.Fragment key={item.id}>
                    <ListItem 
                    name={item.name} 
                    onFavouritePress={() => alert('todo: handle favorite')}
                    isFavourite={index < 2} 
                    />
                    <Separator />
                </React.Fragment>
            )
            )}
            </ScrollView>
        </SafeAreaView>

    )

};