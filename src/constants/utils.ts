import { Dimensions } from 'react-native'
import { Platform } from 'react-native'
import { itemStore } from '../../App'


export const screenWidth = Dimensions.get('window').width
export const screenHeight = Dimensions.get('window').height


export const getDeviceImagesPath = (urls: any) => {
    let images: any = []

    urls.forEach((item) => {
        Platform.OS === 'android' ?
        images.push('file://' + itemStore.imagesPathKeyValue.get(item)):
        images.push('' + itemStore.imagesPathKeyValue.get(item))
    })

    return images
}