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
