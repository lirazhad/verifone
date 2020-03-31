import React, {ReactNode} from 'react';
import styled from 'styled-components/native';
import {FONT_SIZE_16} from '../styles/typography';
import {ActivityIndicator, TouchableOpacityProps} from 'react-native';
import {Colors} from '../styles';
import {images} from '../../assets/images';
import {AppText} from '../styles/common';

interface IProps extends TouchableOpacityProps {
    text: string;
    width?: number;
    backgroundColor: string;
    height?: number;
    margin?: string;
    isLoading?: boolean;
    variant?: 'ITEM_SCREEN';
    isAddedToCart?: boolean;
}

const Button: React.FC<IProps> = ({
    isAddedToCart,
    variant,
    text,
    width,
    backgroundColor,
    height,
    margin,
    isLoading,
    ...props
}) => {

    return (
        <ButtonWrapper
            width={width}
            backgroundColor={isAddedToCart ? '#f0f0f0' : backgroundColor}
            height={height}
            margin={margin}
            disabled={isLoading || props.disabled}
            {...props}>
            {isLoading ? (
                <ActivityIndicator color={Colors.WHITE} />
            ) : (
                <ButtonContainer>
                    {variant === 'ITEM_SCREEN' && (
                        <AddToCartButtonImage
                            source={isAddedToCart ? images.addedToCart : images.plusBig}
                        />
                    )}
                    <AppText color={isAddedToCart ? Colors.BLACK : Colors.WHITE}>{text}</AppText>
                </ButtonContainer>
            )}
        </ButtonWrapper>
    );
};

interface WrapperProps {
    width?: number;
    backgroundColor: string;
    height?: number;
    margin?: string;
}

const ButtonWrapper = styled.TouchableOpacity`
    width: ${(props: WrapperProps) => props.width || '100%'};
    height: ${(props: WrapperProps) => props.height || '45px'};
    background-color: ${(props: WrapperProps) => props.backgroundColor};
    border-radius: 5px;
    border-color: black;
    align-items: center;
    justify-content: center;
    margin: ${(props: WrapperProps) => props.margin || 0};
`;
const ButtonContainer = styled.View`
    flex-direction: row-reverse;
    align-items: center;
    align-content: center;
    align-self: center;
`;
const AddToCartButtonImage = styled.Image`
    width: 20px;
    height: 20px;
    margin: 10px 0 10px 0;
    resize-mode: contain;
    color: ${Colors.WHITE};
    margin-left: 5px;
`;

const ButtonText = styled.Text`
    font-size: ${FONT_SIZE_16};
    color: white;
`;

export default Button;
