import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {images} from '../../assets/images/index';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, removeFromCart} from '../modules/cart/redux/cartSlice';
import {RootState} from '../services/rootReducer';
import {Item} from "react-navigation-header-buttons";

interface CartItem {
    id: number;
    name: string;
    images: any;
    totalPrice: number;
    price: number;
    itemsAmount: number;
    discount:number
}

interface IProps {
    item: CartItem
}
const CartItem: React.FC<IProps> = ({item}) => {

    return (
        <CardWrapper>

        </CardWrapper>
    );
};

const AddToCartButton = styled.Image`
    width: 20px;
    height: 20px;
    margin:10px 0 10px 0 
    resize-mode: contain;
`;
const ItemNameContainer = styled.Text`
    margin: 10px 0 10px 0;
`;

const ItemImage = styled.Image`
    width: 80px;
    height: 90px;
    resize-mode: contain;
`;
const CardWrapper = styled.View`
    align-items: center;
    margin: 15px 30px 15px 30px;
`;

export default CartItem;
