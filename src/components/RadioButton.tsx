import React from "react";
import {Colors} from '../styles';
import { View, StyleSheet, Text } from 'react-native'
import styled from 'styled-components/native';
// @ts-ignore
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {useTranslation} from "react-i18next";

interface IProps {
    onChange: (method: string) => void

}

export enum SendTo {
    SMS = 'SMS',
    EMAIL = 'EMAIL',
}

const RadioButtons: React.FC<IProps> = ({onChange}) => {
    const {t} = useTranslation()
    const radio_props = [
        {label: 'SMS', value: SendTo.SMS},
        {label: 'מייל', value: SendTo.EMAIL}
    ];
    return (
        <View style={styles.container}>
            <RadioForm
                radio_props={radio_props}
                initial={'SMS'}
                formHorizontal={true}
                labelHorizontal={true}
                buttonInnerColor={Colors.BUTTON_BLUE}
                animation={true}
                onPress={onChange}
                buttonSize={40}
                labelStyle={{fontSize: 20, margin: 12}}
            />
            <Text style={styles.text}>{t('sendQuoteTo')}</Text>

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        height: 80, 
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'flex-end',
    },
    text: {
        fontSize: 20,
        marginBottom: 10,
        marginLeft: 40
    }
})

export default RadioButtons

