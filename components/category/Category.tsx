"use client";
import React, { useState } from "react";
import Modal from "../Modal";
import axios from "axios";
import { useRouter } from "next/navigation";

interface CategoryProps {
  category: {
    id: string;
    name: string;
    description: string;
  };
}

const Category: React.FC<CategoryProps> = ({ category }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(category);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const handleEditSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    axios
      .patch(`/api/categories/${category.id}`, categoryToEdit)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setOpenModalEdit(false);
        router.refresh();
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setCategoryToEdit((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDeleteCategory = (id: string) => {
    axios
      .delete(`/api/categories/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setOpenModalEdit(false);
        router.refresh();
      });
  };

  return (
    <li className="p-3 my-5 bg-slate-200" key={category.id}>
      <h1 className="text-2xl font-bold">{category.name}</h1>
      <p>{category.description}</p>
      <div className="pt-5">
        <button
          className="text-blue-700 mr-3"
          onClick={() => setOpenModalEdit(true)}
        >
          Edit
        </button>

        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form className="w-full" onSubmit={handleEditSubmit}>
            <h1 className="text-2xl pb-3">Add New Category</h1>
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="w-full p-2"
              value={categoryToEdit.name || ""}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Description"
              name="description"
              className="w-full p-2 my-5"
              value={categoryToEdit.description || ""}
              onChange={handleChange}
            />

            <button type="submit" className="bg-blue-700 text-white px-5 py-2">
              Submit
            </button>
          </form>
        </Modal>

        <button
          onClick={() => setOpenModalDelete(true)}
          className="text-red-700 mr-3"
        >
          Delete
        </button>
        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
          <h1 className="text-2xl pb-3">
            Are you sure, you want to delete this category?{" "}
          </h1>
          <div>
            <button
              onClick={() => handleDeleteCategory(category.id)}
              className="text-blue-700 font-bold mr-5"
            >
              YES
            </button>
            <button
              onClick={() => setOpenModalDelete(false)}
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

export default Category;
