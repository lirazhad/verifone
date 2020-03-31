import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '../../styles';
import {NavigationScreenProp} from 'react-navigation';
import {AppDispatch} from '../../services/store';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CartHeader from '../../components/CartHeader';
import {RootState} from '../../services/rootReducer';
import {clearCart} from './redux/cartSlice';
import QuoteForm from '../../components/QuoteForm';
import Header from '../../components/Header';

interface IProps extends NavigationScreenProp<object> {
    navigationOptions?: object;
    navigation?: object;
}

const CartScreen: React.FC<IProps> = ({navigation}) => {
    const dispatch: AppDispatch = useDispatch();
    const itemsAmount = useSelector((state: RootState) => state.cart.sumOfItems);

    useEffect(() => {}, []);

    return (
        <>
            <HomeHeaderContainer>
                <Header
                    text={'סל מוצרים להצעת מחיר'}
                    backgroundColor={Colors.HEADER_COLOR}
                    variant={'CART_SCREEN'}
                />
            </HomeHeaderContainer>

            <SafeContainer>
                <KeyboardAwareScrollView>
                    <CartHeader
                        itemsAmount={itemsAmount}
                        clearCart={() => {
                            dispatch(clearCart());
                        }}
                    />
                    <QuoteForm />
                </KeyboardAwareScrollView>
            </SafeContainer>
        </>
    );
};

const HomeHeaderContainer = styled.View`
    margin-top: 20px;
    height: 50px;
`;

const CartIcon = styled.Image`
    width: 20px;
    height: 20px;
    margin-right:10px;
    resize-mode: contain;
`;

const SafeContainer = styled.SafeAreaView`
    flex: 1;
    background-color: ${Colors.WHITE};
`;

const LogOutHeaderImage = styled.Image`
    width: 20px;
    height: 20px;
    margin-left:10px;
    resize-mode: contain;
    color:${Colors.SKY_BLUE}
`;

const LeftHeaderButton = styled.TouchableOpacity`
     flex-direction: row;
     justify-content:center
     align-items:center
     align-content:center

`;

const LeftHeaderButtonText = styled.Text`
    color: ${Colors.SKY_BLUE};
`;

const ItemsContainer = styled.View`
    flex-direction:row
    flex-flow: row wrap;
    flex: 1;
    width: 100%;
    margin: 0 30px;
    align-items: center;
    justify-content: flex-start

`;

export default CartScreen;
