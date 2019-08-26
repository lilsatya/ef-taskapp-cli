'use-strict'

import UserModule from '../modules/users'
import TaskModule from '../modules/tasks'

export default async (options) => {
  const { id, rev, update, remove, add, title, description, userId, dueDate, status, tags, sync } = options
  const user = await UserModule.read(Number(userId))
  const body = {
    title,
    description,
    user,
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
        return `${body[Object.keys[i]]} is null, please include when adding new item`
      }
    }

    return TaskModule.add(body)
  } else if (update) {
    return TaskModule.update(id, body)
  } else if (id) {
    return TaskModule.read(id)
  } else {
    return TaskModule.list()
  }
}