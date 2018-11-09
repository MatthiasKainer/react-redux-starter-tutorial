export default (state, action) => {
    switch (action.type) {
      case 'INCREASE':
        return {...state, counter: state.counter + 1};
      default:
        return state
    }
  }