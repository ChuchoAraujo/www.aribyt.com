import React from "react";
import emailjs from "@emailjs/browser";


export const Mailer = () => {
    
    const sendEmail = (event) => {
      event.preventDefault();

      emailjs
        .sendForm(
          "service_6p62m98",
          "template_z6vm3gr",
          event.target,
          "B7IcTLJgEZSaQvry6"
        )
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    };
return (
  <div className="footer container-fluid text-center">
    <div className="div-form">
      <h1 className="title-form">Contact Us</h1>
      <form className="form-mail" onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="user_name" />
        <br />

        <label>Email</label>
        <input type="email" name="user_email" />
        <br />

        <label>Message</label>
        <textarea name="user_message" id="" cols="30" rows="10"></textarea>
        <br />
        <button type="submit">Send</button>
        <br />
        <input type="file"></input>
        <input type="submit"></input>
      </form>
    </div>
  </div>
);
}