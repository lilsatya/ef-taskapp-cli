'use strict'

import PouchDB from 'pouchdb'

export const constructorLocal = (dbName) => {
  const db = new PouchDB(`db/${dbName}`, { adapter: 'leveldb' })

  return db
}

export const constructorRemote = (dbName, dbConfig) => {
  const { couchDBUrl, couchDBAuth } = dbConfig
  const db = new PouchDB(`${couchDBUrl}/${dbName}`, { auth: couchDBAuth })

  return db
}