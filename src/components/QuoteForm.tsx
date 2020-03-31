import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {useTranslation} from 'react-i18next';
import {images} from '../../assets/images';
import {Colors} from '../styles';
import Input from './Input';
import RadioButtonsContainer from './RadioButton';
import Button from './Button';
import * as Yup from 'yup';
import {Formik, validateYupSchema} from 'formik';
import {object} from 'yup';
import {AppText} from '../styles/common';
import {submitQuote} from '../modules/cart/redux/cartSlice';
import {useSelector} from 'react-redux';
import {RootState} from '../services/rootReducer';

interface IProps {}

interface QuoteForm {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    companyName: string;
    sendTo?: string;
    comment?: string;
}

const QuoteForm: React.FC<IProps> = ({}) => {
    const phoneRegExp = /^05\d([-]{0,1})\d{7}$/;
    const {t} = useTranslation();
    const agentEmail = useSelector((state: RootState) => {
        state.userSession.user ? state.userSession.user.email : null;
    });
    const QuoteFormSchema = Yup.object().shape({
        sandTo: Yup.string().required(),
        email: Yup.string()
            .email()
            .when('sendTo', {
                is: 'EMAIL',
                then: Yup.string()
                    .email()
                    .required(),
                otherwise: Yup.string().notRequired()
            }),
        phone: Yup.string()
            .matches(phoneRegExp, 'Phone number is not valid')
            .when('sendTo', {
                is: 'SMS',
                then: Yup.string().required(),
                otherwise: Yup.string().notRequired()
            }),
        firstName: Yup.string()
            .min(2)
            .max(10)
            .required(),
        lastName: Yup.string()
            .min(2)
            .max(10)
            .required(),
        companyName: Yup.string()
            .min(2)
            .max(20)
            .required(),
        sendTo: Yup.string().oneOf(['SMS', 'EMAIL']),
        comment: Yup.string()
    });
    const initialValues: QuoteForm = {
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        sendTo: 'SMS',
        comment: '',
        companyName: ''
    };
    return (
        <CardWrapper>
            <FormContainer>
                <QuoteHeader>
                    <ImageContainer source={images.detailsIcon} />
                    <TextContainer>{t('customerDetails')}</TextContainer>
                </QuoteHeader>
                <DetailsContainer>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={QuoteFormSchema}
                        onSubmit={({
                            email,
                            firstName,
                            lastName,
                            sendTo,
                            comment,
                            phone,
                            companyName
                        }) =>
                            submitQuote(
                                {firstName, lastName, companyName},
                                sendTo,
                                phone,
                                email,
                                agentEmail,
                                comment
                            )
                        }>
                        {({values, handleChange, handleSubmit, errors, touched, submitCount}) => (

                            <>
                                {Object.keys(errors).length > 0 && submitCount > 0 && (
                                    <ErrorContainer>
                                        <AppText bold color={Colors.WHITE}>
                                            something want
                                        </AppText>
                                    {console.log(errors)}
                                    </ErrorContainer>
                                )}
                                <Input
                                    color={Colors.BLACK}
                                    label={t('lastName')}
                                    onChangeText={handleChange('lastName')}
                                    placeholder={t('insert') + t('lastName')}
                                    width={'47%'}
                                    margin={'5px'}
                                    error={!!(errors.lastName && touched.lastName)}
                                    required
                                    placeholderTextColor={'rgba(49, 49, 49, 0.33)'}
                                />
                                <Input
                                    color={Colors.BLACK}
                                    label={t('fistName')}
                                    onChangeText={handleChange('firstName')}
                                    placeholder={t('insert') + t('fistName')}
                                    width={'47%'}
                                    margin={'5px'}
                                    error={!!(errors.firstName && touched.firstName)}
                                    required
                                    placeholderTextColor={'rgba(49, 49, 49, 0.33)'}
                                />

                                <Input
                                    color={Colors.BLACK}
                                    label={t('companyName')}
                                    onChangeText={handleChange('companyName')}
                                    placeholder={t('insert') + t('companyName')}
                                    width={'98%'}
                                    margin={'5px'}
                                    error={!!(errors.companyName && touched.companyName)}
                                    required
                                    placeholderTextColor={'rgba(49, 49, 49, 0.33)'}
                                />
                                <RadioButtonsContainer onChange={handleChange('sendTo')} />
                                <Input
                                    color={Colors.BLACK}
                                    label={t('email')}
                                    onChangeText={handleChange('email')}
                                    placeholder={t('insert') + t('email')}
                                    width={'47%'}
                                    margin={'5px'}
                                    error={!!(errors.email && touched.email)}
                                    required={values.sendTo === 'EMAIL'}
                                    inputMarker={values.sendTo === 'EMAIL'}
                                    placeholderTextColor={'rgba(49, 49, 49, 0.33)'}
                                />
                                <Input
                                    color={Colors.BLACK}
                                    label={t('phone')}
                                    onChangeText={handleChange('phone')}
                                    placeholder={t('insert') + t('phone')}
                                    width={'47%'}
                                    margin={'5px'}
                                    error={!!(errors.phone && touched.phone)}
                                    required={values.sendTo === 'SMS'}
                                    inputMarker={values.sendTo === 'SMS'}
                                    placeholderTextColor={'rgba(49, 49, 49, 0.33)'}
                                />

                                <Input
                                    color={Colors.BLACK}
                                    label={t('comment')}
                                    onChangeText={handleChange('comment')}
                                    error={!!(errors.comment && touched.comment)}
                                    placeholder={''}
                                    width={'98%'}
                                    multiline
                                    height={'100px'}
                                    margin={'30px 0 0 0 '}
                                />
                                <Button
                                    text={t('submitQuote')}
                                    onPress={handleSubmit}
                                    backgroundColor={Colors.BUTTON_BLUE}
                                />
                            </>
                        )}
                    </Formik>
                </DetailsContainer>
            </FormContainer>
        </CardWrapper>
    );
};
const FormContainer = styled.View`
    margin: 20px;
`;

const ErrorContainer = styled.View`
    background-color: ${Colors.red};
    height: 50px;
    align-content: center;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 10px 0;
    z-index: 1;
`;

const TextContainer = styled.Text`
    margin-right: 10px;
    font-size: 20px;
`;

const DetailsContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
`;

const QuoteHeader = styled.View`
    flex-direction: row-reverse;
    align-items: center;
    margin: 5px;
`;

const ImageContainer = styled.Image`
    width: 30px;
    height: 30px;
    resize-mode: contain;
`;
const CardWrapper = styled.View`

    background-color:${Colors.FORM_BACKGROUND_COLOR}
    flex:1;
     width:100%;
`;

export default QuoteForm;
