import fetch, { RequestInit } from 'node-fetch';
import { env } from '../env';

export class HTTPClient {
  private readonly endpoint = `${env.url}/api`;

  private async fetch(url: string, options: RequestInit) {
    try {
      const res = await fetch(url, options);
      const json = await res.json();
      if (!res.ok)
        throw json;

      return json;
    } catch (error) {
      return error;
    }
  }

  get(route: string, headers?: any) {
    return this.fetch(`${this.endpoint}/${route}`, {
      method: 'GET',
      headers
    });
  }

  post(route: string, body: any, headers?: any) {
    return this.fetch(`${this.endpoint}/${route}`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  }

  put(route: string, body: any, headers?: any) {
    return this.fetch(`${this.endpoint}/${route}`, {
      method: 'PUT',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  }

  delete(route: string, headers?: any) {
    return this.fetch(`${this.endpoint}/${route}`, {
      method: 'DELETE',
      headers
    });
  }
}
