import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dyfau2eyl",
  api_key: "764721344926317",
  api_secret: "PzOrGHBtCTUFllrlwS6H4c69ujI",
});

export const uploadImage = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "blog",
  });
};

export const deleteImage = async (id) => {
  return await cloudinary.uploader.destroy(id);
};