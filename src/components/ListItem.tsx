import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native';
import { screenWidth } from '../constants/utils'
import {images} from '../../assets/images';

interface ListItemObject {
    id: number;
    name: string;
    images: string[];
    categories: string[];
    price: number;
    pricingDescription: string;
}
interface IProps {
    item: ListItemObject
    isSelected: boolean
    onSelect: () => void
}

const ListItem: React.FC<IProps> = ({item, isSelected, onSelect}) => {

    return (
       <View style={styles.container}>
           <Text>{item.id}</Text>
           <Image 
            resizeMode="contain"
            style={styles.buttonImage}
            source={images.addToCart}
            />
           <Text>{'product name'}</Text>   
           <View style={styles.buttonWrapper}>
            <Image 
            resizeMode="contain"
            style={styles.buttonImage}
            source={images.addToCart}
            />
           </View>
       </View>
    );
};


const styles = StyleSheet.create({
    container: {
        width: screenWidth/3 , 
        backgroundColor: 'red',
        height: 250, 
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 3,
        padding: 8
    },
    buttonWrapper: {
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        width: 24,
        height: 24,
    },
    buttonImage:{
        width: '100%',
    },
    textStyle: {
       fontSize: 16,
       color: 'red'
    }
  })


export default ListItem;
