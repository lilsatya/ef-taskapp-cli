'use strict'

import { users } from './_seed'

export default {
  list: () => users,
  read: (id) => users.filter(user => user.id === id),
  delete: (id) => {
    if (id !== -1) {
      return `User with id=${id} has been deleted`
    } else {
      return 'Please include the id (--id={userId}) to delete the user'
    }
  },
  update: (id, body) => `User with id=${id} has been updated`
}