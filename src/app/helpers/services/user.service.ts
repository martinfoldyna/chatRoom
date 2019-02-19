export class UserService {
  getUserInfo() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return user ? user : false;
  }

  getCurrentRoom() {
    const connectedToRoom = sessionStorage.getItem('connectedToRoom');
    return !!connectedToRoom;
  }
}
