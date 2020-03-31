import React from "react";
import {Colors} from '../styles';
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
        <RadioButtonsContainer>
            <RadioForm
                radio_props={radio_props}
                initial={'SMS'}
                formHorizontal={true}
                labelHorizontal={true}
                buttonInnerColor={Colors.BUTTON_BLUE}
                animation={true}
                onPress={onChange}
            />
            <TextContainer>{t('sendQuoteTo')}</TextContainer>

        </RadioButtonsContainer>

    )
}


const RadioButtonsContainer = styled.View`
     width:100%;
     margin-top:15px;
     flex-direction:row;
     text-align: center;
     height: 45px;
     align-items:center;
     justify-content:flex-end;
`
const TextContainer = styled.Text`
   align-items:flex-end;
   margin-left:20px;
`


export default RadioButtons

