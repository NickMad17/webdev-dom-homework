export function saveUserToLocalStorage(userData) {
    window.localStorage.setItem("user", JSON.stringify(userData));
  }
  
  export function getUserTokenLocalStorage() {
    try {
        const userToken = JSON.parse(window.localStorage.getItem("user"))
        return userToken[0];
    } catch (error) {
        return null;
    }
  }

  export function getUserNameLocalStorage(user) {
    try {
        const userName = JSON.parse(window.localStorage.getItem("user"));
        return userName[1];
    } catch (error) {
        return null;
    }
  }

  export function getRenderUppLocalStorage() {
    try {
        const bool = JSON.parse(window.localStorage.getItem("user"));
        console.log(bool);
        return bool[2];
    } catch (error) {
        return false;
    }
  } 
  
  export function removeUserFromLocalStorage() {
    window.localStorage.removeItem("user");
  }