declare interface CreateQuoteDto {
    customer: CustomerDto;
    sendTo: "SMS" | "EMAIL";
    phoneNumber: string;
    email: string;
    agentEmail: string;
    comment?: string;
    quote?: QuoteItemDto[]; //TODO REMOVE THE ?
}
declare interface CustomerDto {
    firstName: string;
    lastName: string;
    company: string;
}
declare interface LoginDto {
    email: string;
    password: string;
}
declare namespace Parameters {
    export type Id = number;
}
declare interface PathParameters {
    id: Parameters.Id;
}
declare interface QuoteItemDto {
    productId: number;
    price: number;
    quantity: number;
}
declare type RequestBody = LoginDto;
declare namespace Responses {
    export type $201 = User;
}
declare interface User {
    name: string;
    email: string;
    id: string;
    token: string;
}
