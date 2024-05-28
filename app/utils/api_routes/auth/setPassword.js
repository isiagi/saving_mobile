import React from "react";
import API from "../../api/base";

async function setPasswordRoute(value) {
  return await API.post("auth/get_password/", value);
}

export default setPasswordRoute;
