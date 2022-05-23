import axios from "axios"

export const github = () => {
  const TOKEN = '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'
  const api = axios.create({
    auth: {
      username: 'bluemarble-network',
      password: TOKEN
    }
  })

  const repos = async (field) => {
    const { data } = await api.get('https://api.github.com/user/repos')

    if (field) {
      const reposFormatados = data.map(item => item[field])

      return reposFormatados
    } else return data
  }

  return {
    repos
  }
}
