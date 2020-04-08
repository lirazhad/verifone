import React from 'react';
import {Colors} from '../styles';
import styled from 'styled-components/native';
import {FONT_BOLD} from '../styles/typography';
import {useTranslation} from 'react-i18next';
import {images} from '../../assets/images';
import {TouchableOpacity, View, StyleSheet, Image, Text} from 'react-native';

interface IProps {
    itemsAmount: number;
    clearCart: () => void;
}

const CartHeader: React.FC<IProps> = ({itemsAmount, clearCart}) => {
    const {t} = useTranslation();
    return (
        <View style={styles.mainContainer}>
            <View style={{flex: 1, height: '100%', marginRight: 12, alignItems: 'flex-start'}}> 
                <TouchableOpacity 
                onPress={clearCart}
                style={{
                    width: 80, 
                    height: '100%', 
                    alignItems: 'center',
                    justifyContent: 'center',
                    }}>
                        <Text>{t('clearCart')}</Text>
                    <View style={{width: 24, height: 24, margin: 6}}>
                        <Image
                            style={{width: '100%', height: '100%'}}
                            resizeMode="contain"
                            source={images.delete}
                            />
                    </View>  
                </TouchableOpacity>
            </View>

            <View style={{flex: 1, height: '100%', marginRight: 12, alignItems: 'flex-end'}}> 
                
                    <View  style={{
                    height: '100%', 
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row'
                    }}>
                     <Text style={styles.headerText}>{t('cartProductsAmount')}</Text>
                     <Text style={styles.headerText}>{itemsAmount}</Text>
                        <Image
                            style={styles.cartIcon}
                            resizeMode="contain"
                            source={images.blueCart}
                            />
                    </View>  
            </View>
        </View>
        // <HeaderView>
        //     <TouchableOpacity onPress={clearCart}>
        //         <LeftHeaderContent>
        //             <CartIcon source={images.delete} />
        //             <HeaderText>{t('clearCart')}</HeaderText>
        //         </LeftHeaderContent>
        //     </TouchableOpacity>
        //     <RightHeaderContent>
        //         <HeaderText>
        //             <TextWarper>{itemsAmount.toFixed()}</TextWarper>
        //             {t('cartProductsAmount')}
        //         </HeaderText>
        //         <CartIcon source={images.blueCart} />
        //     </RightHeaderContent>
        // </HeaderView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%' , 
        height: 72, 
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 8
    },
    headerText: {
        fontSize: 20,
        margin: 4
    },
    cartIcon:{
        width: 24, 
        height: 24,
        margin: 12
    }
})

export default CartHeader;
