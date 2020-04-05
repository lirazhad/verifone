import AsyncStorage from '@react-native-community/async-storage';
import RNFetchBlob from 'rn-fetch-blob'

export const storeDataToDevice = async (key: string, data: string) => {
    try {
      await AsyncStorage.setItem(key, data)
      console.warn(data)

    } catch (e) {
        console.warn(e)
      // saving error
    }
  }


export const getDataFromDevice  = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key)
      if(value !== null) {
        return value
      }
    } catch(e) {
        console.warn(e)
    }
  }

//   export const imagesPathKeyValue = new Map<any, any>();
  export const downloadImages  = async (imagesArray: string[], imagesPathKeyValue: Map<string, string>) => {
    imagesArray.forEach(async function (item, index) {

        RNFetchBlob
        .config({
          fileCache : true,
          // by adding this option, the temp files will have a file extension
          //appendExt : 'jpg'
        })
        .fetch('GET', item, {
          //some headers ..
        })
        .then((res) => {
          imagesPathKeyValue.set(item, res.path()) 

          // Beware that when using a file path as Image source on Android,
          // you must prepend "file://"" before the file path
          //imageView = <Image source={{ uri : Platform.OS === 'android' ? 'file://' + res.path() : '' + res.path() }}/>
        })

      });



  }

