import React from 'react';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '../../styles';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {useTranslation} from 'react-i18next';
import {images} from '../../../assets/images';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {AppText} from '../../styles/common';
import {WINDOW_WIDTH} from '../../styles/mixins';
import {login} from './redux/userSessionSlice';
import {AppDispatch} from '../../services/store';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {RootState} from '../../services/rootReducer';
import { itemStore } from '../../../App'

interface LoginForm {
    email: string;
    password: string;
}

const LoginScreen: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const {t} = useTranslation();
    const isSigningUp = useSelector((state: RootState) => state.userSession.isSigningUp);
    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email()
            .required(),
        password: Yup.string()
            .min(0)
            .max(100)
            .required()
    });
    const initialValues: LoginForm = {email: 'naomi@globalbit.co.il', password: 'ANqSnESL$H)$NudMibcbIXpM'};
    return (
    <>
                <LoginBackground source={images.splash} />

                <Content>
                    <LoginFrom>
                        <ImageContainer>
                            <LoginLogoImage source={images.loginLogo} />
                        </ImageContainer>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={LoginSchema}
                            onSubmit={({email, password}) => {
                                itemStore.init()
                                dispatch(login({email, password}))
                                }}>
                            {({
                                values,
                                handleChange,
                                handleSubmit,
                                errors,
                                touched,
                                submitCount
                            }) => (
                                <>
                                    {Object.keys(errors).length > 0 && submitCount > 0 && (
                                        <ErrorContainer>
                                            <AppText color={Colors.WHITE}>
                                                {'please enter a valid email'}
                                            </AppText>
                                        </ErrorContainer>
                                    )}
                                    <Input
                                        onChangeText={handleChange('email')}
                                        value={values.email}
                                        label={t('email')}
                                        placeholder={t('enterAEmail')}
                                        error={!!(errors.email && touched.email)}
                                        color={Colors.WHITE}
                                        width={'100%'}
                                    />
                                    <Input
                                        onChangeText={handleChange('password')}
                                        value={values.password}
                                        label={t('password')}
                                        placeholder={t('enterAPassword')}
                                        secureTextEntry
                                        error={!!(errors.password && touched.password)}
                                        color={Colors.WHITE}
                                        width={'100%'}
                                    />
                                    <Button
                                        isLoading={isSigningUp}
                                        onPress={handleSubmit}
                                        text={t('logIn')}
                                        backgroundColor={Colors.BUTTON_BLUE}
                                        margin="30px 0 0 0"
                                        disabled={isSigningUp}
                                    />
                                </>
                            )}
                        </Formik>
                        <BottomTextContainer>
                            <AppText margin={'1px'} color={Colors.WHITE}>
                                {t('dontYouHaveAuser')}
                            </AppText>
                            <AppText margin={'2px'} color={Colors.WHITE}>
                                {t('forOpenAnAccount')}
                            </AppText>
                        </BottomTextContainer>
                    </LoginFrom>
                </Content>
</>
    );
};
const LoginBackground = styled.Image`
    height: 100%;
    width: 100%;
    flex: 1;
    resize-mode: cover;
    z-index: 1;
    position: absolute;
`;


const Content = styled.View`
    flex: 1;
    width: 100%;
    height: 100%;
    padding: 0 30px;
    align-items: center;
    z-index: 2;
    position: absolute;
    margin-top:30px ;
`;
const ErrorContainer = styled.View`
    background-color: red;
    height: 50px;
    width: ${WINDOW_WIDTH};
    align-items: center;
    justify-content: center;
    margin: 10px 0;
`;

const LoginFrom = styled.View`
    flex: 1;
    width: 60%;
    align-items: center;
`;

const LoginLogoImage = styled.Image`
    max-width: 100%;
    max-height: 100%;
    resize-mode: contain;
`;
const ImageContainer = styled.View`
    margin-left: 30px;
    margin-right: 30px;
`;
const BottomTextContainer = styled.View`
    margin-top: 25px;
    align-items: center;
`;

export default LoginScreen;
