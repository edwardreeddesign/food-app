import React, { useRef, useState } from "react";
import styled from "styled-components";

const isEmpty = (value) => value.trim() === "";
const isNotSixChars = (value) => value.trim().length !== 6;

const Checkout = (props) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const confirmHandler = (e) => {
    e.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = !isNotSixChars(enteredPostalCode);

    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    //Submit cart data
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
    });
  };

  const nameControlClasses = `${"control"} ${
    formInputValidity.name ? "" : "invalid"
  }`;
  const streetControlClasses = `${"control"} ${
    formInputValidity.street ? "" : "invalid"
  }`;
  const postalCodeControlClasses = `${"control"} ${
    formInputValidity.postalCode ? "" : "invalid"
  }`;
  const cityControlClasses = `${"control"} ${
    formInputValidity.city ? "" : "invalid"
  }`;

  return (
    <StyledCheckout onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Your Address</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Your Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formInputValidity.postalCode && (
          <p>Please enter your Postal Code with 6 numbers/letters!</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className="actions">
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className="submit">Confirm</button>
      </div>
    </StyledCheckout>
  );
};

const StyledCheckout = styled.form`
  margin: 1rem 0;
  max-height: 19rem;
  overflow: auto;

  .control {
    margin-bottom: auto.5rem;
  }

  label {
    font-weight: bold;
    margin-bottom: 0.25rem;
    display: block;
  }

  input {
    font: inherit;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    width: 20rem;
    max-width: 100%;

    &:focus {
      outline: none;
    }
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;

    button {
      color: #5a1a01;
      cursor: pointer;
      background-color: transparent;
      border: none;
      border-radius: 2rem;
      padding: 0.5rem 2rem;
    }

    button:hover,
    button:active {
      background-color: #ffe6dc;
    }

    .submit {
      border: 1px solid #5a1a01;
      background-color: #5a1a01;
      color: white;
    }

    .submit:hover,
    .submit:active {
      background-color: #7a2706;
    }
  }
  .invalid label {
    color: #ca3e51;
  }

  .invalid input {
    border-color: #aa0b20;
    background-color: #ffeff1;
  }
`;

export default Checkout;
