import { CLOUDINARY_URL } from "../constants";

const uploadImage = async (image) => {
  let url;
  let err;
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", "oaktecimages");
  data.append("cloud_name", "dz0gqxh7e");
  await fetch(CLOUDINARY_URL, {
    method: "POST",
    body: data,
  })
    .then((res) => res.json())
    .then((data) => {
      url = data.secure_url;
    })
    .catch((err) => {
      err = err;
    });
  if (!err) {
    return url;
  } else {
    return err;
  }
};

export { uploadImage };