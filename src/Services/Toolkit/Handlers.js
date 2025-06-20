/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "./Slice";

const Handlers = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.app);

  const handleLoad = () => {
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 2000);
  };

  return {
    isLoading,
    handleLoad,
  };
};

export default Handlers;
