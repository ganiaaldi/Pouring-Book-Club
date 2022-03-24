const {qrIcon, profile, member} = require('../assets');
import {colors} from './../utils/colors';
const fabList = [
  {
    // text: 'QrCode',
    icon: qrIcon,
    name: 'fab_qr',
    position: 1,
    color: colors.pink,
  },
  {
    // text: 'Profile',
    icon: profile,
    name: 'fab_profile',
    position: 2,
    color: colors.pink,
  },
  {
    // text: 'Member',
    icon: member,
    name: 'fab_member',
    position: 3,
    color: colors.pink,
  },
];

export default fabList;
