export default class User {
  id: number;
  name: string;
  email: string;
  password: string;

  constructor(
    name: string,
    email: string,
    password: string,
    id: number | undefined = undefined
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.id = id == undefined ? User.usersLength() + 1 : id;
  }

  static usersLength(): number {
    var users = localStorage.getItem('users');

    if (users == null) return 0;
    else {
      return (JSON.parse(users) as []).length;
    }
  }

  static usersList(): User[] | [] {
    var result = localStorage.getItem('users');
    if (result !== null) {
      return JSON.parse(result);
    }
    return [];
  }

  static setUser(user: User) {
    let users = User.usersList() as User[];

    users = users.concat([user]);

    localStorage.setItem('users', JSON.stringify(users));

    return users;
  }

  static getUserFromUsersList(email: string, password: string): User | null {
    let user = User.usersList().filter(
      (user: User) => user.email == email && user.password == password
    );
    if (user.length == 0) return null;

    return user[0];
  }

  static setActualUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  static getActualUser(): User | null {
    var user = localStorage.getItem('user');

    if (user !== null) return JSON.parse(user) as User;

    return null;
  }
}
