import axios from "axios";

export const uploadImage = async (file, quality) => {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("quality", quality);

  const response = await axios.post("/api/convert", formData, {
    responseType: "blob",
  });

  return response.data;
};
