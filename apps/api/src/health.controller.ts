import { Controller, Get } from "@nestjs/common";

@Controller("health")
export class HealthController {
  @Get()
  check() {
    return {
      status: "ok",
      service: "legacy-hosting-api",
      version: "2026.1.0",
      timestamp: new Date().toISOString(),
    };
  }
}
