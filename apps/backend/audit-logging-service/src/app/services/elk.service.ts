import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";
import { ServiceLog } from "../interfaces/log.interface";

@Injectable()
export class ElkService {
  private readonly logstashUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.logstashUrl = this.configService.get("LOGSTASH_URL") || "http://localhost:8099";
  }

  async indexLog(logData: ServiceLog) {
    try {
      const timestamp = new Date();

      await firstValueFrom(
        this.httpService.post(this.logstashUrl, {
          ...logData,
          "@timestamp": timestamp.toISOString(),
          type: "service_log",
        }),
      );
    } catch (error) {
      console.error("Failed to send log to Logstash:", error);
      // В случае ошибки все равно выводим в консоль
      console.log("Log that failed to send:", JSON.stringify(logData, null, 2));
    }
  }
}
