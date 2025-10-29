import myAxios from "./apiServices";

const studentService = {
  getMyProfile: async () => {
    const res = await myAxios.get("/students/me");
    return res.data;
  },

  updateMyProfile: async (data: any, file?: File) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    if (file) {
      formData.append("profilePicture", file);
    }

    const res = await myAxios.put("/students/me", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  getAllStudents: async () => {
    const res = await myAxios.get("/students");
    return res.data;
  },
};

export default studentService;
