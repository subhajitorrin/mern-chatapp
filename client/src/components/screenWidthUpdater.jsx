import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setWidth } from "../toolkit/screenWidthSlice.js";

function screenWidthUpdater() {
  const dispatch = useDispatch();
  useEffect(() => {
    function handleResize() {
      dispatch(setWidth(window.innerWidth));
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);
  return null;
}

export default screenWidthUpdater;
