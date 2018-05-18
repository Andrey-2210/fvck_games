import { combineReducers } from 'redux';
import words from './Words.js';
import attention_words from './Attention_words.js';



export default combineReducers({
  words,
  attention_words
});
