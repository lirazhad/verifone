import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '../../styles';
import {NavigationScreenProp} from 'react-navigation';
import {fetchItems} from './redux/homeSlice';
import {AppDispatch} from '../../services/store';
import Header from '../../components/Header';
import {RootState} from '../../services/rootReducer';
import CardItem from '../../components/ItemCard';
import {selectItemsGroupedByCategory} from './redux/homeSlice';
import _ from 'lodash';
import {logout} from '../auth/redux/userSessionSlice';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {NavigationStackProp} from 'react-navigation-stack';
import Example from "../../components/Example";

interface IProps extends NavigationScreenProp<object> {
    navigation: NavigationStackProp<null>;
}
interface Item {
    id: number;
    name: string;
    images: string[];
    categories: string[];
    price: number;
    pricingDescription: string;
}
const HomeScreen: React.FC<IProps> = ({navigation}) => {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchItems());
    }, []);

    const itemsGroupedByCategory = useSelector((state: RootState) =>
        selectItemsGroupedByCategory(state)
    );

    return (
        <>
            <HomeHeaderContainer>
                <Header variant={'HOME'} text={'D'} backgroundColor={Colors.HEADER_COLOR} />
            </HomeHeaderContainer>
            <SafeContainer>
                <KeyboardAwareScrollView>
                    {_.map(itemsGroupedByCategory, (items, category) => {
                        return (
                            <>
                                <Header
                                    backgroundColor={Colors.BUTTON_BLUE}
                                    text={category}
                                    variant="SUB_HOME"
                                />
                                <ItemsContainer>
                                    {items.map((item:Item) => (
                                        <CardItem
                                            key={item.id}
                                            imageUrl={item.images.length > 0 ? item.images[0] : ''}
                                            name={item.name}
                                            id={item.id}
                                            item={item}
                                            onSelect={()=>{navigation.navigate('ItemScreen',{'item':item})}}
                                        />
                                    ))}
                                </ItemsContainer>
                            </>
                        );
                    })}
                </KeyboardAwareScrollView>
            </SafeContainer>
        </>
    );
};
const HomeHeaderContainer = styled.View`
    margin-top: 20px;
    height: 50px;
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

export default HomeScreen;
