import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { ServiceLog } from "../interfaces/log.interface";
import { ElkService } from "../services/elk.service";

@Controller()
export class LogsController {
  constructor(private readonly elkService: ElkService) {}

  @EventPattern("service-logs")
  async handleLog(data: ServiceLog) {
    await this.elkService.indexLog(data);
  }
}
