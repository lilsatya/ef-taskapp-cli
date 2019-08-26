'use strict'

import arg from 'arg'
import util from 'util'

import UserModule from './functions/users'
import TaskModule from './functions/tasks'

// Init DB
//TaskModule.init()

const parseArgumentsIntoOptions = rawArgs => {
  const args = arg(
    {
      '--id': String,
      '--rev': String,
      '--remove': Boolean,
      '--update': Boolean,
      '--add': Boolean,
      '--title': String,
      '--description': String,
      '--help': Boolean,

      // shorthands
      '-r': '--remove',
      '-u': '--update',
      '-a': '--add',
      '-h': '--help'
    },
    {
      argv: rawArgs.slice(2)
    }
  )

  return {
    module: args._[0],
    id: args['--id'] || null,
    rev: args['--rev'] || null,
    remove: args['--remove'] || false,
    update: args['--update'] || false,
    add: args['--add'] || false,
    title: args['--title'] || null,
    description: args['--description'] || null,
    help: args['--help'] || false
  }
}

const renderHelp = () => {
  return `
    Modules:
    tasks
    users

    use ef-taskapp {module} to do operations

    Arguments:
    CRUD
    --remove / -r = Remove an object, must be paired with --id and --rev
    --update / -u = Update an object, must be paired with --id, and --title or --description
    --add / -a = Add a new object, must be paired with --id and --description
    OTHER
    --id = Needed for any single object manipulation
    --rev = Needed for --remove
    --title = Title of task
    --description = Description of task
    --help = Show help menu
  `
}

const matchModule = (module, options) => {
  const { id, rev, update, remove, add, title, description } = options
  const body = {
    title,
    description
  }
  
  if (remove) {
    return module.remove(id, rev)
  } else if (add) {
    return module.add(body)
  } else if (update) {
    return module.update(id, body)
  } else if (id) {
    return module.read(id)
  } else {
    return module.list()
  }
}

const parseArgumentsIntoModule = options => {
  const { module, help } = options

  if (help) return renderHelp()

  switch (module) {
  case 'users':
    return matchModule(UserModule, options)
  case 'tasks':
    return matchModule(TaskModule, options)
  default:
    return 'Please include module after initial command: ["users", "tasks"]'
  }
}
 
export async function cli(args) {
  try {
    let options = parseArgumentsIntoOptions(args)
    options = await parseArgumentsIntoModule(options)
    console.log(typeof options === 'string' ? console.log(options) : util.inspect(options, false, null, true))
  } catch (err) {
    console.log(err)
  }
}