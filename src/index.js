import enquirer  from 'enquirer'
import { clonaProjeto } from './clona-projeto.js'
import { configuraAmbiente } from './configura-ambiente.js'
import { parseArgs } from './util.js'
import spinner from 'cli-spinners'
import loading from 'loading-cli'

export const load = loading('')
load.frame(spinner.monkey.frames)

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

