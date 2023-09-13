import React, { useState } from "react";

interface InputProps {
  name: string;
  onChange: (value: string) => void;
  myclass: string;
}

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

export const Input: React.FC<InputProps> = ({ name, onChange, myclass }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newValue = event.target.value;
    setInputValue(newValue);
    // Llama a la función onChange con el nuevo valor
    onChange(newValue);
  };

  return (
    <input
      name={name}
      className={classNames(
        myclass,
        "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      )}
      type="text"
      value={inputValue}
      onChange={handleInputChange}
    />
  );
};

export const TextArea: React.FC<InputProps> = ({ name, onChange, myclass }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const newValue = event.target.value;
    setInputValue(newValue);
    // Llama a la función onChange con el nuevo valor
    onChange(newValue);
  };

  return (
    <textarea
      name={name}
      className={classNames(
        myclass,
        "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      )}
      rows={3}
      value={inputValue}
      onChange={handleInputChange}
    />
  );
};
