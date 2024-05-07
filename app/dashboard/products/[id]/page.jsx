import React from "react";
import styles from "@/app/ui/dashboard/products/singleProduct/singleProduct.module.css";
import Image from "next/image";
import { updateProduct } from "@/app/lib/actions";
import { fetchProduct } from "@/app/lib/data";

const SingleProductPage =async ({params}) => {

  const {id} = params;
  const product = await fetchProduct(id)
  
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src="/noavatar.png" alt="" fill></Image>
        </div>

       Title
      </div>
      <div className={styles.formContainer}>
        <form action={updateProduct} className={styles.form}>
          <input type="hidden" name="id" value={2}/>
          <label>Title</label>
          <input type="text" name="title" placeholder="Phone" />
          <label>Price</label>
          <input type="number" name="number" placeholder="1234" />
          <label>Stock</label>
          <input type="number" name="stock" placeholder="132" />
          <label>Color</label>
          <input type="text" name="color" placeholder="red" />
          <label>Size</label>
          <input type="text" name="size" placeholder="XL" />
          <label>Category</label>
          <select name="cat" id="cat">
            <option value="kitchen">Kitchen</option>
            <option value="computer">Computers</option>
          </select>
          <label>Description</label>
          <textarea name="desc" id="desc" rows="10" placeholder="sas"></textarea>
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleProductPage;
