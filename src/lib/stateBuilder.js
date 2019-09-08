const axios = require("axios");

export class StateBuilder {
  constructor() {
    this.commands = [];
  }

  createUser(props = {}) {
    const cmd = {
      url: "http://localhost:3000/users",
      data: {
        username: props.username || "foo",
        password: props.password || "bar"
      }
    };
    this.commands.push(cmd);
    return this;
  }

  clear() {
    return axios.post("http://localhost:3000/clear");
  }

  async run() {
    const results = [];
    for (let cmd of this.commands) {
      const res = await axios.post(cmd.url, cmd.data);
      results.push(res.data);
    }
    this.commands = [];
    return results;
  }
}
