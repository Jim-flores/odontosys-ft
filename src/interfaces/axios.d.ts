import "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    /**
     * Si es true, no muestra el loader
     */
    noLoader?: boolean;
  }
}
