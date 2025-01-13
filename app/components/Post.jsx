"use client";

import React, { useState, useEffect } from "react";

import Modal from "./Modal";
import axios from "axios";
import { useRouter } from "next/navigation";
import UploadPDF from './../components/UploadPDF'

const Post = ({ post }) => {
  const router = useRouter(); 
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [postToEdit, setPostToEdit] = useState(post);
  const [postToEdit1, setPostToEdit1] = useState();
  const [active, setActive] = useState(false)
  const [modalOpen, setModalOpen] = useState(false); 
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalDelete1, setOpenModalDelete1] = useState(false);
  const [pdfid, setPdf] = useState(); 

  const handleEditSubmit = (e) => {
    e.preventDefault();

    if (e.target.type.value == "0") {
      alert("Please fill insurance type");
    }
    else {
      setActive(true)
      axios
        .patch(`/api/posts/${post.id}`, postToEdit)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setOpenModalEdit(false);
          setActive(false)
          window.location.replace("/dashboard");
        });
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPostToEdit((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDeletePost = (id) => {
    axios
      .delete(`/api/posts/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setOpenModalEdit(false);
        window.location.replace("/dashboard");
      });
  }



  useEffect(() => { 
    axios
      .patch(`/api/posts/${pdfid}`, postToEdit1)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setOpenModalDelete1(false); 
      });
  }, [postToEdit1, pdfid]);


  const handleDeletePost1 = (id) => {
    setPdf(id)
    setPostToEdit1({
      pdf: ""
    })
  }








  return (
    <li className="p-3 my-5 bg-slate-200" key={post.id}>
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <b>{post.type}</b>
      <p>{post.description}</p>


      <div className="pt-5">
        <button
          className="text-blue-700 mr-3"
          onClick={() => setOpenModalEdit(true)}
        >
          Edit
        </button>



        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form className="w-full" onSubmit={handleEditSubmit}>
            <h1 className="text-2xl pb-3">Edit Service</h1>

            <input
              type="text"
              placeholder="Title"
              name="title"
              className="w-full p-2"
              value={postToEdit.title || ""}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              placeholder="Description"
              name="description"
              className="w-full p-2 my-5"
              value={postToEdit.description || ""}
              onChange={handleChange}
              required
            />

            <select name="type" id="type" onChange={handleChange} required>
              <option value="0" disabled selected>--Choose Option--</option>
              <option value="business">Business Insurance</option>
              <option value="personal">Personal Insurance</option>
            </select>

            <button type="submit" className="bg-blue-700 text-white px-5 py-2" disabled={active}>
              Submit
            </button>
          </form>
        </Modal>

        <button onClick={() => setOpenModalDelete(true)} className="text-red-700 mr-3">Delete</button>

        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
          <h1 className="text-2xl pb-3">
            Are you sure, You want to delete this post?
          </h1>

          <div>
            <button
              onClick={() => handleDeletePost(post.id)}
              className="text-blue-700 font-bold mr-5"
            >
              Yes
            </button>
            <button
              onClick={() => setOpenModalDelete(false)}
              className="text-red-700 font-bold mr-5"
            >
              No
            </button>
          </div>
        </Modal>


        <button
          style={{ float: "inline-end" }}
          onClick={() => setModalOpen(true)}
          className="text-blue-700 mr-3"
        >
          Add PDF
        </button>
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
          <UploadPDF postid={post.id} />
        </Modal>


        <button onClick={() => setOpenModalDelete1(true)} className="text-red-700 mr-3" style={{ float: "inline-end" }}>Delete PDF</button>

        <Modal modalOpen={openModalDelete1} setModalOpen={setOpenModalDelete1}>
          <h1 className="text-2xl pb-3">
            Are you sure, You want to delete PDF of this post?
          </h1>

          <div>
            <button
              onClick={() => handleDeletePost1(post.id)}
              className="text-blue-700 font-bold mr-5"
            >
              Yes
            </button>
            <button
              onClick={() => setOpenModalDelete1(false)}
              className="text-red-700 font-bold mr-5"
            >
              No
            </button>
          </div>
        </Modal>


      </div>
    </li>
  );
};

export default Post;
