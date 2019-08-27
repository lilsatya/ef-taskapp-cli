'use strict'

import PouchDB from 'pouchdb'
import fs from 'fs'

export const constructorLocal = (dbName) => {
  const prefix = 'db/'
  if (!fs.existsSync(prefix)) {
    fs.mkdirSync(prefix)
  }

  return new PouchDB(prefix + dbName, { adapter: 'leveldb' })
}

export const constructorRemote = (dbName, dbConfig) => {
  const { couchDBUrl, couchDBAuth } = dbConfig
  const db = new PouchDB(`${couchDBUrl}/${dbName}`, { auth: couchDBAuth })

  return db
}