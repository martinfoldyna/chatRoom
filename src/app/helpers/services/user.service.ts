
export class UserService {
  getUserInfo() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return user ? user : false;
  }

  getCurrentRoom() {
    const connectedToRoom = JSON.parse(sessionStorage.getItem('currentRoom'));
    return connectedToRoom ? connectedToRoom : false;
  }




}
