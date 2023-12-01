import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userEmailState } from "../store/selector/userDetails";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../shared/config";

export const Uploads = () => {
  const [files, setFiles] = useState(null);
  const [a, setA] = useState("");

  let userName = "";
  userName = useRecoilValue(userEmailState);
  const navigate = useNavigate();
  console.log(userName);

  if (userName === null) {
    navigate("/login");
  }

  if (userName === null) {
    // Render nothing if userName is null
    return null;
  }

  const handleSetFiles = (e) => {
    console.log("hi");
    // if()
    setFiles(e.target.files);
    // console.log(files[0].type.split("/")[1]);
  };

  const uploadFile = async (e) => {
    e.preventDefault();
    const data = new FormData();
    if (files && files[0]) {
      data.append("file", files[0]);
    } else {
      return console.log("file uploaded wrong");
    }
    try {
      const x = await axios.post(`${BASE_URL}/post`, data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      });

      setA(x.data.cover.split("\\")[1]);
    } catch (error) {
      console.error("Error creating a new post:", error);
    }
  };
  return (
    <>
      <form onSubmit={uploadFile} className="flex flex-col">
        <input
          className="placeholder:text-sm"
          type="text"
          placeholder="enter file name"
        />
        <input type="file" onChange={handleSetFiles} />
        <button>upload</button>
        <a href={`http://localhost:4000/api/upload/${a}`}>okok</a>
      </form>
    </>
  );
};
