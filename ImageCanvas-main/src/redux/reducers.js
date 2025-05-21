// src/redux/reducers.js
const initialState = {
    imageData: null,
    transform: { scaleX: 1, scaleY: 1, left: 0, top: 0 },
  };
  
  const editorReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_IMAGE_DATA":
        return { ...state, imageData: action.payload };
      case "SET_TRANSFORM":
        return { ...state, transform: action.payload };
      case "RESET_EDITOR":
        return initialState;
      default:
        return state;
    }
  };
  
  export default editorReducer;
  