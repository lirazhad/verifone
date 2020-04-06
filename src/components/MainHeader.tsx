import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native'
import { screenWidth } from '../constants/utils'
import {images} from '../../assets/images'
import { observer } from 'mobx-react'
import { Colors } from '../styles'
import {useTranslation} from 'react-i18next';

interface IProps {
    logout?: () => void 
    showCart?: boolean 
    itemsInCart?: number
    headline?: string
    backButton?: () => void
    cart?: () => void
    
}

const MainHeader: React.FC<IProps> = observer(({headline, backButton, cart, itemsInCart, showCart, logout}) => {
    const {t} = useTranslation();

    return (
       <View style={styles.container}>
          
           <View style={{flex: 1, height: '100%', marginLeft: 14, alignItems: 'flex-start', justifyContent: 'center'}}>
           {logout &&<TouchableOpacity 
             onPress={logout} 
                style={{
                alignItems: 'center',
                justifyContent: 'center',
                }}>
                  <View style={{
                      width: 120, 
                      height: 30, 
                      flexDirection: 'row', 
                      alignItems: 'center',
                      justifyContent: 'center'}}>
                      <Image
                        style={{height: 20}}
                        resizeMode="contain"
                        source={images.exit}
                        />
                        <Text style={{color: Colors.SKY_BLUE, fontSize: 20}}>{t('logout')}</Text>
                  </View>  
            </TouchableOpacity>}

            {backButton &&<TouchableOpacity 
             onPress={backButton} 
                style={{
                alignItems: 'center',
                justifyContent: 'center',
                }}>
                      <Image
                        style={{height: 20}}
                        resizeMode="contain"
                        source={images.back}
                        />
            </TouchableOpacity>}
          </View>
          

          <View style={{flex: 1, height: '100%', margin: 4, alignItems: 'center', justifyContent: 'center'}}>
                {headline &&<Text style={{color: Colors.WHITE, fontSize: 22}}>{headline}</Text>}
          </View>

        <View style={{flex: 1, height: '100%', marginRight: 12, alignItems: 'flex-end'}}>
            {
             showCart &&   
            <TouchableOpacity style={{
                width: 80, 
                height: '100%', 
                alignItems: 'center',
                justifyContent: 'center',
                }}>
                  <View style={{width: 40, height: 40}}>
                      <Image
                        style={{width: '100%', height: '100%'}}
                        resizeMode="contain"
                        source={images.cart}
                        />
                        <View style={{
                            width: 20, 
                            height: 20,
                            borderRadius: 10, 
                            position: 'absolute', 
                            right: -15,
                            top: -3,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: Colors.BUTTON_BLUE}}>
                                <Text style={{color: Colors.WHITE}}>{itemsInCart}</Text>
                        </View>
                  </View>  
            </TouchableOpacity>
            }
        </View>
       </View>
    );
});


const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.HEADER_COLOR,
        width: '100%', 
        height: 64, 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginVertical: 3,
        paddingVertical: 8
    }
    ,
    imageWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 225,
        height: 353
    },
    buttonWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 54,
        height: 54,
    }
  })


export default MainHeader;
