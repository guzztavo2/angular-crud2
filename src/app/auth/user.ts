export default class User {
  id: number;
  name: string;
  email: string;
  password: string;

  toString() { }

  toJson(): string {
    return JSON.stringify({
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
    });
  }
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
    if (user !== null) {
      user = JSON.parse(user);
      return new User(
        (user as any).name,
        (user as any).email,
        (user as any).password,
        (user as any).id
      );
    }

    return null;
  }

  static removeFromID(id: number): Boolean {
    const users = this.usersList();

    const user = users.findIndex(user => user.id == id);

    if (user == null)
      return false;

    delete users[user];

    User.setUsersList(users.filter((user) => user !== undefined));

    return true;
  }

  static setUsersList(users: User[]) {
    if (users.length == 0)
      localStorage.setItem('users', JSON.stringify([]));

    localStorage.setItem('users', JSON.stringify(users));
  }
}
