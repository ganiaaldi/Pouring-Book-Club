import {combineReducers} from '@reduxjs/toolkit';

const initialStateDetail = {
  titleBook: 'Tittle',
  type: '',
  author: '',
  cover: '',
  sinopsis: '',
  publisher: '',
  pages: 0,
};

const detailReducer = (state = initialStateDetail, action) => {
  switch (action.type) {
    case 'SET_DETAIL_PAGE':
      return action.inputValue;
    default:
      return state;
  }
};

const initialTransaction = {
  isBorrowed: 0,
};

const transactionReducer = (state = initialTransaction, action) => {
  switch (action.type) {
    case 'SET_RETURN_BOOK':
      return action.inputValue;
    default:
      return state;
  }
};

const initialPath = {
  location: {
    latitude: '',
    longitude: '',
  },
  photo: '',
};

const formPath = (state = initialPath, action) => {
  switch (action.type) {
    case 'SET_PATH':
      return {
        ...state,
        location: {
          ...state.location,
          [action.inputType]: action.inputValue,
        },
      };
    case 'SET_PATH_IMAGE':
      return {
        ...state,
        photo: action.inputValue,
      };
    case 'CLEAR_FORM_PATH':
      return {
        ...(state = initialPath),
      };
    default:
      return state;
  }
};

const reducer = combineReducers({
  detailReducer,
  transactionReducer,
  formPath,
});

export default reducer;
