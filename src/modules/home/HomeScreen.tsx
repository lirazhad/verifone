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
import {useTranslation} from 'react-i18next';
import { inject, observer } from 'mobx-react'
import { SectionList, FlatList, Text, View } from 'react-native'
import ListItem from '../../components/ListItem'

interface IProps extends NavigationScreenProp<object> {
    navigation: NavigationStackProp<null>
    itemStore: any
}
interface Item {
    id: number;
    name: string;
    images: string[];
    categories: string[];
    price: number;
    pricingDescription: string;
}


const HomeScreen: React.FC<IProps> =  inject("itemStore")(observer(({navigation, itemStore})=> {
    const {t} = useTranslation();

    useEffect(() => {
        itemStore.fetchData()
    }, []);
    
    return (
        <>
        <SectionList
          sections={[
            {
              title: t('docks'),
              data: [itemStore.terminals.toJS()],
            },
            {
              title: t('cashiers'),
              data: [itemStore.cashRegister.toJS()],
            }
           
          ]}

          renderItem={(item: any) => {
              console.log(item.item)
              return(
                <FlatList
                data={item.item}
                numColumns={3}
                renderItem={(item: any) =>{
                return (
                <ListItem 
                item={item.item} 
                isSelected={itemStore.isSelected}/>)
                }}
            />

              )
          }}

          renderSectionHeader={({section}) => (
              <View style={{
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  backgroundColor: Colors.BUTTON_BLUE,
                  padding: 8}}>
               <Text style={{
                paddingTop: 2,
                paddingBottom: 2,
                paddingLeft: 10,
                paddingRight: 10,
                fontSize: 22,
                fontWeight: 'bold',
                color: '#fff',
              }}>{section.title}</Text>   
              </View>
            
          )}
          keyExtractor={(item: string, index: number) => index}
        />
            {/* <HomeHeaderContainer>
                <Header variant={'HOME'} text={t('products')} backgroundColor={Colors.HEADER_COLOR} />
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
            </SafeContainer> */}
        </>
    );
}));

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
    width: 100%;
    align-items: center;
    justify-content: space-around;
`;

export default HomeScreen;
