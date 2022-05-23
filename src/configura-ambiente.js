import { exec } from 'child_process'
import fs from 'fs/promises'
import { promisify } from 'node:util'

const execute = promisify(exec)
const CONFIG_CONTENT = `Host work
  Hostname github.com
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/work_rsa`
const FILE_RSA_PATH = '~/.ssh/work_rsa'

async function createSshKey() {
  try {
    await execute(`ssh-keygen -t rsa -b 4096 -C "bluemarblenetwork@gmail.com.br" -G ${FILE_RSA_PATH} -N ""`)
    await fs.writeFile('~/.ssh/config', CONFIG_CONTENT)
    const result = await execute(`cat ${FILE_RSA_PATH}.pub`)
    console.log('Chave pública gerada:\n')
    console.log(result.stdout)
  } catch (error) {
    console.log('Não foi possível criar chave SSH', error)
  }
}

export async function configuraAmbiente(){
  await createSshKey()
}
