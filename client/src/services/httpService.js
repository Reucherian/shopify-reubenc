import axios from "axios";

export default class HTTPService {
  constructor (client = axios) {
    this.client = client;
  }

  async GetRequest({ url = '' } = {}) {
    try {
      const response = await this.client.get(url);
      const { data } = response;
      return data;
    } catch (error) {
      throw error;
    }
  }

  async DownloadRequest({ url = '' } = {}) {
    try {
      const response = await this.client.get(url,{responseType:"blob"});
      return response;
    } catch (error) {
      throw error;
    }
  }

  async PostRequest({ url = '' } = {},req) {
    try {
      const response = await this.client.post(url,req);
      const { data } = response;
      return data;
    } catch (error) {
      throw error;
    }
  }
  

  async PatchRequest({ url = '' } = {},req) {
    try {
      console.log(url);
      const response = await this.client.patch(url,req);
      const { data } = response;
      return data;
    } catch (error) {
      throw error;
    }
  }

  async DeleteRequest({ url = '' } = {}) {
    try {
      const response = await this.client.delete(url);
      const { data } = response;
      return data;
    } catch (error) {
      throw error;
    }
  }

}