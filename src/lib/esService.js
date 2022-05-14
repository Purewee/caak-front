import Configure from "../component/configure";

export class ESService {
  constructor(index) {
    this.index = index;
    this.host = Configure.es;
    this.username = Configure.esa.username;
    this.password = Configure.esa.password;
    this.path = `${index}/article/_search`;
  }

  post(data = {}) {
    return fetch(`${this.host}${this.path}`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        Authorization: `Basic ${btoa(`${this.username}:${this.password}`)}`,
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    })
      .then((response) => response.json().then((json) => ({ json, ok: response.ok })))
      .then(({ json, ok }) => ({ ok, data: json }))
      .catch((e) => ({ ok: false, data: e }))
  }

  home_articles() {
    return this.post({
      query: {
        bool: {
          must: [
            { range: { publish_date: { lte: 'now' } } },
            { exists: { field: 'image' } }
          ]
        }
      },
      sort: { 'publish_date': 'desc' },
      size: 20,
    }).then(convertHits)
  }

  stories() {
    return this.post({
      query: {
        bool: {
          must: [
            { range: { publish_date: { lte: 'now' }}},
            { exists: { field: 'image' }},
            // { nested: { path: 'categories', query: { term: { 'categories.id': 2 }}}},
          ]
        }
      },
      size: 10,
    }).then(convertHits)
  }

  boostedPosts() {
    return this.post({
      query: {
        bool: {
          must: [
            { range: { publish_date: { lte: 'now' }}},
            { exists: { field: 'image' }}
          ]
        }
      },
      sort: { views_count: 'desc' },
      size: 3,
    }).then(convertHits)
  }
}

export const BaseFilter = {
  query: {
    bool: {
      must: [
        { range: { publish_date: { lte: 'now' } } },
        { exists: { field: 'image' } }
      ]
    }
  },
  size: 20,
}

export function convertHits(response) {
  if (!response?.ok) return [];
  return response.data.hits.hits.map((p) => ({ id: p._id, ...p._source }));
}
