import { API_ROUTES } from "../constants/apiRouts";

// http://ai-planet:65520/upload-pdf/
export const postFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(API_ROUTES.PDF_UPLOAD, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      console.log("File uploaded successfully:", result);
      return { success: true };
    } else {
      console.error("File upload failed:", response.statusText);
      return { success: false };
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    return { success: false };
  }
};

//http://ai-planet:65520/ask-question/
export const postQuestion = async (question) => {
  let body = JSON.stringify({ question: question });

  console.log(typeof body);

  try {
    const response = await fetch(API_ROUTES.ASK_QUESTION, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });

    if (response.ok) {
      const result = await response.json();
      console.log("File uploaded successfully:", result);
      return { success: true, result: result };
    } else {
      console.error("File upload failed:", response.statusText);
      return { success: false };
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    return { success: false };
  }
};
