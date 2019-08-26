'use-strict'

import UserModule from '../modules/users'

export default (options) => {
  const { id } = options

  if (id) {
    return UserModule.read(id)
  } else {
    return UserModule.list()
  }
}