import enquirer  from 'enquirer'
import { exec } from 'child_process'
import { promisify } from 'node:util'
import { github } from './github.js'
import { load } from './index.js'

const PREFIX = 'work'
const execute = promisify(exec)


export async function gitClonaProjeto(projeto){
  await execute(`git clone git@${PREFIX}:bluemarble-network/${projeto}.git`)
}

export async function clonaProjeto(){
  const gitApi = github()
  load.text = 'Carregando repositorios'
  load.start()

  const repos = await gitApi.repos('name')
  load.stop()

  const projeto = await enquirer.autocomplete({
    name: 'projeto',
    message: 'Escolha o projeto',
    limit: 10,
    initial: 2,
    choices: repos
  })

  load.text = `Clonando projeto ${projeto}`
  load.start()
  
  await gitClonaProjeto(projeto)
  load.stop()
}
