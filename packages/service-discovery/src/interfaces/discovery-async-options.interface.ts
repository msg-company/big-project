import { IDiscoveryModuleOptions } from "./discovery-options.interface";
import { Provider } from "@nestjs/common";

export interface IDiscoveryModuleAsyncOptions {
  useFactory: (...args: any[]) => Promise<IDiscoveryModuleOptions> | IDiscoveryModuleOptions;
  inject?: any[];
  extraProviders?: Provider[];
}
