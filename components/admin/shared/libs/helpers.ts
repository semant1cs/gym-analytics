export const viewDate = (date: string | number | Date) => {
  date = new Date(date)
  if (date instanceof Date && isFinite(Date.parse(`${date}`))) {
    const timeOptions: any = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }
    const d = date.toLocaleDateString('ru-RU', timeOptions)
    return d
  } else {
    return 'Некорректная дата'
  }
}

export const hash = (str = '', seed = 0) => {
  if (typeof str !== 'string') {
    str = String(str)
  }

  if (typeof seed !== 'number') {
    seed = 0
  }

  let h1 = 0xDEADBEEF ^ seed
  let h2 = 0x41C6CE57 ^ seed
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i)
    h1 = Math.imul(h1 ^ ch, 2654435761)
    h2 = Math.imul(h2 ^ ch, 1597334677)
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909)
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909)

  return 4294967296 * (2097151 & h2) + (h1 >>> 0)
}

export const generateString = (len = 8) => {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < Number(len); i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export const uid = () => {
  const str = generateString()
  const date = Date.parse((new Date()).toString())
  return hash(str + date.toString())
}

// Илюха привет
export const getErrorByPath = (testErrors: Record<string, any>, ...path: any) => {
  let err = testErrors
  for (const onePath of path) {
    if (!err[onePath]) {
      return null
    } else {
      err = err[onePath]
    }
  }

  return err
}
