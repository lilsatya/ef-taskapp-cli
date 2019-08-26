'use strict'

import { constructor } from './db'

this.db = constructor('tasks')

export const list = async () => await this.db.allDocs({ include_docs: true, descending: true })
export const read = async (id) => await this.db.get(id.toString())
export const remove = async (id, rev) => {
  if (id) {
    return await this.db.remove(id.toString(), rev.toString())
  } else {
    return 'Please include the id (--id={taskId}) to delete the task'
  }
}
export const update = async (id, body) => await this.db.put({
  _id: id,
  ...body
})
export const add = async (body) => await this.db.post(body)

export default {
  list,
  read,
  remove,
  update,
  add
}