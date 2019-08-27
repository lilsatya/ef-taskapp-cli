# ef-taskapp-cli
Tasklist app cli version, using couchDB and pouchDB for offline first

## Install
npm i @lilsatya/ef-taskapp-cli-js
or
npm i @lilsatya/ef-taskapp-cli-js -g

if you want to install globally

## Commands

### Type in cmd: {ef-taskapp} followed with modules and operations
### Example

ef-taskapp tasks (to get list of tasks)

ef-taskapp tasks --id=29asdwua0euai (to get single task)

ef-taskapp tasks -a --title="LALA" --description="LULU" --dueDate="2019-08-30" --assigneeId=1 --tags="tag1,tag2" (to add new task)

ef-taskapp tasks -u --id=29asdwua0euai --rev=1j301njknsadkajw --title="LALA" (to update task)

ef-taskapp tasks -r --id=29asdwua0euai --rev=1j301njknsadkajw (to remove task)

ef-taskapp tasks -s (to sync tasks db with remote db)

### Modules:

tasks

users

use ef-taskapp {module} to do operations

Arguments:

### CRUD

--remove / -r = Remove an object, must be paired with --id and --rev

--update / -u = Update an object, must be paired with --id, and --title or --description

--add / -a = Add a new object, must be paired with --id and --description

--sync / -s = Sync local db with remote

### OTHER

--id = Needed for any single object manipulation

--assigneeId = Needed for --add

--dueDate = date format: 1970-01-20

--status = input one of the following value: backlog, in-progress, completed

--tags = input tags, separated with comma: tag,tag2,tag3

--rev = Needed for --remove

--title = Title of task

--description = Description of task

--help = Show help menu
