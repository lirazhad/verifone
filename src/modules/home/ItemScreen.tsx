import React from 'react';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '../../styles';
import {NavigationScreenProp} from 'react-navigation';
import {AppDispatch} from '../../services/store';
import Header from '../../components/Header';
import {NavigationStackProp} from 'react-navigation-stack';
import ImagesBar from '../../components/ImagesBar';
import {useTranslation} from 'react-i18next';
import {AppText} from '../../styles/common';
import {images} from '../../../assets/images';
import Button from '../../components/Button';
import {addToCart} from '../cart/redux/cartSlice';
import {RootState} from '../../services/rootReducer';

interface IProps extends NavigationScreenProp<object> {
    navigation: NavigationStackProp<null>;
}

const ItemScreen: React.FC<IProps> = ({navigation}) => {

    const dispatch: AppDispatch = useDispatch();
    const item = navigation.getParam('item');
    const {t} = useTranslation();
    const isAddedToCart = !!useSelector((state: RootState) => state.cart.cartItems[item.id]);

    return (
        <>
            <HomeHeaderContainer>
                <Header variant={'ITEM'} backgroundColor={Colors.HEADER_COLOR} />
            </HomeHeaderContainer>
            <SafeContainer>
                <ImagesBar imageUrl={item.images[0]} />
                <ControllersContainer>
                    <AppText>{t('pdfText')}</AppText>

                    <Image360Container source={images.icon360} />
                    <AppText>{t('image360')}</AppText>
                    <Button
                        isAddedToCart={isAddedToCart}
                        width={200}
                        variant={'ITEM_SCREEN'}
                        backgroundColor={Colors.BUTTON_BLUE}
                        text={isAddedToCart ? t('addedToTheCart') : t('addToTheQuoteCart')}
                        onPress={() => {
                            dispatch(addToCart(item));
                        }}
                        disabled={isAddedToCart}
                    />
                </ControllersContainer>
            </SafeContainer>
        </>
    );
};
const HomeHeaderContainer = styled.View`
    margin-top: 20px;
    height: 50px;
`;
const Image360Container = styled.Image`
    width: 20px;
    height: 20px;
    height: 20px;
    resize-mode: contain;
`;
const SafeContainer = styled.SafeAreaView`
    flex: 1;
    background-color: ${Colors.WHITE};
`;

const ItemsContainer = styled.View`
    flex-direction: row;
    flex-flow: row wrap;
    flex: 1;
    width: 100%;
    align-items: center;
    justify-content: space-around;
`;

const ControllersContainer = styled.View`
    flex: 1;
    width: 100%;
    flex-direction: row-reverse;
    align-content: center;
    justify-content: space-between;
`;

export default ItemScreen;
