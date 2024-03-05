// SupportPage.js

import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/SupportPage.module.css";
import Connect from "../comp/Connect";

const SupportPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:wisdomireoluwa@gmail.com?subject=Support Request&body=Name: ${name}%0D%0AEmail: ${email}%0D%0AMessage: ${message}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Support Page</h1>
      <div className={styles.content}>
        <p>
          Welcome to our support page! If you have any questions or need
          assistance, please feel free to contact us using the form below.
        </p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" className={styles.input} />
          <input type="email" placeholder="Email" className={styles.input} />
          <textarea
            placeholder="Message"
            rows="4"
            className={styles.textarea}
          ></textarea>
          <button type="submit" className={styles.button}>
            Submit
          </button>
        </form>

        <Connect />
      </div>
    </div>
  );
};

export default SupportPage;
