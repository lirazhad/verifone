import React, {useEffect, useState} from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import {Colors} from '../../styles';
import {NavigationScreenProp} from 'react-navigation';
import {NavigationStackProp} from 'react-navigation-stack';
import {useTranslation} from 'react-i18next';
import { observer } from 'mobx-react'
import MainHeader from '../../components/MainHeader'
import NavigationService from '../../services/NavigationServices';
import { screenHeight } from '../../constants/utils'
import {images} from '../../../assets/images'

interface IProps extends NavigationScreenProp<object> {
    navigation: NavigationStackProp<null>;
}


const ItemScreen: React.FC<IProps> = observer(({}) => {
    const [isSale, setSale] = useState(true);

    const {t} = useTranslation();

    return (
        <>
        <MainHeader
        logout={() => NavigationService.navigate("HomeScreen")}
        headline={t('products')} 
        showCart={true}
        itemsInCart={0}/>
        <ScrollView style={styles.scrollView}>
            <View style={styles.mainImage}>

            </View>
            <View style={styles.actionBar}>
                
                <View style={styles.addToCartButton}>
                    <TouchableOpacity onPress={() => {}}>
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
            <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. hjhjhj jhjhjh jhjhjh jhjhjh
            hghghghh uyuyfgf tfghju yghghj
            </Text>
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
          width: '100%',
          backgroundColor: 'red'  
        },
        scrollView: {
          flexDirection: 'column'
        },
        text: {
          fontSize: 42,
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
        }
      });
      


// const ItemScreen: React.FC<IProps> = ({navigation}) => {

//     const dispatch: AppDispatch = useDispatch();
//     const item = navigation.getParam('item');
//     const {t} = useTranslation();
//     const isAddedToCart = !!useSelector((state: RootState) => state.cart.cartItems[item.id]);

//     return (
//         <>
//             <HomeHeaderContainer>
//                 <Header variant={'ITEM'} backgroundColor={Colors.HEADER_COLOR} />
//             </HomeHeaderContainer>
//             <SafeContainer>
//                 <ImagesBar imageUrl={item.images[0]} />
//                 <ControllersContainer>
//                     <AppText>{t('pdfText')}</AppText>

//                     <Image360Container source={images.icon360} />
//                     <AppText>{t('image360')}</AppText>
//                     <Button
//                         isAddedToCart={isAddedToCart}
//                         width={200}
//                         variant={'ITEM_SCREEN'}
//                         backgroundColor={Colors.BUTTON_BLUE}
//                         text={isAddedToCart ? t('addedToTheCart') : t('addToTheQuoteCart')}
//                         onPress={() => {
//                             dispatch(addToCart(item));
//                         }}
//                         disabled={isAddedToCart}
//                     />
//                 </ControllersContainer>
//             </SafeContainer>
//         </>
//     );
// };


export default ItemScreen;
