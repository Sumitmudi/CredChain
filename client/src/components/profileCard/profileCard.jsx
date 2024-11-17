import React from "react";
import { useForm } from "react-hook-form";
import Button from "../button/button";

const ProfileCard = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  function onSubmit() {
    //code
  }
  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Username :</label>
          <input {...register("userName")} />
          <Button type="submit" label="Create User" />
        </form>
      </div>
    </>
  );
};

export default ProfileCard;
