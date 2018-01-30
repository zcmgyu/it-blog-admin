import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_ERROR,
  AUTH_CHECK,
  AUTH_GET_PERMISSIONS
} from "admin-on-rest";

export default (type, params) => {
  // called when the user attempts to log in
  if (type === AUTH_LOGIN) {
    const { username, password } = params;
    const request = new Request(
      `http://localhost:9292/oauth/token?grant_type=password&username=${username}&password=${password}`,
      {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: new Headers({
          Authorization: "Basic " + btoa("client_app:client_secret"),
          "Content-Type": "application/json"
        })
      }
    );
    // Fetch Access Token Promise
    const response = fetch(request)
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(({ access_token }) => {
        localStorage.setItem("token", access_token);
      });

    //  Fetch Roles Promise
    const rolesPromise = response.then(() => {
      const requestRole = new Request(`http://localhost:9292/api/auth/roles`, {
        method: "GET",
        headers: new Headers({
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json"
        })
      });
      return fetch(requestRole)
        .then(response => {
          if (response.status < 200 || response.status >= 300) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then(roles => {
          return roles;
        });
    });
    // Check ROLE
    return rolesPromise.then(roles => {
      if (roles.filter(role => role.authority === "ADMIN").length > 0) {
        localStorage.setItem("role", "ADMIN");
        return Promise.resolve();
      }
      return Promise.reject();
    });
  }
  // called when the user clicks on the logout button
  if (type === AUTH_LOGOUT) {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    return Promise.resolve();
  }
  if (type === AUTH_ERROR) {
    // ...
  }
  if (type === AUTH_CHECK) {
    return localStorage.getItem("token") ? Promise.resolve() : Promise.reject();
  }
  if (type === AUTH_GET_PERMISSIONS) {
    const role = localStorage.getItem("role");
    return Promise.resolve(role);
  }

  return Promise.reject("Unkown method");
};
