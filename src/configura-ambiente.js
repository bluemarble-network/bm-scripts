import { exec } from 'child_process'
import fs from 'fs/promises'
import { promisify } from 'node:util'
import path from 'path'
import os from 'os'
import enquirer  from 'enquirer'
import { load } from './index.js'

const execute = promisify(exec)
const CONFIG_CONTENT = `Host work
  Hostname github.com
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/work_rsa`
const ROOT_PATH = process.cwd().split(path.sep).slice(0, 3).join('/')
const FILE_RSA_PATH = os.platform() === 'win32' ? `${ROOT_PATH}/.ssh/work_rsa` : '~/.ssh/work_rsa'

async function createSshKey() {
  try {
    const fileAlreadyExists = await fs.readFile(FILE_RSA_PATH)
    if (fileAlreadyExists) {
      const result = await fs.readFile(`${FILE_RSA_PATH}.pub`, { encoding: 'utf8' })
      console.log('Chave já existe:\n')
      console.log(result)
      return
    }
  } catch (error) {
  }
  
  try {
    load.text = "Gerando nova chave pública"
    load.start()
    await execute(`ssh-keygen -t rsa -b 4096 -C "bluemarblenetwork@gmail.com.br" -f "$HOME/.ssh/work_rsa" -N  '""'`, { shell: 'pwsh' })
    await fs.writeFile(`${ROOT_PATH}/.ssh/config`, CONFIG_CONTENT)
    const result = await fs.readFile(`${FILE_RSA_PATH}.pub`, { encoding: 'utf8' })
    load.stop()
    console.log('Chave pública gerada 🌹:\n')
    console.log(result)
  } catch (error) {
    console.log('Não foi possível criar chave SSH', error)
  } finally {
    load.stop()
  }
}

async function createEnv(){
  const response = await enquirer.prompt({ type: 'input', name: 'token', message: 'Insira o token' })
  const currentPath = process.cwd()  
  await fs.writeFile(`${currentPath}/.env`, `GITHUB_TOKEN=${response.token}`)
  console.log('BM-CLI configurada com sucesso! ✅')
}

export async function configuraAmbiente(){
  await createSshKey()
  await createEnv()
}
