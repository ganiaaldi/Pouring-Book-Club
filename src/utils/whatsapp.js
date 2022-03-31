import {Platform, Linking} from 'react-native';

export const sendWhatsApp = phoneWithCountryCode => {
  let msg = 'Hello';

  let mobile =
    Platform.OS == 'ios' ? phoneWithCountryCode : '+' + phoneWithCountryCode;
  if (mobile) {
    if (msg) {
      let url = 'whatsapp://send?text=' + msg + '&phone=' + mobile;
      Linking.openURL(url)
        .then(data => {
          console.log('WhatsApp Opened');
        })
        .catch(() => {
          alert('Make sure WhatsApp installed on your device');
        });
    } else {
      alert('Please insert message to send');
    }
  } else {
    alert('Please insert mobile no');
  }
};
