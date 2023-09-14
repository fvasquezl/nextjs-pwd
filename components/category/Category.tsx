"use client";
import React, { useState, Fragment } from "react";
import Modal from "../Modal.resp";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

interface CategoryProps {
  category: {
    id: string;
    name: string;
    description: string;
  };
}

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
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
    <li
      key={category.id}
      className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 lg:px-8"
    >
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto">
          <p className="text-2xl font-semibold leading-6 text-gray-900">
            {category.name}
          </p>
          <p className="mt-1 text-sm leading-5 text-gray-500">
            {category.description}
          </p>
        </div>
      </div>
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
      <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
        <form className="w-full" onSubmit={handleEditSubmit}>
          <h1 className="text-2xl pb-3">Edit New Category</h1>
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
      <Menu as="div" className="relative flex-none">
        <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
          <span className="sr-only">Open options</span>
          <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-50" : "",
                    "block px-3 py-1 text-sm leading-6 text-gray-900"
                  )}
                  onClick={() => setOpenModalEdit(true)}
                >
                  Edit<span className="sr-only">, ssss</span>
                </a>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={() => setOpenModalDelete(true)}
                  href="#"
                  className={classNames(
                    active ? "bg-gray-50" : "",
                    "block px-3 py-1 text-sm leading-6 text-gray-900"
                  )}
                >
                  Delete
                </a>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </li>
  );
};

export default Category;
