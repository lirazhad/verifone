import React, {useEffect, useState} from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {useTranslation} from 'react-i18next'
import { inject, observer } from 'mobx-react'
import { getDeviceImagesPath } from '../constants/utils'
import {images} from '../../assets/images'
import { Colors } from '../styles'
import CostumerInputForm from './CostumerInputForm'
import RadioButtons from '../components/RadioButton'
import DateTimePicker from '@react-native-community/datetimepicker';


interface IProps {

}

const CostumerDetails: React.FC<IProps> = inject("itemStore")(observer(({})=> {

    const {t} = useTranslation();

    const [validationDate, setValidationDate] = useState('');

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
      };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
      };
    
      const showDatepicker = () => {
        showMode('date');
      };

    useEffect(() => {
        const today = new Date();
        const date = today.getDate() + "/"+ parseInt(today.getMonth()+1) +"/"+ today.getFullYear();
        setValidationDate(date)
    }, []);

    return (
     <>   
      <View style={styles.container}> 
        <View style={styles.section}>
            <TouchableOpacity 
            onPress={showDatepicker}
            style={styles.validationView}>
                <View style={styles.validationViewWrapper}>
                  <Image 
                  resizeMode="contain"
                  style={styles.icon}
                  source={images.edit}
                  />
                  <Text style={styles.validationViewText}>{validationDate}</Text>
                  <Text style={styles.validationViewText}>{t('validation') + ' :'}</Text>  
                </View>
                
            </TouchableOpacity>
            <View style={styles.headline}>
                <Text style={styles.headlineText}>{t('costumerDetails')}</Text>
            </View>
        </View>

        <View style={styles.section}>
           <CostumerInputForm 
            headline={t('lastName')}
            placeHolder={t('enterLastName')}
            onChangeText={()=>{}}
           />
           <CostumerInputForm 
            headline={t('firstName')}
            placeHolder={t('enterFirstName')}
            onChangeText={()=>{}}
           />
        </View>
       
        <View style={{marginLeft: 18}}>
           <CostumerInputForm 
            headline={t('companyName')}
            placeHolder={t('enterComponyName')}
            onChangeText={()=>{}}
           /> 
        </View>

        <View style={styles.section}>
            <RadioButtons onChange={(selected)=>{ console.warn(selected)}} />
        </View>

        <View style={styles.section}>
           <CostumerInputForm 
            headline={t('email')}
            placeHolder={t('enterEmail')}
            onChangeText={()=>{}}
           />
           <CostumerInputForm 
            headline={t('phone')}
            placeHolder={t('enterPhone')}
            onChangeText={()=>{}}
           />
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

      {show && (
             <View style={styles.datePicker}>
                <DateTimePicker
                testID="dateTimePicker"
                timeZoneOffsetInMinutes={0}
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
                />
                <TouchableOpacity 
                onPress={()=>setShow(false)}
                style={styles.buttonPicker}>
                    <Text>{'set'}</Text>
                </TouchableOpacity>
              </View>
      )}
      </>

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
        justifyContent: 'flex-end',
        margin: 12
    },
    validationView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        flexDirection: 'row'
    },
    validationViewWrapper: {
        backgroundColor: Colors.BLACK,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },
    validationViewText: {
        color: Colors.WHITE,
        padding: 8,
    },
    headline: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headlineText: {
        fontSize: 22
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
    },
    icon: {
        width: 24,
        height: 24,
        marginHorizontal: 12
    },
    datePicker: {
        width: '100%', 
        height: '100%', 
        backgroundColor: 
        Colors.ICE_BLUE, 
        position: 'absolute',
        justifyContent: 'center'
    },
    buttonPicker: {
        margin: 8,
        alignItems: 'center'
    }
})


export default CostumerDetails;
