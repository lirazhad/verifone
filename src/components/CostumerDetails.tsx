import React, {useEffect, useState} from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
       
        <View style={{marginLeft: 18}}>
           <CostumerInputForm 
            headline={t('companyName')}
            placeHolder={'jhh'}
            onChangeText={()=>{}}
           /> 
        </View>

        <View style={styles.section}>
            <RadioButtons onChange={(selected)=>{ console.warn(selected)}} />
        </View>
        
        <View style={styles.section}>
            <Text style={styles.text}>{t('comment')}</Text>
        </View>

        <View style={styles.section}>
            <TextInput  multiline={true} style={styles.input}/>
        </View>

        <TouchableOpacity style={styles.section}>
           <View style={styles.submitButton}>
                <Text style={styles.buttonText}>{t('submitQuote')}</Text>
           </View>
        </TouchableOpacity>
      </View> 
    );
}));


const styles = StyleSheet.create({
    container: {
        width: '100%' , 
        flexDirection: 'column',
        backgroundColor: Colors.PALE_BLUE,
        padding: 12
    },
    section: {
        width: '100%' , 
        flexDirection: 'row',
        paddingHorizontal: 18,
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
    },
    text: {
        fontSize: 20,
        marginVertical: 12
    },
    input: {
        width: '100%',
        backgroundColor: Colors.WHITE,
        height: 170,
        marginVertical: 12,
        borderRadius: 12,
        padding: 12
    },
    submitButton: {
        height: 72,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.BUTTON_BLUE,
        marginVertical: 18,
        borderRadius: 6,
    },
    buttonText: {
        color: Colors.WHITE,
        fontSize: 20
    }
})


export default CostumerDetails;
