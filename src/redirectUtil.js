import {redirect} from "react-router-dom"

/**
 * This redirect is used temporarily to work around a bug in the mirage server dependency. During hosting, the server is not used, so this redirect is to be imported from react-router-dom instead of redirectUtil.js.
 *
 */

function mutateResponse(path) {
  const response = redirect(path)
  response.body = true
  return response
}

export {mutateResponse as redirect}
