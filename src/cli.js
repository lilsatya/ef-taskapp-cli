'use strict'

import arg from 'arg'
import util from 'util'

import TaskController from './controllers/tasks'
import UserController from './controllers/users'

const parseArgumentsIntoOptions = rawArgs => {
  const args = arg(
    {
      '--id': String,
      '--rev': String,
      '--remove': Boolean,
      '--update': Boolean,
      '--add': Boolean,
      '--sync': Boolean,
      '--title': String,
      '--description': String,
      '--userId': String,
      '--dueDate': String,
      '--status': String,
      '--tags': String,
      '--help': Boolean,

      // shorthands
      '-r': '--remove',
      '-u': '--update',
      '-a': '--add',
      '-s': '--sync',
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
    sync: args['--sync'] || false,
    title: args['--title'] || null,
    description: args['--description'] || null,
    userId: args['--userId'] || null,
    dueDate: args['--dueDate'] || null,
    status: args['--status'] || null,
    tags: args['--tags'] || null,
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
    --sync / -s = Sync local db with remote
    OTHER
    --id = Needed for any single object manipulation
    --userId = Needed for --add
    --dueDate = date format: 1970-01-20
    --status = input one of the following value: backlog, in-progress, completed
    --tags = input tags, separated with comma: tag,tag2,tag3
    --rev = Needed for --remove
    --title = Title of task
    --description = Description of task
    --help = Show help menu
  `
}

const parseArgumentsIntoModule = options => {
  const { module, help } = options

  if (help) return renderHelp()

  switch (module) {
  case 'tasks':
    return TaskController(options)
  case 'users':
    return UserController(options)
  default:
    return 'Please include module after initial command: ["tasks", "users"]'
  }
}
 
export async function cli(args) {
  try {
    let options = parseArgumentsIntoOptions(args)
    options = await parseArgumentsIntoModule(options)
    console.log(typeof options === 'string' ? options : util.inspect(options, false, null, true))
  } catch (err) {
    console.log(err)
  }
}