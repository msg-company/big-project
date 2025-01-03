import { Provider } from "@nestjs/common";
import { IDiscoveryModuleOptions } from "./discovery-options.interface";

export interface IDiscoveryModuleAsyncOptions {
  useFactory: (...args: any[]) => Promise<IDiscoveryModuleOptions> | IDiscoveryModuleOptions;
  inject?: any[];
  extraProviders?: Provider[];
}
