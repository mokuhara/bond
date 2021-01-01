import Cookies from 'js-cookie'

const defaultOptions = (isCredential: boolean) => {
  let options = {
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    }
  }

  if (isCredential) {
    const token = Cookies.get('bdt');

    options = Object.assign(options, {
      credentials: 'include',
      headers: {
        "Authorization": `bearer ${token}`,
      }
    })
  }

  return options
}

export const get = (path: string, additionalOptions: object = {}, isCredential: boolean = false): Promise<Response> => {
  const options: object = Object.assign(defaultOptions(isCredential), additionalOptions)

  return fetch(path, {
      method: "GET",
      ...options
  })
}

export const destroy = (path: string, additionalOptions: object = {}, isCredential: boolean = false): Promise<Response> => {
  const options: object = Object.assign(defaultOptions(isCredential), additionalOptions)

  return fetch(path, {
      method: "DELETE",
      ...options
  })
}

export const post = (path: string, body: object, additionalOptions: object = {}, isCredential: boolean = false): Promise<Response> => {
  let options: object = Object.assign(defaultOptions(isCredential), additionalOptions)

  return fetch(path, {
      method: 'POST',
      ...options,
      body: JSON.stringify(body),
  })
}

export const put = (path: string, body: object, additionalOptions: object = {}, isCredential: boolean = false): Promise<Response> => {
  let options: object = Object.assign(defaultOptions(isCredential), additionalOptions)

  return fetch(path, {
      method: 'PUT',
      ...options,
      body: JSON.stringify(body),
  })
}
