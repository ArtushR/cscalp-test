import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PriceStorageService {
  private prices: { timestamp: number, price: number }[] = [];
  private minPrice: number | undefined;
  private maxPrice: number | undefined;

  constructor() {
    setInterval(() => {
      this.cleanupOldData();
    }, 60000); // Удаление устаревших данных каждую минуту
  }

  addPrice(price: number | undefined, timestamp: number): void {
    if (price !== undefined) {
      this.prices.push({ timestamp, price });
      // Обновление минимальной и максимальной цен при добавлении новой цены
      if (this.minPrice === undefined || price < this.minPrice) {
        this.minPrice = price;
      }
      if (this.maxPrice === undefined || price > this.maxPrice) {
        this.maxPrice = price;
      }
    }
  }

  getMinPrice(): number | undefined {
    return this.minPrice;
  }

  getMaxPrice(): number | undefined {
    return this.maxPrice;
  }

  private cleanupOldData(): void {
    const now = Date.now();
    const twentyFourHoursAgo = now - 24 * 60 * 60 * 1000;
    this.prices = this.prices.filter(p => p.timestamp >= twentyFourHoursAgo);
    // При удалении устаревших данных также пересчитываем минимальную и максимальную цены
    this.recalculateMinMax();
  }

  private recalculateMinMax(): void {
    if (this.prices.length === 0) {
      this.minPrice = undefined;
      this.maxPrice = undefined;
      return;
    }
    let min = this.prices[0].price;
    let max = this.prices[0].price;
    for (const priceObj of this.prices) {
      if (priceObj.price < min) {
        min = priceObj.price;
      }
      if (priceObj.price > max) {
        max = priceObj.price;
      }
    }
    this.minPrice = min;
    this.maxPrice = max;
  }
}
