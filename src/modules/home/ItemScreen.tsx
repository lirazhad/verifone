import React, {useEffect, useState} from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native'
import {Colors} from '../../styles';
import {NavigationScreenProp} from 'react-navigation';
import {NavigationStackProp} from 'react-navigation-stack';
import {useTranslation} from 'react-i18next';
import { observer } from 'mobx-react'
import MainHeader from '../../components/MainHeader'
import NavigationService from '../../services/NavigationServices';
import { screenHeight, screenWidth } from '../../constants/utils'
import {images} from '../../../assets/images'
import { getDeviceImagesPath } from '../../constants/utils'
import ListItem from '../../components/ListItem'

interface IProps extends NavigationScreenProp<object> {
    navigation: NavigationStackProp<null>;
}

const ItemScreen: React.FC<IProps> = observer(({navigation}) => {
    const [isSale, setSale] = useState(true);

    const {t} = useTranslation();

    const { addToCart, item, itemStore } = navigation.state.params
    let itemImages: any = getDeviceImagesPath(item.images)

    const [relatedItems, setRelatedItems] = useState(true);

    // useEffect(()=>{
    //     item.relatedIds.forEach((relatedId: number) =>{

    //           // setRelatedItems from item store
    //     })
    // }, [])

    return (
        <>
        <MainHeader
        backButton={()=>navigation.pop()}
        showCart={true}
        itemsInCart={itemStore.cartItemNumber}/>
        <ScrollView style={styles.scrollView}>
            <View style={styles.mainImage}>
                <ScrollView horizontal>  
                {    
                itemImages.map((item: any, i: number) => {   
                    return  (<View style={{ height: '100%', padding: 20}}>
                    <Image
                    style={styles.pagerImage}
                    resizeMode="contain"
                    source={{uri: item}}
                    />
                    </View>)
                })
               }
                </ScrollView>
            </View>
            <View style={styles.actionBar}>
                
                <View style={styles.addToCartButton}>
                    <TouchableOpacity onPress={() => {
                        addToCart(
                            false, 
                            item, 
                            isSale? t('sale'): t('rent'))}}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>{t('addToTheQuoteCart')}</Text>
                            <Image
                            style={styles.buttonImage}
                            resizeMode="contain"
                            source={images.plusBig}
                            />  
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.viewer}>
                    <TouchableOpacity onPress={() => {}}>
                        <View style={styles.icon360}>
                            <Image
                            style={styles.Image360}
                            resizeMode="contain"
                            source={images.icon360}
                            />  
                            <Text style={styles.text360}>{t('image360')}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.pdf}>
                    <TouchableOpacity onPress={() => {}}>
                        <View style={styles.icon360}>
                            <Image
                            style={styles.Image360}
                            resizeMode="contain"
                            source={images.pdfIcon}
                            />  
                            <Text style={styles.text360}>{t('pdfText')}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.rentOrSale}>
                    <View style={styles.toggle}>
                        <TouchableOpacity onPress={() => {setSale(true)}}>
                            <View style={
                                [styles.toggleButtonLeft, 
                                    {backgroundColor: isSale? 
                                    Colors.FORM_BACKGROUND_COLOR: 
                                    Colors.HEADER_COLOR}]}>
                                <Text style={
                                    [styles.text360, 
                                    {color: isSale? 
                                    Colors.BLACK:
                                    Colors.WHITE}]}>{t('sale')}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {setSale(false)}}>
                            <View style={
                                    [styles.toggleButtonRight, 
                                    {backgroundColor: isSale?
                                    Colors.HEADER_COLOR:
                                    Colors.FORM_BACKGROUND_COLOR}]}>
                                <Text style={
                                    [styles.text360, 
                                    {color: isSale?
                                    Colors.WHITE:
                                    Colors.BLACK}]}>{t('rent')}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.description}>
                <Text style={styles.headline}>{item.name}</Text>
                <Text style={styles.text}>
                {item.shortDescription}
                </Text>  
            </View>

            
            {/* <FlatList
                data={item}
                numColumns={3}
                renderItem={(item: any) =>{
                return (
                <ListItem
                item={item.item} 
                onItemPress={()=>{
                    navigation.navigate('ItemScreen',
                    {
                    'item': item.item, 
                    'addToCart': itemStore.addToCart,
                    'itemStore': itemStore
                })}}
                onSelect={itemStore.addToCart}/>)
                }}
            /> */}
        </ScrollView>

        </>
    )})

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          marginTop: 10,
        },
        mainImage:{
          height: screenHeight/3,
          width: '100%'
        },
        scrollView: {
          flexDirection: 'column'
        },
        headline: {
            fontSize: 22,
            fontWeight: '700',
            textAlign: 'right'
          },
        description:{
            padding: 24
        }, 
        text: {
          fontSize: 14,
          textAlign: 'right'
        },
        actionBar: {
            height: 96,
            width: '100%',
            flexDirection: 'row',
        },
        addToCartButton: {
            flex: 5,
            padding: 12
        },
        viewer: {
            flex: 3,
            padding: 12
        },
        pdf: {
            flex: 2,
            padding: 12
        },
        rentOrSale: {
            flex: 4,
            padding: 12
        },
        button:{
            flexDirection: 'row',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            backgroundColor: Colors.BUTTON_BLUE,
            borderRadius: 6
        },
        buttonText: {
            fontSize: 20,
            color: Colors.WHITE
        },
        buttonImage: {
            width: 32,
            height: 32
        },
        icon360: {
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'space-evenly'
        },
        Image360: {
            width: 40,
            height: 40
        },
        text360: {
            fontSize: 20
        },
        toggle: {
            flexDirection: 'row',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
        },
        toggleButtonRight: {
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            borderBottomRightRadius: 6,
            borderTopRightRadius: 6
        },
        toggleButtonLeft: {
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            borderBottomLeftRadius: 6,
            borderTopLeftRadius: 6
        },
        pagerImage: {
            width: screenWidth,
            height: '100%'
        }
      });
      

export default ItemScreen;
