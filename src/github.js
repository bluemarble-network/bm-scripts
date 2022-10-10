import axios from "axios";
import { config } from "dotenv";

config();

export const github = () => {
  const TOKEN = process.env.GITHUB_TOKEN;
  const api = axios.create({
    auth: {
      username: "bluemarble-network",
      password: TOKEN,
    },
  });

  const repos = async (field) => {
    const { data } = await api.get(
      "https://api.github.com/user/repos?per_page=100"
    );

    if (field) {
      const reposFormatados = data.map((item) => item[field]);

      return reposFormatados;
    } else return data;
  };

  return {
    repos,
  };
};
