import React, { useEffect, useState } from "react";
import Loading from "./Loading";

const Button = (data) => {
  return (
    <button type="Submit" className="p-2 px-[40px] rounded-full  bg-pop">
      {data?.isLoading?.loading ? <Loading /> : data.text}
    </button>
  );
};

export default Button;
