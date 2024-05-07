"use server"
import { revalidatePath } from "next/cache";
import { User } from "./model";
import { connectToDB } from "./util";
import { redirect } from "next/navigation";

export const addUser = async (formData) => {
    
  const { username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);
  // Create a new user and edit to mongoDB
  try {
    connectToDB();
    const newUser = new User({
      username,
      email,
      password,
      phone,
      address,
      isAdmin,
      isActive,
    });

    await newUser.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create user");
  }
//   will automatically refresh the data
  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};
