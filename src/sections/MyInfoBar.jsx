import React, { useEffect, useState } from "react";
import { SearchUserIcon } from "../assets/icons";
import axios from "axios";
import { useRef } from "react";
import { useStore } from "../store/store";
const API = "https://chatback-2g5m.onrender.com";
import { Navigate } from "react-router-dom";

const make = false;
const MyInfoBar = () => {
  const [isUserFetched, setSearchUserIDFetched] = useState(make);
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [suggestion, setSuggestion] = useState([]);
  const { setSearchUserID } = useStore();

  useEffect(() => {
    const autoComplete = async () => {
      const { data } = await axios.get(
        `${API}/user/autoComplete?search=${search}`,
        {
          withCredentials: true,
        }
      );
      setSuggestion(data);
    };
    autoComplete();
  }, [search]);

  return (
    <>
      {isUserFetched && <Navigate to={"/searchedUser"} />}
      <div className="flex items-center mx-2 ">
        <div className="mt-2 md:flex-grow sm:flex-grow">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-pop ">
            <h1 className="text-black">A</h1>
          </div>
        </div>
        <div className="relative mx-2 mt-2 ">
          <input
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(true), 200)}
            ref={inputRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="w-[250px] rounded-full ok indent-3 "
          />
          <div className="absolute z-50 w-full bg-secondary ">
            {isFocused &&
              suggestion?.map((e) => (
                <li
                  className="pl-2 text-sm list-none cursor-pointer hover:bg-primary"
                  key={e._id}
                  onClick={() => {
                    setSearchUserID(e._id),
                      setSearchUserIDFetched(!isUserFetched);
                  }}
                >
                  {e.username}
                </li>
              ))}
          </div>
        </div>
        <div className="mt-2 w-[34px] ">
          <img
            src={SearchUserIcon}
            className=""
            width={30}
            height={30}
            alt=""
            srcset=""
          />
        </div>
      </div>
    </>
  );
};

export default MyInfoBar;
