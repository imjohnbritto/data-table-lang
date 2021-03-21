import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      "Welcome to Dashboard": "Welcome to Dashboard",
      "Sales Data": "Sales Data Table",
      "Hide/Show": "Hide/Show",
      "Name": "Name",
      "Town": "Town",
      "Digits": "Digits"
    }
  },
  es: {
    translation: {
      "Welcome to Dashboard": "Bienvenido a Dashboard",
      "Sales Data": "Tabla de datos de ventas",
      "Hide/Show": "Ocultar/mostrar",
      "Name": "Nombre",
      "Town": "Pueblo",
      "Digits": "Dígitos"
    }
  },
  fr: {
    translation: {
      "Welcome to Dashboard": "Bienvenue dans Dashboard",
      "Sales Data": "Tableau de données de vente",
      "Hide/Show": "Cacher/Montrer",
      "Name": "Nom",
      "Town": "Ville",
      "Digits": "Chiffres"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;