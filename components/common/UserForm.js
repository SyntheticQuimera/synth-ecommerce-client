import React, { useEffect, useState } from "react";
import countriesData from "@/data/countries+cities.json";
import {
  CitySelectInput,
  CountrySelectInput,
  PostalCodeInput,
  TextInput,
} from "@/components/common";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Loading } from "./Loading";

export const UserForm = ({ handleDataSubmit, Title, Dark = false }) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setSelectedCity("");
  };

  const handleSelectCity = (city) => {
    setSelectedCity(city);
  };

  const selectedCountryData = countriesData.find(
    (country) => country.name === selectedCountry
  );

  const filteredCities = selectedCountryData?.cities;

  useEffect(() => {
    setIsLoading(true);

    axios.get("/api/address").then((response) => {
      if (response.data) {
        setUserData(response.data);
        setSelectedCity(response.data.city);
        setSelectedCountry(response.data.country);
      }
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <div
        className={`${
          Dark ? "bg-neutral text-neutral-content" : ""
        } w-full rounded-2xl p-6 space-y-4 text-center`}
      >
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <h1 className='text-3xl font-semibold'>{Title}</h1>
            <Formik
              enableReinitialize
              initialValues={{
                name: userData?.name || "",
                email: userData?.email || "",
                city: selectedCity || "",
                postalCode: userData?.postalCode || "",
                streetAddress: userData?.streetAddress || "",
                country: selectedCountry || "",
              }}
              validationSchema={Yup.object({
                name: Yup.string()
                  .max(40, "Must be 40 characters or less")
                  .required("Required"),
                email: Yup.string()
                  .email("Invalid email address")
                  .required("Required"),
                city: Yup.string().required("Required"),
                postalCode: Yup.string()
                  .max(8, "Must be 8 characters or less")
                  .required("Required"),
                streetAddress: Yup.string()
                  .max(60, "Must be 60 characters or less")
                  .required("Required"),
                country: Yup.string().required("Required"),
              })}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  const data = {
                    ...values,
                  };
                  handleDataSubmit(data);
                  setSubmitting(false);
                }, 400);
              }}
            >
              {(formik) => (
                <Form
                  className={`flex flex-col gap-4 ${
                    Dark ? "text-base-content" : ""
                  }`}
                >
                  <TextInput
                    label='Name'
                    name='name'
                    type='text'
                    placeholder='John Doe'
                    Dark
                  />

                  <TextInput
                    label='Email Address'
                    name='email'
                    type='email'
                    placeholder='johndoe@example.com'
                    Dark
                  />

                  <CountrySelectInput
                    countries={countriesData}
                    value={selectedCountry}
                    onChange={(e) => {
                      handleSelectCountry(e.target.value);
                      formik.setFieldValue("country", e.target.value);
                    }}
                    label='Country'
                    name='country'
                    Dark
                  />
                  <div className='flex sm:flex-row flex-col gap-4 w-full'>
                    <CitySelectInput
                      onChange={(e) => {
                        handleSelectCity(e.target.value);
                        formik.setFieldValue("city", e.target.value);
                      }}
                      label='City'
                      name='city'
                      value={selectedCity}
                      filteredCities={filteredCities}
                      Dark
                    />

                    <PostalCodeInput
                      label='Postal Code'
                      name='postalCode'
                      type='text'
                      placeholder='00000-000'
                      Dark
                    />
                  </div>
                  <TextInput
                    label='Street Address'
                    name='streetAddress'
                    type='text'
                    placeholder='123 Main St'
                    Dark
                  />

                  <button type='submit' className='btn btn-primary w-full mt-6'>
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </>
        )}
      </div>
    </>
  );
};
