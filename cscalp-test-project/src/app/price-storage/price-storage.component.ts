import { Component, OnInit } from '@angular/core';
import { PriceStorageService } from "./price-storage-service.service";

@Component({
  selector: 'app-price-storage',
  templateUrl: './price-storage.component.html',
  styleUrls: ['./price-storage.component.css']
})
export class PriceStorageComponent implements OnInit {
  newPrice: number | undefined; // Новая цена для добавления
  minPrices: { interval: string, value: number | undefined }[] = []; // Массив минимальных цен для отображения
  maxPrices: { interval: string, value: number | undefined }[] = []; // Массив максимальных цен для отображения

  constructor(private storageService: PriceStorageService) {}

  ngOnInit(): void {
    // Запуск таймера для получения текущей цены и обновления мин./макс. цен каждые 5 секунд
    setInterval(() => {
      this.fetchCurrentPrice(); // Получение текущей цены
      this.updateMinMaxPrices(); // Обновление минимальных и максимальных цен
    }, 5000);
  }

  fetchCurrentPrice(): void {
    // Симуляция получения текущей цены фьючерса
    const currentPrice = Math.random() * 1000; // Пример: Случайная цена от 0 до 1000
    const timestamp = Date.now();
    this.storageService.addPrice(currentPrice, timestamp); // Добавление текущей цены в хранилище
  }

  // Метод для добавления новой цены и обновления минимальной и максимальной цен
  addPrice(): void {
    const timestamp = Date.now();
    this.storageService.addPrice(this.newPrice, timestamp);
    this.updateMinMaxPrices();
  }

  updateMinMaxPrices(): void {
    // Интервалы времени для запроса минимальной и максимальной цен
    const intervals = ['5 мин', '15 мин', '1 час', '4 часа', '24 часа'];
    // Обновление минимальных цен для каждого интервала
    this.minPrices = intervals.map(interval => ({
      interval,
      value: this.storageService.getMinPrice()
    }));
    // Обновление максимальных цен для каждого интервала
    this.maxPrices = intervals.map(interval => ({
      interval,
      value: this.storageService.getMaxPrice()
    }));
  }

  // Вспомогательная функция для конвертации интервала времени в миллисекунды
  private  convertIntervalToMilliseconds(interval: string): number {
    switch (interval) {
      case '5 мин':
        return 5 * 60 * 1000;
      case '15 мин':
        return 15 * 60 * 1000;
      case '1 час':
        return 60 * 60 * 1000;
      case '4 часа':
        return 4 * 60 * 60 * 1000;
      case '24 часа':
        return 24 * 60 * 60 * 1000;
      default:
        return 0;
    }
  }
}
