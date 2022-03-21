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

const reducer = combineReducers({
  detailReducer,
});

export default reducer;
