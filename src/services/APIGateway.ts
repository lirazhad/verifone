import axios from 'axios';
import {AsyncStorage} from 'react-native';
import Config from 'react-native-config';

interface Item {
    id: number;
    name: string;
    images: string[];
    categories: string[];
    price: number;
    pricingDescription: string;
}

const API = axios.create({
    baseURL: 'https://verifone.dev.globalbit.io/'
});

export const setJwtToken = async (token: string) => {
    return await AsyncStorage.setItem('jwtToken', token);
};
export const removeJwtToken = async (): Promise<void> => {
    await AsyncStorage.removeItem('jwt_token');
};
export const signIn = async ({email, password}: LoginDto): Promise<User> => {
    const url = '/auth/login';
    const body = {email, password};
    return (await API.post(url, body)).data;
};

export const fetchItems = async (): Promise<Item[]> => {
    const url = '/items';
    return (await API.get(url)).data;
};

export const submitQuote = async (
    customer: CustomerDto,
    sendTo: string,
    phoneNumber: string,
    email: string,
    agentEmail: string,
    comment: string
): Promise<CreateQuoteDto> => {
    const url = '/quotes';
    const body = {
        customer,
        sendTo,
        phoneNumber,
        email,
        agentEmail,
        comment
    };
    return (await API.post(url, body)).data;
};
