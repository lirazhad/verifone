import React from 'react';
import {Colors} from '../styles';
import styled from 'styled-components/native';
import {AppText, AppViewProps} from '../styles/common';
import {FONT_BOLD} from '../styles/typography';
import {images} from '../../assets/images';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {logout} from '../modules/auth/redux/userSessionSlice';
import NavigationService from '../services/NavigationServices';
import {RootState} from '../services/rootReducer';

interface IProps {
    text?: string;
    backgroundColor: string;
    cartLogoButton?: boolean;
    exitButton?: boolean;
    variant: 'HOME' | 'SUB_HOME' | 'CART_SCREEN' | 'ITEM';
}

const Header: React.FC<IProps> = ({variant, text, backgroundColor, cartLogoButton, exitButton}) => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const cartQuantity = useSelector((state: RootState) => state.cart.sumOfItems);
    return (
        <HeaderContainer color={backgroundColor}>
            {((variant === 'HOME') || (variant === 'ITEM')) && (  

                <RightHeaderButton
                    onPress={() => {
                        NavigationService.navigate('CartScreen');
                    }}>
                    <CartQuantityContainer>
                        <QuantityContainer>
                            <AppText fontSize={11} color={Colors.WHITE}>
                                {cartQuantity}
                            </AppText>
                        </QuantityContainer>
                        <CartIcon source={images.cart} />
                    </CartQuantityContainer>
                </RightHeaderButton>
            )}
            {(variant === 'CART_SCREEN') || (variant === 'ITEM') && (
                <LeftHeaderButton onPress={() => NavigationService.goBack()}>
                    <LogOutHeaderImage source={images.back} />
                </LeftHeaderButton>
            )}

            <HeaderText>{text}</HeaderText>

            {variant === 'HOME' && (
                <LeftHeaderButton
                    onPress={() => {
                        dispatch(logout());
                    }}>
                    <LogOutHeaderImage source={images.exit} />
                    <LeftHeaderButtonText>{t('logout')}</LeftHeaderButtonText>
                </LeftHeaderButton>
            )}
        </HeaderContainer>
    );
};
const CartIcon = styled.Image`
    width: 20px;
    height: 20px;
    margin-right: 10px;
    resize-mode: contain;
    position: absolute;
    right: 0;
`;
const CartQuantityContainer = styled.View``;
const QuantityContainer = styled.View`
    align-items: center;
    justify-content: center;
    align-content: center;
    margin: 3px;
    border-radius: 60px;
    width: 14px;
    height: 14px;
    z-index: 1;
    background: ${Colors.BUTTON_BLUE};
    position: absolute;
    top: -8px;
    right: -3px;
`;

const LogOutHeaderImage = styled.Image`
    width: 20px;
    height: 20px;
    margin-left: 10px;
    resize-mode: contain;
    color: ${Colors.SKY_BLUE};
    
`;
const LeftHeaderButtonText = styled.Text`
    color: ${Colors.SKY_BLUE};
`;

const LeftHeaderButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    align-content: center;
    position: absolute;
    left: 0;
`;

const RightHeaderButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    align-content: center;
    position: absolute;
    right: 5;
    top: 10px;
    margin: 5px;
`;

const HeaderContainer = styled.View`
    flex: 1;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
    justify-content: center;

    ${(props: AppViewProps & {color?: string}) => `background-color: ${props.color};`}
`;

const HeaderText = styled.Text`
    color: ${Colors.WHITE};
    align-items: center;
    text-align: center;
    justify-content: center;
    padding-top: 20px;
    padding-bottom: 20px;
    ${FONT_BOLD};
    width: 50%;
`;

export default Header;
