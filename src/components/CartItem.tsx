import React, {useEffect, useState} from 'react';
import { View, TextInput, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {useTranslation} from 'react-i18next'
import { inject, observer } from 'mobx-react'
import { getDeviceImagesPath } from '../constants/utils'
import {images} from '../../assets/images'
import { Colors } from '../styles'
import { Dropdown } from 'react-native-material-dropdown'

interface IProps {
    cartItem: any
    itemStore: any
}

const CartItem: React.FC<IProps> = inject("itemStore")(observer(({cartItem, itemStore})=> {

    const {t} = useTranslation();

    const [quantity, setQuantity] = useState(1);
    const [discount, setDiscount] = useState('0');
    const [price, setPrice] = useState(0);


    let itemImages: any = getDeviceImagesPath(cartItem.images)

    //console.warn(cartItem)

    const fieldItem = () => {
        return(
            <View style={styles.fieldItemMainContainer}>
                <Text>{'headline'}</Text>
                <View style={styles.fieldItemContainer}>
                    <Text>{'price'}</Text>
                </View>
            </View>
        )
    }

    useEffect(() => {
        //itemStore.setRentSale(cartItem.id)
    }, []);

    return (
      <View style={styles.container}> 
        <View style={styles.mainContainer}>

            <View style={styles.deleteContainer}>
                    <TouchableOpacity 
                    onPress={()=>{
                        itemStore.addToCart(true, cartItem)
                    }}
                    style={{
                        width: 32, 
                        alignItems: 'center',
                        justifyContent: 'center',
                        }}>
                        <View style={{width: 24, height: 24}}>
                            <Image
                                style={{width: '100%', height: '100%'}}
                                resizeMode="contain"
                                source={images.delete}
                                />
                        </View>  
                    </TouchableOpacity>
            </View>
               <View style={styles.dataContainer}>
                   <View style={{flexDirection: 'row', width: '100%'}}>
                        <View style={styles.cardSectionLeft}>
                            <View style={styles.fields}>
                                
                                    {fieldItem()}
                                    {fieldItem()}
                                    {fieldItem()}
                                    {fieldItem()}
                                    {fieldItem()}
                             
                            </View>

                            <View style={styles.discountView}>
                                        <Text style={styles.discountTextTotal}>{'₪'}</Text>
                                        <Text style={styles.discountTextTotal}>{price}</Text>

                                    <View style={styles.fieldDiscountContainer}>
                                        <Text style={styles.discountText}>{'-'}</Text>
                                        <TextInput 
                                        onChangeText={(text)=>{
                                            
                                            setDiscount(text)
                                        }}
                                        maxLength={2}
                                        keyboardType='numeric'
                                        style={styles.discountText}>
                                            {discount}
                                        </TextInput>
                                        <Text style={styles.discountText}>{'%'}</Text>
                                    </View>
                                    <Text style={styles.discountText}>{t('discount')}</Text>
                                </View>

                        <View style={styles.discountView}>
                            <View style={styles.calcView}>
                                <Text>{'₪'}</Text>
                                <Text >{'555'}</Text>
                            </View>  
                                <Text>{'x'}</Text>
                                <Text>{'1'}</Text>
                        </View>

                        <View style={styles.discountView}>
                            <View style={styles.calcView}>
                                 <Text style={styles.totalPriceText}>{'₪'}</Text>
                                <Text style={styles.totalPriceText}>{'555'}</Text>
                            </View>       
                        </View>

                        <View style={styles.discountView}>
                            <Text>{'service and lisence'}</Text>
                        </View>

                        <View style={styles.discountView}>
                            <Text>{'service and lisence'}</Text>
                        </View>
                    </View>

                    <View style={styles.cardSectionRight}>
                        <View style={styles.itemHeadline}>
                            <Dropdown
                            onChangeText={(value: string)=>{
                                itemStore.setRentSale(cartItem.id, value)
                            }}
                            value={t(cartItem.rentOrSale)}
                            containerStyle={{
                                width: 80, 
                                justifyContent: 'flex-start',
                            paddingBottom: 18}}
                            data={[{
                                value: t('rent'),
                                }, {
                                value: t('sale'),
                                }]}
                            />
                            <Text style={styles.itemNameText}>{cartItem.name}</Text>  
                        </View>

                        <View style={styles.itemCount}>
                            <TouchableOpacity 
                            onPress={()=>{
                                if(quantity > 1){
                                    setQuantity(quantity - 1)
                                }
                            }}>
                                <Image
                                    style={styles.iconImage}
                                    resizeMode="contain"
                                    source={images.minus}/>    
                            </TouchableOpacity>
                            <Text style={styles.counterText}>{quantity}</Text>
                            <TouchableOpacity
                            onPress={()=>{
                                setQuantity(quantity + 1)
                            }}>
                                <Image
                                    style={styles.iconImage}
                                    resizeMode="contain"
                                    source={images.plus}/>    
                            </TouchableOpacity>
                                
                        </View>

                        <View style={styles.description}>
                            <Text>{'item description'}</Text>
                        </View>
                    </View>
                    
                   </View>
                    
                    <View style={styles.comments}>
                            <Text>{'product comment'}</Text>
                    </View>
                </View>              
        <View style={styles.imageSection}>
                <Image
                style={styles.image}
                resizeMode="contain"
                source={{uri: itemImages[0]}}
                />                 
        </View>
            
        </View>


        <View style={styles.bottomLine}/>
    </View> 
    );
}));


const styles = StyleSheet.create({
    container: {
        flexDirection: 'column'
    },
    mainContainer: {
        width: '100%' , 
        marginVertical: 1,
        flexDirection: 'row'
    },
    cardSectionLeft: {
        flex: 2,
        alignItems: 'flex-start',
    },
    cardSectionRight: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    imageSection: {
        flex: 1,
        paddingRight: 20,
        flexDirection: 'column',
    },
    imageWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 160,
        height: 160
    },
    productDetails: {
        flex: 2,
        backgroundColor: 'green',
        height: 160
    },
    itemHeadline: {
        width: '100%',
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    itemNameText: {
        marginLeft: 12,
        fontSize: 18,
        width: '50%',
        fontWeight: '700'
    },
    itemCount: {
        width: '100%',
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    iconImage: {
        width: 32,
        height: 32
    }, 
    counterText: {
        fontSize: 20,
        marginHorizontal: 16
    },
    description: {
        width: '100%',
        padding: 12,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    comments: {
        width: '100%',
        padding: 12,
        marginVertical: 12,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: Colors.SKY_BLUE,
        backgroundColor: Colors.ICE_BLUE
    },
    fieldItemContainer: {
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 6,
        paddingHorizontal: 14,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: Colors.TEXT_FIELD_BORDER,
        backgroundColor: Colors.TEXT_FIELD_BACKGROUND
    },
    fieldItemMainContainer: {
        alignItems: 'center',
        marginVertical: 6
    },
    fields: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    bottomLine: {
        height: 1,
        backgroundColor: Colors.BLACK
    },
    discountView: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 4
    },
    discountText: {
        color: Colors.GREEN_TEXT,
        margin: 1
    },
    discountTextTotal: {
        color: Colors.GREEN_TEXT,
        margin: 1,
        fontWeight: '700'
    },
    calcView: {
        flexDirection: 'row',
    },
    totalPriceText: {
        fontSize: 18,
        fontWeight: '700'
    },
    fieldDiscountContainer: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 6,
        paddingHorizontal: 14,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: Colors.TEXT_FIELD_BORDER,
        backgroundColor: Colors.TEXT_FIELD_BACKGROUND
    },
    deleteContainer:{
        width: 40, 
        height: 96, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    dataContainer: {
        flexDirection: 'column', 
        flex: 4
    }
})


export default CartItem;
