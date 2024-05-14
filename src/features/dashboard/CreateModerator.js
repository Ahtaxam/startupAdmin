"use client";

import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { toast } from "react-toastify";

function CreateModerator({closeModal}) {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const handleValue = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await fetch(
        process.env.REACT_APP_BASE_URL + "/api/v1/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            ...user,
            role: "Moderator",
          }),
        }
      );

      const { message, data,status } = await result.json();
      if(!data){
        toast.error(message);
        return
      }
      toast.success("Moderator Created Successfully");
      setLoading(false);
      closeModal()
    } catch (error) {
      setLoading(false);
      toast.error("Server Error");
      console.log(error);
    }
  };
  return (
    <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
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
          onChange={handleValue}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Your password" />
        </div>
        <TextInput
          id="password"
          type="password"
          name="password"
          required
          onChange={handleValue}
        />
      </div>

      <Button type="submit">{loading ? "Creating...." :  "Create"}</Button>
    </form>
  );
}

export default CreateModerator;
