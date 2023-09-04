import axios, { AxiosPromise } from "axios";

interface HasId {
  id?: number;
}

/**
 * Gives us the ability to save and fetch data from a server
 * - T is constrained to be an object with an id property that is a number
 */
export class ApiSync<T extends HasId> {
  constructor(public rootUrl: string) {}

  /**
   * Fetches data from the server
   * @param id - number
   * @returns AxiosPromise
   */
  fetch(id: number): AxiosPromise {
    return axios.get(`${this.rootUrl}/${id}`);
  }

  /**
   * If the data has an id, then we do a put request to update the data
   * If the data does not have an id, then we do a post request to create the data
   * @param data - T
   * @returns AxiosPromise
   */
  save(data: T): AxiosPromise {
    const { id } = data;

    if (id) {
      return axios.put(`${this.rootUrl}/${id}`, data);
    } else {
      return axios.post(this.rootUrl, data);
    }
  }
}
