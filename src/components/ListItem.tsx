import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native'
import { screenWidth } from '../constants/utils'
import {images} from '../../assets/images'
import { observer } from 'mobx-react'

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
    onSelect: (isSelected: boolean, item: ListItemObject) => void
}

const ListItem: React.FC<IProps> = observer(({item, onSelect}) => {
    const [isSelected, setSelected] = useState(false);
    return (
       <View style={styles.container}>
                <View style={styles.imageWrapper}>
                    <Image
                    resizeMode="contain"
                    style={styles.buttonImage}
                    source={{
                    uri: item.images[0],
                    }}/>
                </View>
                <View style={styles.nameWrapper}>
                   <Text style={styles.productName}>{item.name}</Text>    
                </View>
                <TouchableOpacity 
                onPress={()=>{
                    setSelected(!isSelected)
                    onSelect(isSelected, item)
                    }}>
                    <View style={styles.buttonWrapper}>
                        <Image 
                        resizeMode="contain"
                        style={styles.buttonImage}
                        source={isSelected? images.addedToCart: images.addToCart}
                        />
                    </View>
                </TouchableOpacity>
       </View>
    );
});


const styles = StyleSheet.create({
    container: {
        width: screenWidth/3 , 
        height: 380, 
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 3,
        padding: 8
    }
    ,
    imageWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 162,
        height: 180
    },
    buttonWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
    },
    buttonImage:{
        width: '100%',
        height: '100%',
        margin: 27
    },
    nameWrapper: {
        height: 110,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
     },
    productName: {
       fontSize: 22,
       margin: 8
    }
  })


export default ListItem;
