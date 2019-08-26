'use-strict'

import UserModule from '../modules/users'
import TaskModule from '../modules/tasks'

export default async (options) => {
  const { id, rev, update, remove, add, title, description, assigneeId, dueDate, status, tags, sync } = options
  const assignee = await UserModule.read(Number(assigneeId))
  let body = {
    title,
    description,
    assignee,
    dueDate: dueDate && new Date(dueDate),
    status: add ? 'backlog' : status,
    tags: tags && tags.split(',')
  }
  
  if (sync) {
    return TaskModule.sync()
  } else if (remove) {
    return TaskModule.remove(id, rev)
  } else if (add) {
    for (let i = 0; i < Object.keys(body).length; i++) {
      const key = Object.keys(body)[i]
      if (!body[key]) {
        return `${Object.keys(body)[i]} is null, please include when adding new item`
      }
    }
    body.createdAt = new Date()

    return TaskModule.add(body)
  } else if (update) {
    // Necessary to remove any undefined values
    body = JSON.parse(JSON.stringify(body))
    body.dirtyAt = new Date()
    return TaskModule.update(id, body)
  } else if (id) {
    return TaskModule.read(id)
  } else {
    return TaskModule.list()
  }
}