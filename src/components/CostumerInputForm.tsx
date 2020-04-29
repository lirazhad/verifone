import React, {useEffect, useState} from 'react';
import { View, TextInput, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {useTranslation} from 'react-i18next'
import { inject, observer } from 'mobx-react'
import { getDeviceImagesPath } from '../constants/utils'
import {images} from '../../assets/images'
import { Colors } from '../styles'

interface IProps {
    headline: string
    placeHolder: string
    onChangeText: () => void
}

const CostumerInputForm: React.FC<IProps> = inject("itemStore")(observer(({headline, placeHolder})=> {

    const {t} = useTranslation();


    useEffect(() => {
    }, []);

    return (
      <View style={styles.mainContainer}>  
        <View style={styles.section}> 
            <View style={styles.headline}>
                <Text style={styles.headlineText}>{headline}</Text>
            </View>
            <View style={styles.inputTextContainer}>
                <TextInput placeholder={placeHolder} style={styles.inputText}/>
            </View>
        </View> 
        <View style={styles.starContainer}>
          <Text style={styles.star}>{'*'}</Text>
        </View>
      </View>
    );
}));


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    section: {
        flex: 22, 
        flexDirection: 'column',
        height: 110,
        padding: 8
    },
    headlineText: {
        fontSize: 18
    },
    headline: {
        flex: 2,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    inputTextContainer: {
        flex: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputText: {
        flex: 10,
        height: 56,
        borderRadius: 8,
        padding: 12,
        backgroundColor: Colors.WHITE,
        textAlign: 'right'
    },
    star: {
        marginTop: 28,
        fontSize: 33,
        color: Colors.BUTTON_BLUE
    },
    starContainer: {
        flex: 1,
        margin: 8,
        justifyContent: 'center',
        alignItems: 'center'
    }
})


export default CostumerInputForm;
