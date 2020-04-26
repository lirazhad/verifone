import React, {useEffect, useState} from 'react';
import { View, TextInput, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {useTranslation} from 'react-i18next'
import { inject, observer } from 'mobx-react'
import { getDeviceImagesPath } from '../constants/utils'
import {images} from '../../assets/images'
import { Colors } from '../styles'
import CostumerInputForm from './CostumerInputForm'
import RadioButtons from '../components/RadioButton'

interface IProps {

}

const CostumerDetails: React.FC<IProps> = inject("itemStore")(observer(({})=> {

    const {t} = useTranslation();


    useEffect(() => {
    }, []);

    return (
      <View style={styles.container}> 
        <View style={styles.section}>
            <TouchableOpacity style={styles.validationView}>
                <Text>{'date'}</Text>
            </TouchableOpacity>
            <View style={styles.headline}>
                <Text>{'costumer details'}</Text>
            </View>
        </View>

        <View style={styles.section}>
           <CostumerInputForm 
            headline={t('lastName')}
            placeHolder={'jhh'}
            onChangeText={()=>{}}
           />
           <CostumerInputForm 
            headline={t('firstName')}
            placeHolder={'jhh'}
            onChangeText={()=>{}}
           />
        </View>
       
        <View>
           <CostumerInputForm 
            headline={t('companyName')}
            placeHolder={'jhh'}
            onChangeText={()=>{}}
           /> 
        </View>

        <View style={styles.section}>
            <RadioButtons onChange={(selected)=>{ console.warn(selected)}} />
        </View>
        
      </View> 
    );
}));


const styles = StyleSheet.create({
    container: {
        width: '100%' , 
        flexDirection: 'column',
        backgroundColor: Colors.PALE_BLUE
    },
    section: {
        width: '100%' , 
        flexDirection: 'row',
        paddingRight: 18,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    validationView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 64
    },
    headline: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    name: {
        flex: 1,
        backgroundColor: 'red'
    }
})


export default CostumerDetails;
