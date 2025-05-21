// src/redux/actions.js
export const setImageData = (data) => ({ type: "SET_IMAGE_DATA", payload: data });
export const setTransform = (transform) => ({ type: "SET_TRANSFORM", payload: transform });
export const resetEditor = () => ({ type: "RESET_EDITOR" });
