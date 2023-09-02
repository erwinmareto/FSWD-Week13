import instance from "../modules/axios";

async function login(user) {
  try {
    const { email, password } = user;

    const response = await instance({
      method: "POST",
      url: "/login",
      data: {
        email,
        password,
      },
    });

    const { token } = response.data;
    localStorage.setItem("token", token);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

async function register(user) {
  try {
    const response = await instance({
      method: "POST",
      url: "/register",
      data: {
        ...user
      },
    });
    return response.data;
  } catch (error) {
      console.log(error);
    throw new Error(error.response.data.message);
  }
}

export { login, register };
