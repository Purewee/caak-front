import Configure from '../component/configure';

const searchFields = ['title^9', 'description^6', 'keyword.name^5', 'keyword.mn^5'];
export const defaultFilters = [{ range: { publish_date: { lte: 'now' } } }, { exists: { field: 'image' } }];

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
      body: JSON.stringify(data),
    })
      .then((response) => response.json().then((json) => ({ json, ok: response.ok })))
      .then(({ json, ok }) => ({ ok, data: json }))
      .catch((e) => ({ ok: false, data: e }));
  }

  home_articles(page = 0, size = 24) {
    return this.post({
      query: {
        bool: {
          must: defaultFilters,
        },
      },
      sort: { publish_date: 'desc' },
      size: size,
      from: page * size,
    }).then(convertHits);
  }

  stories(page = 0, size = 10) {
    return this.post({
      query: {
        bool: {
          must: [
            ...defaultFilters,
            {
              nested: {
                path: 'categories',
                query: { term: { 'categories.slug': 'travel' } },
              },
            },
          ],
        },
      },
      size: size,
      from: page * size,
    }).then(convertHits);
  }

  boostedPosts(page = 0, size = 3) {
    return this.post({
      query: {
        bool: {
          must: [...defaultFilters, { term: { 'data.is_featured': true } }],
        },
      },
      sort: { views_count: 'desc' },
      size: size,
      from: size * size,
    }).then(convertHits);
  }

  categoryPosts(slug, rest) {
    return this.post({
      query: {
        bool: {
          must: [
            ...defaultFilters,
            {
              nested: {
                path: 'categories',
                query: { term: { 'categories.slug': slug } },
              },
            },
          ],
        },
      },
      ...rest,
    }).then(convertHitsTotal);
  }

  authorPosts(authorId, page = 0, size = 24) {
    return this.post({
      query: {
        bool: {
          must: [...defaultFilters, { term: { 'author.id': authorId } }],
        },
      },
      size: size,
      from: size * page,
      sort: { publish_date: 'desc' },
    }).then(convertHitsTotal);
  }

  search(q, page = 0, size = 24) {
    return this.post({
      query: {
        bool: {
          must: defaultFilters,
          should: [
            { simple_query_string: { query: q, fields: searchFields } },
            { multi_match: { query: q, type: 'phrase_prefix', fields: searchFields } },
          ],
        },
      },
      min_score: 5,
      size: size,
      from: size * page,
      sort: { _score: 'desc' },
    }).then(convertHitsTotal);
  }
}

export function convertHits(response) {
  if (!response?.ok) return [];
  return response.data.hits.hits.map((p) => ({ id: p._id, ...p._source }));
}

export function convertHitsTotal(response) {
  if (!response.ok) return { hits: [], total: 0 };
  return {
    hits: response.data.hits.hits.map((p) => ({ id: p._id, ...p._source })),
    total: response.data.hits.total.value,
  };
}
