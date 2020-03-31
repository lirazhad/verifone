import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {images} from '../../assets/images/index';
import {StyleSheet, TouchableOpacity} from 'react-native';
import NavigationServices, {navigate} from '../services/NavigationServices';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, removeFromCart} from '../modules/cart/redux/cartSlice';
import {RootState} from '../services/rootReducer';

interface Item {
    id: number;
    name: string;
    images: string[];
    categories: string[];
    price: number;
    pricingDescription: string;
}
interface IProps {
    imageUrl: string;
    name: string;
    id: number;
    item: Item;
    onSelect: () => void
}

const CardItem: React.FC<IProps> = ({imageUrl, name, item, id,onSelect}) => {
    const dispatch = useDispatch();
    const isAddedToCart = !!useSelector((state: RootState) => state.cart.cartItems[id]);

    return (
        <Container>
            <TouchableOpacity
                onPress={onSelect}>
                <ItemImage source={{uri: imageUrl}} />
            </TouchableOpacity>
            <ItemName>{name}</ItemName>
            <TouchableOpacity
                onPress={() => {
                    isAddedToCart ? dispatch(removeFromCart(id)) : dispatch(addToCart(item));
                }}>
                <AddToCartButton source={isAddedToCart ? images.addedToCart : images.addToCart} />
            </TouchableOpacity>
        </Container>
    );
};

const AddToCartButton = styled.Image`
    width: 20px;
    height: 20px;
    margin:10px 0 10px 0;
    resize-mode: contain;
`;
const ItemName = styled.Text`
    margin: 10px 0 10px 0;
    flex-shrink: 0;
    flex-grow: 0;
`;

const ItemImage = styled.Image`
    width: 80px;
    height: 90px;
    resize-mode: contain;
`;
const Container = styled.View`
    align-items: center;
    margin: 15px 30px 15px 30px;
    flex-shrink: 0;
    flex-grow: 0;
    flex-basis: 100px;
`;

export default CardItem;
