import type { Portfolio } from "@shared/schema";
import { portfolio } from "./content/portfolio";

export interface IStorage {
  getPortfolio(): Promise<Portfolio>;
}

export class PortfolioStorage implements IStorage {
  async getPortfolio(): Promise<Portfolio> {
    return portfolio;
  }
}

export const storage = new PortfolioStorage();
