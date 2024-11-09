export const apiFetch = async (request: any, opts?: unknown) => {
  const baseURL = "http://51.250.45.111:8083"
  const fetch = $fetch.create({
    baseURL
  })

  return await fetch(request, opts ? opts : undefined)
    .catch(e => {
      const error = e
      error.details = {}

      if (e.response && e.response._data) {
        error.message = e.response._data.error
        error.details = e.response._data.details
      }
      throw error
    })
}
