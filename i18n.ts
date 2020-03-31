import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

const resources = {
    he: {
        translation: {
            logIn: 'כניסה',
            ok:'אישור',
            noAvailableConnection:'אין חיבור זמין',
            theQuoteHaveNotSentYet:'הצעת המחיר עדיין לא נשלחה',
            whenNetComeBackTheQuoteWillBeSent:'ברגע שיהיה חיבור אינטרנט ההצעה תישלח בצורה אוטומטית',
            email:'אימייל',
            password:'סיסמא',
            dontYouHaveAuser:'עדיין אין לך חשבון?',
            forOpenAnAccountGoToYourManager:'לפתיחת חשבון פנה למנהל שלך',
            enterAPassword:'הכניסו סיסמא',
            enterAEmail:'הכניסו אימייל',
            dontHaveAccount:'עדיין אין לך חשבון?',
            forOpenAnAccount:'לפתיחת חשבון פנה למנהל שלך',
            products:'מוצרים',
            docks: 'מסופים',
            cashiers:'קופות',
            cartProductsAmount:'מוצרים בסל הצעות',
            clearCart:'נקה סל',
            customerDetails:'פרטי לקוח',
            fistName:'שם פרטי',
            lastName:'שם משפחה',
            companyName: 'שם החברה',
            sendQuoteTo:'שלח הצעה ל',
            mail:'מייל',
            phone:'טלפון',
            emailAddress:'כתובת מייל',
            comment:'הערות נוספות',
            submitQuote:'שלח הצעה',
            insert:'הכניסו ',
            logout:'התנתקות',
            pdfText:'מפרט',
            image360:'תצוגת 360',
            addToTheQuoteCart:'הוסף לסל הצעות',
            widgets:'תכונות בולטות',
            addedToTheCart:'נוסף לסל ההצעות'

        }
    }
};

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: 'he',

        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
