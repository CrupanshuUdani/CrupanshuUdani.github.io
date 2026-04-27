import type { Express } from "express";
import type { Server } from 'node:http';
import { storage } from "./storage";
import { portfolioSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/portfolio", async (_req, res) => {
    const portfolio = await storage.getPortfolio();
    const parsed = portfolioSchema.parse(portfolio);
    res.json(parsed);
  });

  return httpServer;
}
