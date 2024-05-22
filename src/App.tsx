import { useEffect, useState } from "react";
import "./App.css";

export const App = () => {
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    queryType: "",
    messageArea: "",
    consent: false,
  });
  const [error, setError] = useState({
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    queryError: "",
    messageAreaError: "",
    consentError: "",
  });

  const [messageSent, setMessageSent] = useState(false);

  /* handle input value change */
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setInput({
      ...input,
      [e.target.name]: e.target.value,
      [name]: type === "checkbox" ? checked : value,
    });

    /* clear errors when typing something */
    if (name === "queryType") {
      setError((prevError) => ({
        ...prevError,
        queryError: "",
      }));
    } else {
      setError((prevError) => ({
        ...prevError,
        [`${name}Error`]: "",
      }));
    }
  };

  /* form validation */
  const validation = () => {
    let isValid = true;
    const newError = {
      firstNameError: "",
      lastNameError: "",
      emailError: "",
      queryError: "",
      messageAreaError: "",
      consentError: "",
    };

    if (input.firstName === "") {
      newError.firstNameError = "This field is required";
      isValid = false;
    }

    if (input.lastName === "") {
      newError.lastNameError = "This field is required";
      isValid = false;
    }

    if (!input.email || !/\S+@\S+\.\S+/.test(input.email)) {
      newError.emailError = "Please enter a valid email address";
      isValid = false;
    }

    if (!input.queryType) {
      newError.queryError = "Please select a query type";
      isValid = false;
    }

    if (!input.messageArea) {
      newError.messageAreaError = "This field is required";
      isValid = false;
    }

    if (!input.consent) {
      newError.consentError =
        "To submit this form, please consent to being contacted";
      isValid = false;
    }

    setError(newError);
    return isValid;
  };

  /* reset form */
  const resetForm = () => {
    setInput({
      firstName: "",
      lastName: "",
      email: "",
      queryType: "",
      messageArea: "",
      consent: false,
    });
    setError({
      firstNameError: "",
      lastNameError: "",
      emailError: "",
      queryError: "",
      messageAreaError: "",
      consentError: "",
    });
  };

  /* submit form */
  const submit = (e: any) => {
    e.preventDefault();

    if (!validation()) {
      return false;
    } else {
      setMessageSent(true);
      resetForm();
      window.scrollTo(0, 0);
      return;
    }
  };

  /* timer to unshow the message */
  useEffect(() => {
    if (messageSent) {
      const timer = setTimeout(() => {
        setMessageSent(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [messageSent]);

  return (
    <main>
      {/* Container */}
      <div className="container">
        <h1>Contact Us</h1>

        {/* Formulary */}
        <form action="#" method="post">
          <div className="desktop_label_flex">
            {/* First Name */}
            <div className="first_name_div">
              <label htmlFor="firstName" className="first_name_label">
                {" "}
                <div className="text">
                  <span>First Name</span> <i>*</i>
                </div>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={input.firstName}
                  onChange={handleChange}
                  className={` ${error.firstNameError ? "error_border" : ""}`}
                />
              </label>
              {error.firstNameError && (
                <div className="error">{error.firstNameError}</div>
              )}
            </div>

            {/* Last Name */}
            <div className="last_name_div">
              <label htmlFor="lastName" className="last_name_label">
                {" "}
                <div className="text">
                  <span>Last Name</span> <i>*</i>
                </div>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={input.lastName}
                  onChange={handleChange}
                  className={` ${error.lastNameError ? "error_border" : ""}`}
                />
              </label>
              {error.lastNameError && (
                <div className="error">{error.lastNameError}</div>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="email_div">
            <label htmlFor="email" className="email_label">
              {" "}
              <div className="text">
                <span>Email Address</span> <i>*</i>
              </div>
              <input
                type="email"
                name="email"
                id="email"
                value={input.email}
                onChange={handleChange}
                className={` ${error.emailError ? "error_border" : ""}`}
              />
            </label>
            {error.emailError && (
              <div className="error">{error.emailError}</div>
            )}
          </div>

          {/* Query */}
          <section className="query_type_group">
            <label htmlFor="query" className="query_label">
              <div className="text">
                <span>Query Type</span> <i>*</i>
              </div>
            </label>
            <div className="query_label_button_group">
              <label
                htmlFor="general"
                className={`general_label ${
                  error.queryError ? "error_border" : ""
                }`}
              >
                <input
                  type="radio"
                  id="general"
                  name="queryType"
                  value="general"
                  checked={input.queryType === "general"}
                  onChange={handleChange}
                />{" "}
                <span>General Enquiry</span>
              </label>
              <label
                htmlFor="support"
                className={`support_label ${
                  error.queryError ? "error_border" : ""
                }`}
              >
                <input
                  type="radio"
                  id="support"
                  name="queryType"
                  value="support"
                  checked={input.queryType === "support"}
                  onChange={handleChange}
                />{" "}
                <span>Support Request</span>
              </label>
            </div>
            {error.queryError && (
              <div className="error no_padding">{error.queryError}</div>
            )}
          </section>

          {/* Message Area */}
          <section className="message_area_container">
            <label htmlFor="messageArea">
              <div className="text">
                <span>Message</span> <i>*</i>
              </div>
            </label>
            <textarea
              name="messageArea"
              id="messageArea"
              rows={4}
              cols={50}
              style={{ resize: "none" }}
              value={input.messageArea}
              onChange={handleChange}
              className={` ${error.messageAreaError ? "error_border" : ""}`}
            ></textarea>
            {error.messageAreaError && (
              <div className="error no_padding">{error.messageAreaError}</div>
            )}
          </section>

          {/* Consent */}
          <section className="consent_input">
            <label htmlFor="consent">
              <input
                type="checkbox"
                name="consent"
                id="consent"
                checked={input.consent}
                onChange={handleChange}
              />
              <span>I consent to being contacted by the team</span>
            </label>
            {error.consentError && (
              <div className="error no_padding">{error.consentError}</div>
            )}
          </section>

          {/* Button */}
          <button onClick={submit}>Submit</button>
        </form>

        {/* Message Sent */}
        {messageSent && (
          <div className="message_sent_container">
            <div className="image_text">
              <img src="./icon-success-check.svg" alt="success icon" />
              <span>Message Sent!</span>
            </div>
            <div className="subtext">
              <p>Thanks for completing the form. We'll be in touch soon!</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
