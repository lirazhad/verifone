import React from 'react';
import {Colors} from '../styles';
import styled from 'styled-components/native';
import {FONT_BOLD} from '../styles/typography';
import {useTranslation} from 'react-i18next';
import {images} from '../../assets/images';
import {TouchableOpacity} from 'react-native';

interface IProps {
    itemsAmount: number;
    clearCart: () => void;
}

const CartHeader: React.FC<IProps> = ({itemsAmount, clearCart}) => {
    const {t} = useTranslation();
    return (
        <HeaderView>
            <TouchableOpacity onPress={clearCart}>
                <LeftHeaderContent>
                    <CartIcon source={images.delete} />
                    <HeaderText>{t('clearCart')}</HeaderText>
                </LeftHeaderContent>
            </TouchableOpacity>
            <RightHeaderContent>
                <HeaderText>
                    <TextWarper>{itemsAmount.toFixed()}</TextWarper>
                    {t('cartProductsAmount')}
                </HeaderText>
                <CartIcon source={images.blueCart} />
            </RightHeaderContent>
        </HeaderView>
    );
};

const CartIcon = styled.Image`
    width: 20px;
    height: 20px;
    resize-mode: contain;
`;
const TextWarper = styled.Text`
    margin-right: 10px;
`;

const HeaderView = styled.View`
    flex-direction:row
    background-color: ${Colors.WHITE};
    align-items: center;
    align-content:center
    flex:1
    width:100%
`;
const HeaderText = styled.Text`
    color: ${Colors.BLACK};
    margin: 20px 10px 20px 5px
    text-align: center;
    ${FONT_BOLD}
`;
const RightHeaderContent = styled.View`
    flex-direction:row
    align-items: center;
    justify-content:flex-start
    position:absolute
    right:50
`;

const LeftHeaderContent = styled.View`
    align-items: center;
    flex-direction:row
    margin-left:20px
`;

export default CartHeader;
