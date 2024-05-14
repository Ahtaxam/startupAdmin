// import moment from "moment"
// import { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import TitleCard from "../../../components/Cards/TitleCard"
// import { showNotification } from '../../common/headerSlice'
// import InputText from '../../../components/Input/InputText'
// import TextAreaInput from '../../../components/Input/TextAreaInput'
// import ToogleInput from '../../../components/Input/ToogleInput'

// function ProfileSettings(){

//     const dispatch = useDispatch()

//     // Call API to update profile settings changes
//     const updateProfile = () => {
//         dispatch(showNotification({message : "Profile Updated", status : 1}))
//     }

//     const updateFormValue = ({updateType, value}) => {
//         console.log(updateType)
//     }

//     return(
//         <>

//             <TitleCard title="Profile Settings" topMargin="mt-2">

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <InputText labelTitle="Name" defaultValue="Alex" updateFormValue={updateFormValue}/>
//                     <InputText labelTitle="Email Id" defaultValue="alex@dashwind.com" updateFormValue={updateFormValue}/>
//                     <InputText labelTitle="Title" defaultValue="UI/UX Designer" updateFormValue={updateFormValue}/>
//                     <InputText labelTitle="Place" defaultValue="California" updateFormValue={updateFormValue}/>
//                     <TextAreaInput labelTitle="About" defaultValue="Doing what I love, part time traveller" updateFormValue={updateFormValue}/>
//                 </div>
//                 <div className="divider" ></div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <InputText labelTitle="Language" defaultValue="English" updateFormValue={updateFormValue}/>
//                     <InputText labelTitle="Timezone" defaultValue="IST" updateFormValue={updateFormValue}/>
//                     <ToogleInput updateType="syncData" labelTitle="Sync Data" defaultValue={true} updateFormValue={updateFormValue}/>
//                 </div>

//                 <div className="mt-16"><button className="btn btn-primary float-right" onClick={() => updateProfile()}>Update</button></div>
//             </TitleCard>
//         </>
//     )
// }

// export default ProfileSettings

"use client";

import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { toast } from "react-toastify";
import uploadImageToCloudinary from "../../../utils/uploadImage";

function ProfileSettings() {
  const currentValues = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({
    firstName: currentValues.firstName,
    lastName: currentValues.lastName,
    email: currentValues.email,
    password: currentValues.password,
  });
  const [loading, setLoading] = useState(false);
  const handleValue = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const [selectedImage, setProfileImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(user, selectedImage);
    try {
      const link = await uploadImageToCloudinary(selectedImage);
      const result = await fetch(
        process.env.REACT_APP_BASE_URL + "/api/v1/profile/update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            ...user,
            profileImage: link.url,
          }),
        }
      );

      const { message, data, status } = await result.json();
      if (!data) {
        toast.error(message);
        return;
      }
      localStorage.setItem(
        "user",
        JSON.stringify({ ...currentValues, ...data })
      );

      toast.success(message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Server Error");
      console.log(error);
    }
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setProfileImage(file);
  };
  return (
    <form
      className="flex max-w-md flex-col gap-4 justify-center mx-auto"
      onSubmit={handleSubmit}
    >
      <div className="">
        <p className="text-center text-3xl font-bold mt-4">Update Profile</p>

        <div className="mb-4 flex items-center justify-center">
          <label htmlFor="image" className="cursor-pointer">
            <img
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : currentValues.profileImage
              }
              alt=""
              className="w-20 h-20 rounded-full border border-gray-400"
            />
            <div className="relative">
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageChange(e)}
              />
              {/* <FaCamera className="absolute cursor-pointer right-3 -top-6" /> */}
            </div>
          </label>
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="firstName" value="First Name" />
          </div>
          <TextInput
            id="firstName"
            type="text"
            name="firstName"
            placeholder="Enter First Name"
            required
            value={user.firstName}
            onChange={handleValue}
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="lastName" value="Last Name" />
          </div>
          <TextInput
            id="lastName"
            type="text"
            name="lastName"
            placeholder="Enter Last Name"
            required
            value={user.lastName}
            onChange={handleValue}
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput
            id="email1"
            type="email"
            name="email"
            placeholder="name@gmail.com"
            required
            readOnly
            value={user.email}
            onChange={handleValue}
          />
        </div>

        <Button className="mt-2" type="submit">
          {loading ? "Updating...." : "Update"}
        </Button>
      </div>
    </form>
  );
}

export default ProfileSettings;
