import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineLocationOn } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { toast } from "react-toastify";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        `${process.env.REACT_APP_EMAILJS_SERVICE_ID}`,
        "template_3zq9n5a",
        form.current,
        "I4uqtUUy2XouWeFTm"
      )
      .then(
        (result) => {
          toast.success("Message sent successfully");
        },
        (error) => {
          toast.error(error.text);
        }
      );
    e.target.reset();
  };

  return (
    <div className="w-full min-h-[100vh]">
      <div className="w-full px-3">
        <p className="txet-2xl md:text-center text-3xl mt-2 md:dmy-4 font-bold">
          Contact Us
        </p>
        <div className="justify-center flex w-full flex-col md:flex-row">
          <form
            ref={form}
            onSubmit={sendEmail}
            className="p-2 md:min-w-[450px]"
          >
            <div className="flex flex-col my-2">
              <label className="text-lg">Name:</label>
              <input
                className="border-black border-[1.4px] rounded-md p-2"
                type="text"
                name="full_name"
                placeholder="Full Name"
              ></input>
            </div>
            <div className="flex flex-col my-2">
              <label className="text-lg">Email:</label>
              <input
                className="border-black border-[1.4px] rounded-md p-2"
                type="email"
                name="email"
                placeholder="Your active Email"
              ></input>
            </div>
            <div className="flex flex-col my-2">
              <label className="text-lg">Subject:</label>
              <input
                className="border-black border-[1.4px] rounded-md p-2"
                type="text"
                name="subject"
                placeholder="Subject"
              ></input>
            </div>
            <div className="flex flex-col my-2">
              <label className="text-lg">Message:</label>
              <textarea
                rows={7}
                className="border-black border-[1.4px] rounded-md p-2"
                type="text"
                name="message"
                placeholder="Mesaage"
              ></textarea>
            </div>
            <button
              type="submit"
              className="p-2 mt-2 rounded-lg bg-blue-500 text-white"
            >
              Send Message
            </button>
          </form>
          <div className="w-auto h-fit max-w-[400px] bg-blue-600 text-white rounded-xl my-4">
            <div className="p-5">
              <p className="text-xl">Our Contatct Information</p>
              <p className="lg">
                Fill the form or contact us via other medium listed below
              </p>
              <div className="mt-3">
                <div className="flex gap-2 items-center">
                  <FiPhoneCall size={20} /> +2348133168490
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  <MdOutlineEmail size={20} /> omotoshotobi26@gmail.com
                </div>
                <div className="flex gap-2 items-center">
                  <MdOutlineLocationOn size={20} /> Lagos, Nigeria
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
