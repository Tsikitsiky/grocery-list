import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import 'react-native-get-random-values';
import {v4 as uuid } from 'uuid';

const updateStoredCurrentList = (list) => {
    AsyncStorage.setItem('@@GroceryList/currentList', JSON.stringify(list));
}

const updateStoredCurrentCartList = (list) => {
    AsyncStorage.setItem('@@GroceryList/currentCart', JSON.stringify(list));
}

const updateStoredCurrentFavouriteList = (list) => {
    AsyncStorage.setItem('@@GroceryList/currentFavourite', JSON.stringify(list));
}

export const useCurrentList = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [favourites, setFavourites] = useState([]);

    const addItem = (text) => {
        const newList = [{id: uuid(), isFavourited: false, name: text}, ...list];
        setList(newList);
        updateStoredCurrentList(newList)
    }
    const removeItem = (id) => {
        const newList = list.filter(item => item.id !== id);
        setList(newList);
        updateStoredCurrentList(newList)
    }

    const addToCart = (item) => {
        const newCart = [item, ...cart];
        removeItem(item.id);
        setCart(newCart);
        updateStoredCurrentCartList(newCart)
    }

    const addToFavourite = (itemToFavour) => {
        const newList = list.map(item => {
            if (item.id === itemToFavour.id) {
				return {
					...item,
					isFavourited: !item.isFavourited,
				};
			}
			return item;
        })
        setList(newList);
        updateStoredCurrentList(newList);
        const favourited = list.find(item => item.id === itemToFavour.id);
        let newFavourite = [];
        if(favourited.isFavourited) {
            favourited.isFavourited = !favourited.isFavourited;
            newFavourite = favourites.filter(item => item.id !== favourited.id)
            // setFavourites(newFavourite);
            // updateStoredCurrentFavouriteList(newFavourite);
        } else {
            favourited.isFavourited = !favourited.isFavourited;
            newFavourite = [favourited, ...favourites];
            // setFavourites(newFavourite);
            // updateStoredCurrentFavouriteList(newFavourite);
        }
        setFavourites(newFavourite);
        updateStoredCurrentFavouriteList(newFavourite);
    }

    useEffect(() => {
        setTimeout(() => {
        Promise.all([
                AsyncStorage.getItem('@@GroceryList/currentList'),
                AsyncStorage.getItem('@@GroceryList/currentCart'),
                AsyncStorage.getItem('@@GroceryList/currentFavourite'),
            ])
        .then(([ list, cart, favourites ]) => [JSON.parse(list), JSON.parse(cart), JSON.parse(favourites)])
        .then(([ list, cart, favourites]) => {
            if(list) {
                setList(list)
            }

            if(cart) {
                setCart(cart)
            }

            if(favourites) {
                setFavourites(favourites)
            }

            setLoading(false);
        })
        }, 1000);
    }, []);
console.log("list", list);
console.log("cart", cart);
console.log("favourites", favourites);
    return {
        list,
        loading,
        addItem,
        removeItem,
        addToCart, 
        cart,
        favourites,
        addToFavourite,
    }
}