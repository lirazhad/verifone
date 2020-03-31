import React from 'react';
import styled from 'styled-components/native';
import {AppText, AppTextInputProps, AppViewProps} from '../styles/common';
import {Colors} from '../styles';
import {TextInputProps} from 'react-native';

interface IProps extends TextInputProps {
    label: string;
    placeholder: string;
    error?: boolean;
    margin?: string;
    color: string;
    width: string;
    required?: boolean;
    height?: string;
    sendTo?: boolean;
}

const Input: React.FC<IProps> = ({
    sendTo,
    height,
    required,
    label,
    width,
    color,
    placeholder,
    error,
    margin,
    ...props
}) => {
    return (
        <Container containerWidth={width} containerMargin={margin}>
            <AppText color={color} margin="5px 0">
                {label}
            </AppText>
            <InputContainer>
                <TextInput
                    inputMarker={sendTo}
                    inputHeight={height}
                    placeholder={placeholder}
                    placeholderTextColor={error ? Colors.red : Colors.PLACEHOLDER_COLOR}
                    error={error}
                    {...props}
                />
                {required && (
                    <AppText color={Colors.BUTTON_BLUE} margin="0 0px 0 2px">
                        *
                    </AppText>
                )}
            </InputContainer>
        </Container>
    );
};

const Container = styled.View`
    ${(props: AppViewProps & {containerMargin?: string}) =>
        props.containerMargin &&
        `
    margin: ${props.containerMargin};
    `}
    ${(props: AppViewProps) =>
        `
     width: ${props.containerWidth}
    `}
    
    align-items:flex-end
`;
const InputContainer = styled.View`
    flex-direction:row
    align-items:center
`;

const TextInput = styled.TextInput`
    border: 2px ${Colors.WHITE};
    border-radius: 5px;
    width:100%
    height:${(props: AppTextInputProps) => props.inputHeight || '45px'};
    background-color: ${Colors.WHITE};
    text-align: center;
    ${(props: TextInputProps & {error?: boolean}) =>
        props.error &&
        `
    border-color: ${Colors.red};
    color: ${Colors.red}
    `}
    ${(props: TextInputProps & {inputMarker?: boolean}) =>
        props.inputMarker &&
        `
    border-color: ${Colors.BUTTON_BLUE};
   
    `}
    text-align: right;
`;
export default Input;
