import React, {useEffect} from 'react';
import { View, FlatList, Text, StyleSheet, ScrollView } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '../../styles';
import {NavigationScreenProp} from 'react-navigation';
import {AppDispatch} from '../../services/store';
import {RootState} from '../../services/rootReducer';
import MainHeader from '../../components/MainHeader'
import {NavigationStackProp} from 'react-navigation-stack';
import {useTranslation} from 'react-i18next'
import CartHeader from '../../components/CartHeader'
import { observer } from 'mobx-react'
import CartItem from '../../components/CartItem'

interface IProps extends NavigationScreenProp<object> {
    navigation: NavigationStackProp<null>
}

const CartScreen: React.FC<IProps> = observer(({navigation}) => {

    const {t} = useTranslation();

    const { clearCart, cartItems } = navigation.state.params

    useEffect(() => {}, []);

    return (
        <View style={{flexDirection: 'column', width: '100%', height: '100%', alignItems: 'flex-start'}}>
        <MainHeader
        backButton={()=>navigation.pop()}
        headline={t('productsForEstimation')} />
        <CartHeader 
        itemsAmount={cartItems.length}
        clearCart={clearCart}/>
        <View style={styles.header}>
            <View style={styles.leftHeadline}>
                <Text style={styles.headerText}>{t('priceAndDicount')}</Text>
            </View>
            <View style={styles.rightHeadline}>
                 <Text style={styles.headerText}>{t('product')}</Text>
            </View>
           
            
        </View>
        <ScrollView style={styles.scrollView}>
            <FlatList
              data={cartItems}
              renderItem={(item: any) => <CartItem cartItem={item.item}/>} />   
        </ScrollView>
        </View>
    );
});


const styles = StyleSheet.create({
    mainContainer: {
        width: '100%' , 
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 8
    },
    header: {
        flexDirection: 'row',
        backgroundColor: Colors.SKY_BLUE,
        width: '100%'
    },
    leftHeadline: {
        flex: 1,
        marginVertical: 6,
        marginHorizontal: 70,
        justifyContent: 'center'
    },
    rightHeadline: {
        flex: 1,
        marginVertical: 6,
        marginHorizontal: 70,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 16,
        color: Colors.WHITE,
        fontWeight: '700'
    },
    cartIcon:{
        width: 24, 
        height: 24,
        margin: 12
    },
    scrollView: {
        width: '100%',
        height: '100%'        
    }
})


export default CartScreen;
