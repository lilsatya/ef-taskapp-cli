'use strict'

import { constructorLocal, constructorRemote } from '../config/db'
import dbConfig from '../config/pouch'

const DB_NAME = 'lil_tasks'

this.dbLocal = constructorLocal(DB_NAME)
this.dbRemote = constructorRemote(DB_NAME, dbConfig)

export const list = async () => await this.dbLocal.allDocs({ include_docs: true, descending: true })
export const read = async (id) => await this.dbLocal.get(id.toString())
export const remove = async (id, rev) => {
  if (id) {
    return await this.dbLocal.remove(id.toString(), rev.toString())
  } else {
    return 'Please include the id (--id={taskId}) to delete the task'
  }
}
export const update = async (id, newBody) => {
  let body = await this.dbLocal.get(id)

  body = {
    ...body,
    ...newBody
  }

  return await this.dbLocal.put(body)
}
export const add = async (body) => await this.dbLocal.post(body)
export const sync = async () => {
  await this.dbLocal.replicate.from(`${dbConfig.couchDBUrl}/${DB_NAME}`, { auth: dbConfig.couchDBAuth })
  return await this.dbLocal.sync(`${dbConfig.couchDBUrl}/${DB_NAME}`, { auth: dbConfig.couchDBAuth })
}

export default {
  list,
  read,
  remove,
  update,
  add,
  sync
}