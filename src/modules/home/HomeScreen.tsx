import React, {useEffect} from 'react';
import {Colors} from '../../styles';
import {NavigationScreenProp} from 'react-navigation';
import _ from 'lodash';
import {NavigationStackProp} from 'react-navigation-stack';
import {useTranslation} from 'react-i18next';
import { inject, observer } from 'mobx-react'
import { SectionList, FlatList, Text, View, Platform } from 'react-native'
import ListItem from '../../components/ListItem'
import MainHeader from '../../components/MainHeader'
import NavigationService from '../../services/NavigationServices'

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

    return (
        <>
        <MainHeader
        logout={() => NavigationService.navigate("LoginScreen")}
        headline={t('products')} 
        showCart={true}
        itemsInCart={itemStore.cartItemNumber}
        onCartPress={
            () =>NavigationService.navigate("CartScreen", 
                {
                'cartItems': itemStore.cart, 
                'clearCart': itemStore.clearCart
                })}/>
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
              return(
                <FlatList
                data={item.item}
                numColumns={3}
                renderItem={(item: any) =>{
                return (
                <ListItem
                item={item.item} 
                onItemPress={()=>{
                    navigation.navigate('ItemScreen',
                    {
                    'item': item.item, 
                    'addToCart': itemStore.addToCart,
                    'itemStore': itemStore
                })}}
                onSelect={itemStore.addToCart}/>)
                }}
            />

              )
          }}

          renderSectionHeader={({section}) => (
              <View style={{
                  height: 80,
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  backgroundColor: Colors.BUTTON_BLUE,
                  padding: 8}}>
               <Text style={{
                fontSize: 42,
                color: Colors.WHITE
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



export default HomeScreen;
