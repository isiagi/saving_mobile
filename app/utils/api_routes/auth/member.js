import React from "react";
import API from "../../api/base";

async function membership(values) {
  return await API.post("auth/member/", values);
}

export default membership;
