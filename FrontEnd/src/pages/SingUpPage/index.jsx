import React, { useEffect } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { useSelector, useDispatch } from "react-redux";
import { updateStep } from "../../features/user/signUpSlice";

const DataSubmitForm = () => {

  const dispatch = useDispatch();
  const { step } = useSelector((state) => state.signUpReducer);
  useEffect(() => {
    dispatch(updateStep(1));
  }, []);


  return (
    <>
      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      {step === 3 && <Step3 />}
    </>
  );
};

export default DataSubmitForm;
