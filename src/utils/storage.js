const localSavetoken = token => {
  localStorage.setItem('token', JSON.stringify(token));
};
const localGettoken = () => {
  return JSON.parse(localStorage.getItem('token'));
};
const localRemovetoken = () => {
  localStorage.removeItem('token');
};
const sessionSavetoken = token => {
  sessionStorage.setItem('token', JSON.stringify(token));
};
const sessionGettoken = () => {
  return JSON.parse(sessionStorage.getItem('token') || {});
};
const sessionRemovetoken = () => {
  sessionStorage.removeItem('token');
};
const localSaveuserInfo = userInfo => {
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
};
const localGetuserInfo = () => {
  return JSON.parse(localStorage.getItem('userInfo'));
};
const localRemoveuserInfo = () => {
  localStorage.removeItem('userInfo');
};
const sessionSaveuserInfo = userInfo => {
  sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
};
const sessionGetuserInfo = () => {
  return JSON.parse(sessionStorage.getItem('userInfo') || {});
};
const sessionRemoveuserInfo = () => {
  sessionStorage.removeItem('userInfo');
};
export {
  localSavetoken,
  localGettoken,
  localRemovetoken,
  sessionSavetoken,
  sessionGettoken,
  sessionRemovetoken,
  localSaveuserInfo,
  localGetuserInfo,
  localRemoveuserInfo,
  sessionSaveuserInfo,
  sessionGetuserInfo,
  sessionRemoveuserInfo
};
