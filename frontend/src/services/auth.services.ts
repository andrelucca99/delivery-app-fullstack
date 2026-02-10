import { api } from "./api";

interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    role: "CUSTOMER" | "SELLER";
  };
}

export async function login(email: string, password: string) {
  const { data } = await api.post<LoginResponse>("/auth/login", {
    email,
    password,
  });

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  return data.user;
}
