"use client";
import React, { useState, Fragment } from "react";
import { Modal } from "../Modal";
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

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
          <p className="first-letter:capitalize font-semibold leading-6 text-gray-900">
            {category.name}
          </p>
          <p className="first-letter:capitalize mt-1 text-sm leading-5 text-gray-500">
            {category.description}
          </p>
        </div>
      </div>
      <Modal
        modalOpen={openModalDelete}
        setModalOpen={setOpenModalDelete}
        title=""
      >
        <h1 className="text-lg pt-5">
          Are you sure, you want to delete this category?{" "}
        </h1>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            onClick={() => handleDeleteCategory(category.id)}
            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          >
            Yes
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            onClick={() => setOpenModalDelete(false)}
          >
            No
          </button>
        </div>
      </Modal>
      <Modal
        modalOpen={openModalEdit}
        setModalOpen={setOpenModalEdit}
        title="Edit Category"
      >
        <form className="w-full" onSubmit={handleEditSubmit}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={categoryToEdit.name || ""}
            onChange={handleChange}
          />

          <textarea
            name="description"
            className="my-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            rows={4}
            value={categoryToEdit.description || ""}
            onChange={handleTextAreaChange}
          />

          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
            >
              Submit
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              onClick={() => setOpenModalEdit(false)}
            >
              Cancel
            </button>
          </div>
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
