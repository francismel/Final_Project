import tokenService from "./tokenService";
const BASE_URL = "/api/analysisRequest/";

function analyzeRequest(formData) {
  return fetch(BASE_URL + "analyzeRequest", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(formData),
  }).then((res) => {
    if (res.ok) return res.json();
    throw new Error("there was a problem");
  });
}

export default {
  analyzeRequest,
};
