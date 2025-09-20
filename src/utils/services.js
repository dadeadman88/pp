import { URL } from "../constants";
import utils from "./utils";

class service {
  async get(endpoint, headers = {}) {
    var postData = {
      method: "GET",
      headers: {
        accept: "application/json",
        ...headers,
      },
      timeout: 30000,
    };

    return fetch(URL.Baseurl + endpoint, postData)
      .then((response) => response.json())
      .then((response) => {
        if ("response" in response) {
          return Promise.resolve(response);
        }
        return Promise.resolve(response);
      })
      .catch((error) => {
        error.errorCode = 999;
        return Promise.reject(error);
      });
  }

  async put(endpoint, headers = {}, body = {}, isFormData = false) {
    var postData = {
      method: "PUT",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        ...headers,
      },
      timeout: 30000,
    };

    return fetch(URL.Baseurl + endpoint, postData)
      .then((response) => response.json())
      .then((response) => {
        if ("response" in response) {
          return Promise.resolve(response);
        }
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  async post(endpoint, headers = {}, body = {}, isFormData = false) {
    var postData = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        ...headers,
      },
    };

    if (isFormData) {
      postData.headers = {
        ...postData.headers,
        "content-type": "multipart/form-data",
      };
    }

    if (!utils.isEmpty(body)) {
      postData.body = isFormData ? body : JSON.stringify(body);
    }

    console.log(URL.Baseurl + endpoint, postData);

    return fetch(URL.Baseurl + endpoint, postData)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if ("response" in response) {
          return Promise.resolve(response);
        }
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  async delete(endpoint, headers = {}, body = {}, isFormData = false) {
    var postData = {
      method: "DELETE",
      headers,
      timeout: 30000,
    };

    if (!utils.isEmpty(body)) {
      postData.body = isFormData ? body : JSON.stringify(body);
    }

    return fetch(URL.Baseurl + endpoint, postData)
      .then((response) => response.json())
      .then((response) => {
        if ("response" in response) {
          return Promise.resolve(response);
        }
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  async patch(endpoint, headers = {}, body = {}, isFormData = false) {
    var postData = {
      method: "PATCH",
      headers,
      timeout: 30000,
    };

    if (!utils.isEmpty(body)) {
      postData.body = isFormData ? body : JSON.stringify(body);
    }

    return fetch(URL.Baseurl + endpoint, postData)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((response) => {
        if ("response" in response) {
          return Promise.resolve(response);
        }
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
}
export default new service();
