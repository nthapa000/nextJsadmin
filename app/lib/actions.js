"use server";
import { revalidatePath } from "next/cache";
import { Product, User } from "./model";
import { connectToDB } from "./util";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import {signIn} from "../auth"

export const addUser = async (formData) => {
  const { username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);
  // Create a new user and edit to mongoDB
  try {
    connectToDB();
    const salt = await bcrypt.genSalt(10);
    // password is now crypted
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
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

export const updateUser = async (formData) => {
  const { id, username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);
  // Create a new user and edit to mongoDB
  try {
    connectToDB();
    //   currently if there are parts where we don't write anything then there will be an empty string send to use we want that we don't want to update the empty string we only want to update thing which we want
    const updateField = {
      username,
      email,
      password,
      isAdmin,
      isActive,
      phone,
      address,
    };
    Object.keys(updateField).forEach(
      (key) => (updateField[key] == "" || undefined) && delete updateField[key]
    );
    await User.findByIdAndUpdate(id, updateField);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update user");
  }
  //   will automatically refresh the data
  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const addProduct = async (formData) => {
  const { title, desc, price, stock, color, size } =
    Object.fromEntries(formData);
  // Create a new user and edit to mongoDB
  try {
    connectToDB();
    const newProduct = new Product({
      title,
      desc,
      price,
      stock,
      color,
      size,
    });

    await newProduct.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create user");
  }
  //   will automatically refresh the data
  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};

export const deleteProduct = async (formData) => {
  const { id } = Object.fromEntries(formData);
  //   console.log(id);
  // Create a new user and edit to mongoDB
  try {
    connectToDB();
    await Product.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete product");
  }
  //   will automatically refresh the data
  revalidatePath("/dashboard/products");
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);
  // console.log(id);
  // Create a new user and edit to mongoDB
  try {
    connectToDB();
    await User.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete User");
  }
  //   will automatically refresh the data
  revalidatePath("/dashboard/users");
};

export const updateProduct = async (formData) => {
  const { id, title, desc, price, stock, color, size } =
    Object.fromEntries(formData);
  // Create a new user and edit to mongoDB
  try {
    connectToDB();
    //   currently if there are parts where we don't write anything then there will be an empty string send to use we want that we don't want to update the empty string we only want to update thing which we want
    const updateField = {
      title,
      desc,
      price,
      stock,
      color,
      size,
    };
    Object.keys(updateField).forEach(
      (key) => (updateField[key] == "" || undefined) && delete updateField[key]
    );
    await Product.findByIdAndUpdate(id, updateField);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update product");
  }
  //   will automatically refresh the data
  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};

export const authenticate = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);
//   console.log(password);
  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    if (err.message.includes("CredentialsSignin")) {
      // console.log("Bhai tera desi hai")
      return "Wrong Credentials";
    }
    throw err;
  }
};
