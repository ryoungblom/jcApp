import { PopupButton } from '@typeform/embed-react'

const formID = {
  key: process.env.REACT_APP_INTAKE_FORM,
};

const Intake = () => {
  return (
    <PopupButton id={`${formID.key}`} style={{ fontSize: 20 }} className="typeformButton">
      Create New Order
    </PopupButton>
  )
}

export default Intake;
