import React from 'react'

import { View, Text, SafeAreaView, ScrollView, FlatList } from 'react-native'

import ListItem, { Separator } from '../components/ListItem'

import nachos from '../data/nachos'
export default () => {
    return(
        <SafeAreaView>
            <FlatList 
            data={nachos}
            renderItem={({item, index}) => (
                <ListItem 
                name={item.name}
                onFavouritePress={() => alert('todo: handle favorite')}
                isFavourite={index < 2} 
                />
            )}
            keyExtractor={(item) => item.id} 
            ItemSeparatorComponent={() => <Separator />}
            />
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