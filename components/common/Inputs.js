import axios from "axios";
import { useField } from "formik";
import React, { useEffect, useState } from "react";
import { IoAlertCircle, IoCloudUpload } from "react-icons/io5";
import { IMaskInput } from "react-imask";

export const TextInput = ({ label, Dark, ...props }) => {
  const [field, meta] = useField(props);
  const showError = meta.touched && meta.error;
  const [hover, setHover] = useState(false);
  return (
    <div className='w-full'>
      <label
        htmlFor={props.id || props.name}
        className={`mb-2 flex gap-2 pl-2 text-sm ${
          Dark ? "text-neutral-content" : ""
        }`}
      >
        {label}
        {showError && (
          <span
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className='relative flex cursor-pointer items-center'
          >
            <IoAlertCircle size={20} className='text-accent' />
            {hover && (
              <span className='absolute left-7 w-fit whitespace-nowrap rounded-full bg-accent px-3 py-1 text-xs text-white'>
                {meta.error}
              </span>
            )}
          </span>
        )}
      </label>
      <input
        className={`input input-bordered w-full ${
          showError ? "input-error" : ""
        }`}
        {...field}
        {...props}
        onBlur={() => field.onBlur(field.name)}
      />
    </div>
  );
};

export const TextArea = ({ label, Dark, ...props }) => {
  const [field, meta] = useField(props);
  const showError = meta.touched && meta.error;
  const [hover, setHover] = useState(false);
  return (
    <div className='w-full'>
      <label
        htmlFor={props.id || props.name}
        className={`mb-2 flex gap-2 pl-2 text-sm ${
          Dark ? "text-neutral-content" : ""
        }`}
      >
        {label}
        {showError && (
          <span
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className='relative flex cursor-pointer items-center'
          >
            <IoAlertCircle size={20} className='text-accent' />
            {hover && (
              <span className='absolute left-7 w-fit whitespace-nowrap rounded-full bg-accent px-3 py-1 text-xs text-white'>
                {meta.error}
              </span>
            )}
          </span>
        )}
      </label>
      <textarea
        className={`textarea textarea-bordered w-full ${
          showError ? "input-error" : ""
        }`}
        {...field}
        {...props}
        onBlur={() => field.onBlur(field.name)}
      />
    </div>
  );
};

export const FileInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const showError = meta.touched && meta.error;
  const [hover, setHover] = useState(false);
  return (
    <div>
      <label
        htmlFor={props.id || props.name}
        className={`mb-2 flex gap-2 pl-2 text-sm ${
          Dark ? "text-neutral-content" : ""
        }`}
      >
        {label}
        {showError && (
          <span
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className='relative flex cursor-pointer items-center'
          >
            <IoAlertCircle size={20} className='text-accent' />
            {hover && (
              <span className='absolute left-7 w-fit whitespace-nowrap rounded-full bg-accent px-3 py-1 text-xs text-white'>
                {meta.error}
              </span>
            )}
          </span>
        )}
      </label>
      <label className='btn btn-square flex-col btn-outline border-base-300 h-[7rem] w-[7rem]'>
        <IoCloudUpload size={22} />
        <span>Upload</span>
        <input
          accept='image/png, image/gif, image/jpeg'
          type='file'
          className='hidden'
          {...field}
          {...props}
          onBlur={() => field.onBlur(field.name)}
        />
      </label>
    </div>
  );
};

export const SelectInput = ({ label, Dark, ...props }) => {
  const [field, meta] = useField(props);
  const showError = meta.touched && meta.error;
  const [hover, setHover] = useState(false);
  return (
    <div className='w-full'>
      <label
        htmlFor={props.id || props.name}
        className={`mb-2 flex gap-2 pl-2 text-sm ${
          Dark ? "text-neutral-content" : ""
        }`}
      >
        {label}
        {showError && (
          <span
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className='relative flex cursor-pointer items-center'
          >
            <IoAlertCircle size={20} className='text-accent' />
            {hover && (
              <span className='absolute left-7 w-fit whitespace-nowrap rounded-full bg-accent px-3 py-1 text-xs text-white'>
                {meta.error}
              </span>
            )}
          </span>
        )}
      </label>
      <select
        className={`select select-bordered w-full ${
          showError ? "select-error" : ""
        }`}
        {...field}
        {...props}
        onBlur={() => field.onBlur(field.name)}
      />
    </div>
  );
};

export const PostalCodeInput = ({ label, Dark, ...props }) => {
  const [field, meta] = useField(props);
  const showError = meta.touched && meta.error;
  const [hover, setHover] = useState(false);

  return (
    <div>
      <label
        htmlFor={props.id || props.name}
        className={`mb-2 flex gap-2 pl-2 text-sm ${
          Dark ? "text-neutral-content" : ""
        }`}
      >
        {label}
        {showError && (
          <span
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className='relative flex cursor-pointer items-center'
          >
            <IoAlertCircle size={20} className='text-accent' />
            {hover && (
              <span className='absolute left-7 w-fit whitespace-nowrap rounded-full bg-accent px-3 py-1 text-xs text-white'>
                {meta.error}
              </span>
            )}
          </span>
        )}
      </label>
      <IMaskInput
        className={`input-bordered input w-full ${
          showError ? "input-error" : ""
        }`}
        {...field}
        {...props}
        onBlur={() => field.onBlur(field.name)}
        mask='00000-000'
        unmask={true}
        radix='.'
      />
    </div>
  );
};

export const CountrySelectInput = ({ label, Dark, countries, ...props }) => {
  const [field, meta] = useField(props);
  const showError = meta.touched && meta.error;
  const [hover, setHover] = useState(false);

  return (
    <div className='w-full'>
      <label
        htmlFor={props.id || props.name}
        className={`mb-2 flex gap-2 pl-2 text-sm ${
          Dark ? "text-neutral-content" : ""
        }`}
      >
        {label}
        {showError && (
          <span
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className='relative flex cursor-pointer items-center'
          >
            <IoAlertCircle size={20} className='text-accent' />
            {hover && (
              <span className='absolute left-7 w-fit whitespace-nowrap rounded-full bg-accent px-3 py-1 text-xs text-white'>
                {meta.error}
              </span>
            )}
          </span>
        )}
      </label>
      <select
        className={`select select-bordered w-full ${
          showError ? "select-error" : ""
        }`}
        {...field}
        {...props}
        onBlur={() => field.onBlur(field.name)}
      >
        <option value=''>Select a country</option>
        {countries?.map((country) => (
          <option key={country.id} value={country.name}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export const CitySelectInput = ({ label, Dark, filteredCities, ...props }) => {
  const [field, meta] = useField(props);
  const showError = meta.touched && meta.error;
  const [hover, setHover] = useState(false);

  return (
    <div className='w-full'>
      <label
        htmlFor={props.id || props.name}
        className={`mb-2 flex gap-2 pl-2 text-sm ${
          Dark ? "text-neutral-content" : ""
        }`}
      >
        {label}
        {showError && (
          <span
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className='relative flex cursor-pointer items-center'
          >
            <IoAlertCircle size={20} className='text-accent' />
            {hover && (
              <span className='absolute left-7 w-fit whitespace-nowrap rounded-full bg-accent px-3 py-1 text-xs text-white'>
                {meta.error}
              </span>
            )}
          </span>
        )}
      </label>
      <select
        className={`select select-bordered w-full ${
          showError ? "select-error" : ""
        }`}
        {...field}
        {...props}
        onBlur={() => field.onBlur(field.name)}
      >
        <option value=''>Select a city</option>
        {filteredCities?.map((city, index) => (
          <option key={city.id} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
};
