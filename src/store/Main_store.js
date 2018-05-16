import {createStore}  from 'redux';

function words(state =[], action){
  if (action.type === 'ADD_WORDS'){
    return [
      ...state,
      action.word
    ];
  }
  return state;
}

const store = createStore(words);


store.subscribe(() => {

  console.log('subscribe' , store.getState());
})


store.dispatch({type: 'ADD_WORDS', word: 'машина'});
store.dispatch({type: 'ADD_WORDS', word: 'люди'});
store.dispatch({type: 'ADD_WORDS', word: 'конструктор'});
