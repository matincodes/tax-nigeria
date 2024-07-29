import React, { useState, useEffect } from "react";

const TaxPayerRegistration = () => {
  const [formData, setFormData] = useState({
    TaxPayerId: "",
    FirstName: "",
    Lastname: "",
    Othername: "",
    Address: "",
    PhoneNumber: "",
    Email: "",
    Passport: "",
    NIN: "",
    Gender: "",
    StateId: "",
    LocalGovernmentId: "",
    IdentificationNumber: "",
    IdentityTypeName: "",
    TIN: "",
    MiniTax_id: "",
  });

  const [localGovernments, setLocalGovernments] = useState([]);
  const [miniTaxes, setMiniTaxes] = useState([]);
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    // Fetch local governments and mini taxes for dropdown options
    // Replace with your data fetching logic
    setLocalGovernments([
      { id: 1, name: "Local Government 1" },
      { id: 2, name: "Local Government 2" },
    ]);
    setMiniTaxes([
      { id: 1, name: "Mini Tax 1" },
      { id: 2, name: "Mini Tax 2" },
    ]);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Add form submission logic here
    // If successful, set loading to false and show success message
    // If failed, set loading to false and setFailed to true
  };

  const {
    TaxPayerId,
    FirstName,
    Lastname,
    Othername,
    Address,
    PhoneNumber,
    Email,
    Passport,
    NIN,
    Gender,
    StateId,
    LocalGovernmentId,
    IdentificationNumber,
    IdentityTypeName,
    TIN,
    MiniTax_id,
  } = formData;

  return (
    <div className="font-montserrat flex flex-col items-center">
      <div className="flex flex-col text-center mt-6 mb-8">
        <h2 className="font-bold text-3xl">Tax Payer Registration</h2>
        <p className="font-normal text-2xl">Please fill in the details below</p>
      </div>
      <div className="w-3/5">
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          {[
            {
              label: "Tax Payer ID",
              name: "TaxPayerId",
              type: "text",
              value: TaxPayerId,
            },
            {
              label: "First Name",
              name: "FirstName",
              type: "text",
              value: FirstName,
            },
            {
              label: "Last Name",
              name: "Lastname",
              type: "text",
              value: Lastname,
            },
            {
              label: "Other Name",
              name: "Othername",
              type: "text",
              value: Othername,
            },
            { label: "Address", name: "Address", type: "text", value: Address },
            {
              label: "Phone Number",
              name: "PhoneNumber",
              type: "text",
              value: PhoneNumber,
            },
            { label: "Email", name: "Email", type: "email", value: Email },
            {
              label: "Passport",
              name: "Passport",
              type: "text",
              value: Passport,
            },
            { label: "NIN", name: "NIN", type: "text", value: NIN },
            { label: "Gender", name: "Gender", type: "text", value: Gender },
            {
              label: "State ID",
              name: "StateId",
              type: "number",
              value: StateId,
            },
            {
              label: "Identification Number",
              name: "IdentificationNumber",
              type: "text",
              value: IdentificationNumber,
            },
            {
              label: "Identity Type Name",
              name: "IdentityTypeName",
              type: "text",
              value: IdentityTypeName,
            },
            { label: "TIN", name: "TIN", type: "text", value: TIN },
          ].map((field, index) => (
            <div className="w-full flex flex-col pb-5" key={index}>
              <label>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={field.value}
                onChange={handleChange}
                placeholder={`Enter ${field.label}`}
                className="border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded"
              />
            </div>
          ))}
          <div className="w-full flex gap-16 pb-5">
            <div className="w-full flex flex-col">
              <label>Local Government</label>
              <select
                name="LocalGovernmentId"
                value={LocalGovernmentId}
                onChange={handleChange}
                className="border-2 border-tax-blue py-4 px-5 outline-none rounded text-gray-400 bg-white"
                disabled={!localGovernments.length}
              >
                <option value="" key="select">
                  Select Local Government
                </option>
                {localGovernments.map(({ id, name }) => (
                  <option className="text-black" value={id} key={id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full flex flex-col">
              <label>Mini Tax Station</label>
              <select
                name="MiniTax_id"
                value={MiniTax_id}
                onChange={handleChange}
                className="border-2 border-tax-blue py-4 px-5 outline-none rounded text-gray-400 bg-white"
                disabled={!miniTaxes.length}
              >
                <option value="" key="select">
                  Select Mini Tax Station
                </option>
                {miniTaxes.map(({ id, name }) => (
                  <option className="text-black" value={id} key={id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full pb-5 flex flex-col">
            {failed && (
              <p className="text-red-500 text-center">
                Error: Failed to create Tax Payer
              </p>
            )}
            <button
              className={`bg-tax-blue w-full py-3 text-white rounded-md text-2xl ${
                disabled || loading
                  ? "opacity-70 cursor-not-allowed"
                  : "opacity-100 cursor-pointer"
              }`}
              disabled={disabled || loading}
              type="submit"
            >
              {loading ? "Submitting..." : "Confirm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaxPayerRegistration;
