import axios, { AxiosPromise } from "axios";

interface HasId {
  id?: number;
}

/**
 * Gives us the ability to save this
 * persons data to a remote server, then
 * retrieve it in the future
 */
export class Sync<T extends HasId> {
  constructor(public rootUrl: string) {}

  fetch(id: number): AxiosPromise {
    return axios.get(`${this.rootUrl}/${id}`);
  }

  save(data: T): AxiosPromise {
    const { id } = data;

    if (id) {
      return axios.put(`${this.rootUrl}/${id}`, data);
    } else {
      return axios.post(this.rootUrl, data);
    }
  }
}
