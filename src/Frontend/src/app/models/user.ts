export class User {
    name: string;
    email: string;
    password: string;
    rol: number[];
    files_id: string[];
    post_id: string[];
    verified: {
      state: number;
      code: number;
    };
    ips: string[];
  
    constructor(
      name: string,
      email: string,
      password: string,
      rol: number[] = [],
      files_id: string[] = [],
      post_id: string[] = [],
      verified: { state: number; code: number } = { state: 0, code: 0 },
      ips: string[] = []
    ) {
      this.name = name;
      this.email = email;
      this.password = password;
      this.rol = rol;
      this.files_id = files_id;
      this.post_id = post_id;
      this.verified = verified;
      this.ips = ips;
    }
  }