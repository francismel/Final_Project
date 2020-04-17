const BASE_URL = "/api/analysisRequest/";

function saveRequest(formData) {
  return fetch(BASE_URL + "saveRequest", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(formData),
  })
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error("there was a problem");
    })
    .then((data) => data);
}

function getRequests(userId) {
  return fetch(BASE_URL + "getRequests/" + userId).then((response) => {
    if (response.ok) return response.json();
    throw new Error("didnt work");
  });
}

function delRequest(userRequestInfo) {
  return fetch(
    BASE_URL +
      "delRequest/" +
      userRequestInfo.userId +
      "/" +
      userRequestInfo.reviewId,
    {
      method: "DELETE",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(userRequestInfo),
    }
  ).then((res) => {
    if (res.ok) return res.json();
    throw new Error("there was a problem");
  });
}

export default {
  saveRequest,
  getRequests,
  delRequest,
};
