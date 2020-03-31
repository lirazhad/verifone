import styled from 'styled-components/native';
import {FONT_BOLD, FONT_SIZE_20} from './typography';
import {TextInputProps, TextProps, ViewProps} from 'react-native';
import {Colors} from './index';

export const Container = styled.View`
    flex:1;
    background-color:${Colors.BLACK};
    align-items:center;
    justify-content:center;
`;
export const SafeAreaContainer = styled.SafeAreaView`
    flex: 1;
    background-color: ${Colors.BLACK};
`;

export const HeaderText = styled.Text`
    font-size: ${FONT_SIZE_20};
    ${FONT_BOLD}
`;

export interface AppTextProps extends TextProps {
    margin?: string;
    bold?: boolean;
    fontSize?: number;
    textAlignCenter?: boolean;
    width?: number;
    color?: string;

}

export interface AppViewProps extends ViewProps {
    margin?: string;
    containerWidth?:string
}

export interface AppTextInputProps extends TextInputProps {
    inputHeight?:string
    inputMarker?:boolean
}

export const AppText = styled.Text`
    margin: ${(props: AppTextProps) => props.margin || 0}
    color:${(props: AppTextProps) => props.color || Colors.BLACK}
    ${(props: AppTextProps) => (props.bold ? FONT_BOLD : '')};
        ${(props: AppTextProps) => (props.textAlignCenter ? 'text-align: center;' : '')};
        ${(props: AppTextProps) => (props.width ? `width: ${props.width}px;` : '')};
          ${(props: AppTextProps) => (props.fontSize ? `font-size: ${props.fontSize}px;` : '')}
        
`;
