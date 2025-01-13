"use client";

import { useState, useEffect } from "react";
import Modal from "./Modal";
import axios from "axios";
import { useRouter } from 'next/navigation'
import { getSignature, saveToDatabase } from '../_actions'
import UploadImage from "./UploadImage";
import { useSearchParams } from 'next/navigation'



const AddPost = () => {

  const router = useRouter();
  const { push } = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [inputs, setInputs] = useState({});
  const [active, setActive] = useState(false)
  // const searchParams = useSearchParams() 
  // setSearch(searchParams.get('show')) 



  if (typeof window !== "undefined") {
    window.addEventListener('storage', () => {
      setSearch(true)
    })
  }





  const handleSubmit = (e) => {
    e.preventDefault(); 

    if (e.target.type.value == "0") {
      alert("Please fill insurance type");
    }
    else {
      setActive(true)
      axios
        .post("/api/posts", inputs)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setInputs({});
          setModalOpen(false); 
          setSearch(false)
		  setActive(false)
      window.location.replace("/dashboard");
        });
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((prevState) => ({ ...prevState, [name]: value, img: "https://res.cloudinary.com/dixtwo21g/image/upload/v1696411482/" + localStorage.getItem("sharedValue") + ".jpg" }));
  };


  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="text-white p-3 cursor-pointer"
        style={{background:"#6c3429"}}
      >
        Add New Insurance
      </button>

      <button
        onClick={() => push("/reservation")}
        className="text-white p-3 cursor-pointer"
        style={{ marginLeft: "1em",background:"#6c3429" }}
      >
        View Reservations
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        {!search && (
          <UploadImage />
        )}
        {search && (
          <form className="w-full mt-5" onSubmit={handleSubmit}>

            <input
              type="text"
              placeholder="Title"
              name="title"
              className="w-full p-2"
              value={inputs.title || ""}
              onChange={handleChange}
              required
            />

            <textarea
              placeholder="Description"
              name="description"
              className="w-full p-2 my-5"
              value={inputs.description || ""}
              onChange={handleChange}
              required
            />

            <select name="type" id="type" onChange={handleChange} required>
              <option value="0" disabled selected>--Choose Option--</option>
              <option value="business">Business Insurance</option>
              <option value="personal">Personal Insurance</option>
            </select>

            <button type="submit" className="px-5 py-2" style={{background:"#6c3429",color:"white",display:"block",marginBlock:"inherit"}} disabled={active}>
              Submit
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default AddPost;
