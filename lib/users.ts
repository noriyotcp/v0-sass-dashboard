export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export const users: User[] = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "bret",
    email: "leanne-graham@example.com",
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "antonette",
    email: "ervin-howell@example.com",
  },
  {
    id: 3,
    name: "Clementine Bauch",
    username: "samantha",
    email: "clementine-bauch@example.com",
  },
];
