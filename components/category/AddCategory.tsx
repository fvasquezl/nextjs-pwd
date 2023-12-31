"use client";
import { useState } from "react";
import { Modal } from "../Modal";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Input, TextArea } from "@/components/FormElements";

const AddCategory = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    axios
      .post("/api/categories", {
        name,
        description,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        router.refresh();
        setModalOpen(false);
        router.refresh();
      });
  };


  const handleInputChange = (value: string): void => {
    setName(value);
  };
  const handleTextAreaChange = (value: string): void => {
    setDescription(value);
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="bg-blue-700 text-white p-3 cursor-pointer"
      >
        Add NewCategory
      </button>
      <Modal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        title="Add New Category"
      >
        <form className="w-full" onSubmit={handleSubmit}>
          <Input name="name" onChange={handleInputChange} myclass="mt-5" />
          <TextArea
            name="description"
            myclass="my-5"
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
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddCategory;
