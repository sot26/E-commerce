import React, { useState } from "react";

const Contact = () => {
  const [cart, setCart] = useState(0);

  const increase = () => {
    // setCart + 1;
  };

  return (
    <div className="w-full flex justify-center items-center font-bold">
      <button className="p-2 bg-blue-500 text-white">-</button>
      <p>{cart}</p>
      <button className="p-2 bg-blue-500 text-white" onClick={increase}>
        +
      </button>
    </div>
  );
};

export default Contact;
