import axios, { AxiosRequestConfig } from "axios";

export async function fetchData( url: string, config?: AxiosRequestConfig) {
  try {
    const response = await axios(url, config);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
