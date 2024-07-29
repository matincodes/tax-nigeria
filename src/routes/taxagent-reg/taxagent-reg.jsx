import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import fetchWithRetry from "../../lib/fetchData";
import { MultiSelect } from "react-multi-select-component";
import { useAuth } from "../../context/AuthContext";

const TaxAgentReg = () => {
  const { user } = useAuth();
  const [agentData, setAgentData] = useState({
    emailAddress: "",
    address: "",
    city: "",
    lgaId: "",
    description: "",
    firstName: "",
    lastName: "",
    telephone: "",
    maxCap: "",
    userpwd: "",
  });

  const [selectedState, setSelectedState] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [failed, setFailed] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [taxStations, setTaxStations] = useState(null);
  const [miniTaxStations, setMiniTaxStations] = useState([]);
  const [selectedMiniTaxStations, setSelectedMiniTaxStations] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [lgaData, setLgaData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStateData = async () => {
      try {
        const data = await Promise.all([
          axios("https://assettrack.com.ng/api/TaxStation"),
          axios("https://assettrack.com.ng/api/MiniTaxStation"),
          axios("https://assettrack.com.ng/api/State"),
        ]);
        setTaxStations(data[0].data);
        setMiniTaxStations(data[1].data);
        setStateData(data[2].data);
      } catch (error) {
        console.error("Error fetching state data", error);
      }
    };

    fetchStateData();
  }, []);

  useEffect(() => {
    if (!selectedState) return;

    const fetchLgaData = async () => {
      try {
        const response = await axios.get(
          `https://assettrack.com.ng/api/lgas/bystate/${selectedState}`,
        );
        setLgaData(response.data);
      } catch (error) {
        console.error("Error fetching LGA Data", error);
      }
    };

    fetchLgaData();
  }, [selectedState]);

  useEffect(() => {
    const isComplete = Object.values(agentData).every(
      (value) => value.trim() !== "",
    );
    setDisabled(!isComplete);
  }, [agentData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgentData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("agent data", {
        ...agentData,
        id: 0,
        consultantId: 0,
        wallletId: 0,
        agentPics: "",
        userRole: "Agent",
        miniStationsIDs: selectedMiniTaxStations.map(({ value }) => value),
      });
      await fetchWithRetry({
        method: "POST",
        data: {
          ...agentData,
          id: 0,
          consultantId: 0,
          wallletId: 0,
          agentPics: "",
          senderUserId: user.email,
          miniStationsIDs: selectedMiniTaxStations.map(({ value }) => value),
        },
        url: "https://assettrack.com.ng/api/Agent/WithCredentials",
      });
      setFailed(false);
      setSuccess(true);
      alert("Successfully created Tax Agent");
      navigate(-1);
    } catch (error) {
      setFailed(true);
      console.error("Error creating Tax Station", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-montserrat flex flex-col items-center">
      <div className="flex flex-col text-center mt-6 mb-8">
        <h2 className="font-bold text-3xl">Tax Agent Registration</h2>
        <p className="font-normal text-2xl">
          This can be done in less than a minute!
        </p>
      </div>
      <div className="w-3/5">
        <form className="flex flex-col items-center">
          <div className="w-full flex gap-16 pb-4">
            <div className="flex flex-col w-full">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded"
                value={agentData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col w-full">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded"
                value={agentData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="w-full flex gap-16 pb-5">
            <div className="w-full flex flex-col pb-5">
              <label>Email</label>
              <input
                type="email"
                name="emailAddress"
                value={agentData.emailAddress}
                placeholder="Enter Email Address"
                onChange={handleChange}
                className="border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded"
              />
            </div>
            <div className="w-full flex flex-col">
              <label>Password</label>
              <input
                type="text"
                placeholder="Create Temporary Password"
                name="userpwd"
                value={agentData.userpwd}
                onChange={handleChange}
                className="border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded"
              />
            </div>
          </div>
          <div className="w-full flex gap-16 pb-5">
            <div className="w-full flex flex-col">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={agentData.address}
                placeholder="Enter Address"
                onChange={handleChange}
                className="border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-400 rounded"
              />
            </div>
            <div className="w-full flex flex-col">
              <label>Phone Number</label>
              <input
                type="tel"
                name="telephone"
                value={agentData.telephone}
                placeholder="Enter Phone Number"
                onChange={handleChange}
                className="border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-400 rounded"
              />
            </div>
          </div>
          <div className="w-full flex gap-16 pb-5">
            <div className="w-full flex flex-col">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={agentData.city}
                placeholder="Enter City Tax Station is Located"
                onChange={handleChange}
                className="border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-400 rounded"
              />
            </div>
            <div className="w-full flex flex-col">
              <label>Tax Station</label>
              <select
                name="taxStationId"
                value={agentData.taxStationId}
                onChange={handleChange}
                className="border-2 border-tax-blue py-4 px-5 outline-none rounded text-gray-400 bg-white"
                disabled={!taxStations}
              >
                <option value="" key="select">
                  Select Tax Station
                </option>
                {taxStations?.map(({ id, name }) => (
                  <option className="text-black" value={id} key={id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full flex gap-16 pb-5">
            <div className="w-full flex flex-col bg-white">
              <label>Mini Tax Station</label>
              <MultiSelect
                options={miniTaxStations.map(({ name, id }) => ({
                  label: name,
                  value: id,
                }))}
                value={selectedMiniTaxStations}
                onChange={setSelectedMiniTaxStations}
                labelledBy="Select"
                className="border-2 border-tax-blue py-4 px-5 outline-none rounded text-gray-400 bg-white"
              />
            </div>
          </div>
          <div className="w-full flex gap-16 pb-5">
            <div className="w-full flex flex-col">
              <label>State</label>
              <select
                name="stateId"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="border-2 border-tax-blue py-4 px-5 outline-none rounded text-gray-400 bg-white"
                disabled={!stateData}
              >
                <option value="" key="select">
                  Select State
                </option>
                {stateData?.map(({ stateId, stateName }) => (
                  <option className="text-black" value={stateId} key={stateId}>
                    {stateName}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full flex flex-col">
              <label>LGA</label>
              <select
                name="lgaId"
                value={agentData.lgaId}
                onChange={handleChange}
                disabled={!selectedState}
                className="border-2 border-tax-blue py-4 px-5 outline-none rounded text-gray-400 bg-white"
              >
                <option value="" key="select">
                  Select LGA
                </option>
                {lgaData?.map(({ lgaId, lgaName }) => (
                  <option className="text-black" value={lgaId} key={lgaId}>
                    {lgaName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full flex gap-16 pb-4">
            <div className="w-full flex flex-col">
              <label>Maximum Cap</label>
              <input
                type="text"
                name="maxCap"
                placeholder="Enter Maximum Cap"
                className="border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded"
                value={agentData.maxCap}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="w-full flex flex-col pb-5">
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={agentData.description}
              onChange={handleChange}
              placeholder="Description"
              className="border-2 border-tax-blue py-4 px-5 outline-none placeholder:text-gray-300 rounded"
            />
          </div>
          <div className="w-full pb-5 flex flex-col">
            {failed && (
              <p className="text-red-500 text-center">
                Error: Failed to create Tax Agent
              </p>
            )}
            {success && (
              <p className="text-green-500 text-center">
                Successfully created Tax Agent
              </p>
            )}

            <button
              type="submit"
              className={`bg-tax-blue w-full py-3 text-white rounded-md text-2xl ${
                disabled || loading
                  ? "opacity-70 cursor-not-allowed"
                  : "opacity-100 cursor-pointer"
              }`}
              disabled={disabled || loading}
              onClick={handleSubmit}
            >
              {loading ? "Submitting..." : "Confirm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaxAgentReg;
