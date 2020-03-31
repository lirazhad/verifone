import Toast from 'react-native-easy-toast';

let _toast: Toast;

function setTopLevelToast(toastRef: Toast) {
    _toast = toastRef;
}

function show(message: string, duration: number = 3000) {
    _toast.show(message, duration);
}

export default {
    setTopLevelToast,
    show
};
