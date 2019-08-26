'use strict'

import PouchDB from 'pouchdb'

export const constructor = (dbName) => {
  const db = new PouchDB(`db/${dbName}`, { adapter: 'leveldb' })

  return db
}