export const setDetailPage = value => {
  return {type: 'SET_DETAIL_PAGE', inputValue: value};
};

export const setReturnBook = value => {
  return {type: 'SET_RETURN_BOOK', inputValue: value};
};

export const setPath = (input, value) => {
  return {type: 'SET_PATH', inputType: input, inputValue: value};
};

export const setPathImage = value => {
  return {type: 'SET_PATH_IMAGE', inputValue: value};
};

export const clearFormPath = () => {
  return {type: 'CLEAR_FORM_PATH'};
};

export const setSurvey = value => {
  return {type: 'SET_SURVEY', inputValue: value};
};

export const clearSurvey = () => {
  return {type: 'CLEAR_SURVEY'};
};

export const setCount = value => {
  return {type: 'SET_COUNT', inputValue: value};
};

export const clearCount = () => {
  return {type: 'CLEAR_COUNT'};
};

export const setProfile = value => {
  return {type: 'SET_PROFILE', inputValue: value};
};
