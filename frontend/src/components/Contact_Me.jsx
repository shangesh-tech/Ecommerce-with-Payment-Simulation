import React from "react";

const ContactMe = () => {
  const email = "shangesh2006@gmail.com";
  const gmailComposeURL = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${email}`;

  const handleContactClick = () => {
    window.open(gmailComposeURL, "_blank");
  };

  return (
    <div className="card mx-4 md:mx-44 border mt-20">
      <div className="card-body">
        <h2 className="card-title">
          Created by{" "}
          <span className="text-red-600 font-semibold font-mono">Shangesh</span>
        </h2>
        <p className="font-medium ms-5">
          I am a FullStack developer and Investor, Passionate to become a
          Blockchain developer...
        </p>
        <div className="card-actions justify-end">
          <button
            className="btn bg-red-600 text-white hover:text-red-600"
            onClick={handleContactClick}
          >
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactMe;
