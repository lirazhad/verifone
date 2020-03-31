import React from 'react';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import Button from '../components/Button';
import {Colors} from '../styles';
import {useTranslation} from 'react-i18next';
import {images} from '../../assets/images';
import {AppText} from '../styles/common';
import {FONT_SIZE_24} from '../styles/typography';

interface IProps {
    visible: boolean;
    onModalClosed: () => void;
}

const PopupModal: React.FC<IProps> = ({visible, onModalClosed}) => {
    const {t} = useTranslation();
    return (
        <>
            <Modal  isVisible={visible}>
                <ModalWrapper>
                    <CloseModalWrapper
                        onPress={onModalClosed}>
                        <CloseModalImage source={images.closeModal} />
                    </CloseModalWrapper>
                    <NetImage source={images.noConnection} />
                    <NoConnectionText> {t('noAvailableConnection')}</NoConnectionText>
                    <NoConeectionText>
                        <AppText bold>{t('theQuoteHaveNotSentYet')}</AppText>
                        <AppText>{t('whenNetComeBackTheQuoteWillBeSent')}</AppText>
                    </NoConeectionText>
                    <Button
                        width={200}
                        backgroundColor={Colors.BUTTON_BLUE}
                        text={t('ok')}
                        onPress={onModalClosed}
                    />
                </ModalWrapper>
            </Modal>
        </>
    );
};

const NoConnectionText = styled.Text`
    font-size: ${FONT_SIZE_24};
`;
const NetImage = styled.Image`
    width: 30px;
    height: 30px;
    resize-mode: contain;
`;
const NoConeectionText = styled.View`
    align-items: center;
    padding: 15px 0 15px 0 ;

`
const CloseModalWrapper = styled.TouchableOpacity`
    position: absolute;
    top: 6px;
    left: 6px;
`;
const CloseModalImage = styled.Image`
    resize-mode: contain;
    margin:10px;
    width:30px;
    height:30px;
`;
const ModalWrapper = styled.View`
    background-color: ${Colors.WHITE};
    align-items: center;
    padding: 40px 0 40px 0 ;
    
        
`;

export default PopupModal;
