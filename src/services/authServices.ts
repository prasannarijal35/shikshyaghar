import myAxios from "./apiServices";
export const login = async (email: string, password: string) => {
  const response = await myAxios.post(
    "/auth/login",
    {
      email,
      password,
    },
    {
      isAuthRoute: false,
    }
  );

  return response.data;
};

export const register = async (
  fullName: string,
  email: string,
  password: string,
  confirmPassword: string,
  role: "teacher" | "student",
  phone?: string,
  gender?: string,
  birthYear?: number,
  teachingExperience?: string,
  currentlyStudying?: string
) => {
  const response = await myAxios.post(
    "/auth/register",
    {
      fullName,
      email,
      password,
      confirmPassword,
      role,
      phone,
      gender,
      birthYear,
      teachingExperience,
      currentlyStudying,
    },
    {
      isAuthRoute: false,
    }
  );

  return response.data;
};
