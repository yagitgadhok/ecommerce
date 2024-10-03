import axios from "axios";
import { useState, useEffect } from "react";
// import api from "../../utility/api";

export const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressId, setAddressId] = useState();
  const [newAddress, setNewAddress] = useState({
    _id: "",
    houseNo: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const userId = localStorage.getItem("userId");
  const headers = { token: localStorage.getItem("token") };
  //   let addressId = "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/users/${userId}`,
          { headers }
        );
        setAddresses(response.data.addresses);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddAddress = async () => {
    if (isEditing) {
      const updatedAddresses = [...addresses];
      updatedAddresses[editIndex] = newAddress;
      console.log(addressId);
      const updatePayload = {
        addressId: addressId,
        street: newAddress.street,
        city: newAddress.city,
        state: newAddress.state,
        postalCode: newAddress.postalCode,
      };
      try {
        const response = await axios.post(
          `http://localhost:3000/api/users/update-address`,
          updatePayload,
          { headers }
        );
      } catch (err) {}
      setAddresses(updatedAddresses);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setAddresses([...addresses, newAddress]);
      const payload = {
        userId,
        houseNo: newAddress.houseNo,
        street: newAddress.street,
        city: newAddress.city,
        state: newAddress.state,
        postalCode: newAddress.postalCode,
      };
      try {
        const response = await axios.post(
          `http://localhost:3000/api/users/add-address`,
          payload,
          { headers }
        );
      } catch (err) {}
    }
    setNewAddress({
      houseNo: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
    });
  };

  // Handle editing an address
  const handleEditAddress = (index) => {
    const addressToEdit = addresses[index];
    setNewAddress(addressToEdit);
    setIsEditing(true);
    setEditIndex(index);
    setAddressId(addressToEdit._id);
  };

  // Handle deleting an address
  const handleDeleteAddress = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
  };

  return (
    <div>
      <section className="relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
          <div className="grid grid-cols-12">
            <div className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
              <div className="flex items-center justify-between pb-8 border-b border-gray-300">
                <h2 className="font-manrope font-bold text-3xl leading-10 text-black">
                  Address
                </h2>
              </div>

              {/* Address List */}
              <ul className="mt-4 w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                {addresses.map((address, index) => (
                  <li
                    key={index}
                    className="w-full border-b border-gray-200 dark:border-gray-600 flex items-center justify-between"
                  >
                    <div className="flex items-center ps-3">
                      <input
                        id={`list-radio-${index}`}
                        type="radio"
                        value={index}
                        name="list-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        checked={selectedAddress === index}
                        onChange={() => setSelectedAddress(index)}
                      />
                      <label
                        htmlFor={`list-radio-${index}`}
                        className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        {`${address.houseNo}, ${address.street}, ${address.city}, ${address.state}, ${address.postalCode}`}
                      </label>
                    </div>

                    <div className="flex items-center">
                      <button
                        className="p-2"
                        onClick={() => handleEditAddress(index)}
                      >
                        ✏️
                      </button>
                      <button
                        className="p-2"
                        onClick={() => handleDeleteAddress(index)}
                      >
                        🗑️
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <h3 className="font-bold text-lg">
                  {isEditing ? "Edit Address" : "Add New Address"}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="House No"
                    className="border p-2"
                    value={newAddress.houseNo}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, houseNo: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Street"
                    className="border p-2"
                    value={newAddress.street}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, street: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="City"
                    className="border p-2"
                    value={newAddress.city}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, city: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="State"
                    className="border p-2"
                    value={newAddress.state}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, state: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="postalCode"
                    className="border p-2"
                    value={newAddress.postalCode}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        postalCode: e.target.value,
                      })
                    }
                  />
                </div>
                <button
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleAddAddress}
                >
                  {isEditing ? "Update Address" : "Add Address"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
