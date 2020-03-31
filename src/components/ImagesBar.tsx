import React from 'react';
import styled from 'styled-components/native';

interface IProps {
    imageUrl: string;
}

const ImagesBar: React.FC<IProps> = ({imageUrl}) => {
    return (
        <ImagesBarContainer horizontal>
            <ImageContainer>
                <ItemImage source={{uri: imageUrl}} />
            </ImageContainer>
        </ImagesBarContainer>
    );
};

const ImagesBarContainer = styled.ScrollView`
    flex: 1;
    margin-top: 15px;
`;
const ImageContainer = styled.View`
    margin: 15px 30px 15px 30px;
    flex-shrink: 0;
    flex-grow: 0;
    flex-basis: 200px;
`;
const ItemImage = styled.Image`
    width: 200px;
    height: 200px;
    resize-mode: contain;
    justify-content: center;
`;

export default ImagesBar;
