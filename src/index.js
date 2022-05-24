import enquirer  from 'enquirer'
import { clonaProjeto } from './clona-projeto.js'
import { configuraAmbiente } from './configura-ambiente.js'
import { parseArgs } from './util.js'
import spinner from 'cli-spinners'
import loading from 'loading-cli'
import { config } from 'dotenv'
import path from 'node:path'
import localConfig from './config.js'

config({ path: `${localConfig.root}${path.sep}.env` })

export const load = loading('')
load.frame(spinner.simpleDots.frames)

export async function main(args) {
  const acceptedArgs = parseArgs(args)

  if(acceptedArgs.includes('clone')) return clonaProjeto()
  if(acceptedArgs.includes('config')) return configuraAmbiente()

  const prompt = await enquirer.select({
    name: 'options',
    message: 'Qual operação deseja fazer?',
    choices: ['Configurar ambiente', 'Clonar projeto']
  })

  if(prompt === 'Clonar projeto') clonaProjeto()
  if(prompt === 'Configurar ambiente') configuraAmbiente()
}

