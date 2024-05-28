import React from "react";
import API from "../../api/base";

async function login(values) {
  return await API.post("auth/login/", values);
}

export default login;
