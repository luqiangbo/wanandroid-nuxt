import qs from 'qs'
export default ($axios) => (resource) => ({
  index() {
    return $axios.$get(`${resource}`)
  },
  show(id) {
    return $axios.$get(`${resource}/${id}`)
  },

  create(payload) {
    return $axios.$post(`${resource}`, payload)
  },

  update(id, payload) {
    return $axios.$post(`${resource}/${id}`, payload)
  },

  delete(id) {
    return $axios.$delete(`${resource}/${id}`)
  },
  get(url) {
    return $axios.$get(`${resource}/${url}`)
  },
  postPayload(url, payload) {
    return $axios.$post(`${resource}/${url}`, qs.stringify(payload))
  },
})
