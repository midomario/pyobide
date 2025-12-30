import { Injectable } from '@angular/core';

export interface ProgressData {
  completedChapters: Set<string>;
  completedLevels: Set<string>;
  readChapters: Set<string>;
}

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private readonly STORAGE_KEY = 'python_ide_progress';

  private progress: ProgressData = {
    completedChapters: new Set(),
    completedLevels: new Set(),
    readChapters: new Set()
  };

  constructor() {
    this.loadProgress();
  }

  private loadProgress(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      this.progress.completedChapters = new Set(data.completedChapters || []);
      this.progress.completedLevels = new Set(data.completedLevels || []);
      this.progress.readChapters = new Set(data.readChapters || []);
    }
  }

  private saveProgress(): void {
    const data = {
      completedChapters: Array.from(this.progress.completedChapters),
      completedLevels: Array.from(this.progress.completedLevels),
      readChapters: Array.from(this.progress.readChapters)
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  markChapterCompleted(chapterId: string): void {
    this.progress.completedChapters.add(chapterId);
    this.saveProgress();
  }

  isChapterCompleted(chapterId: string): boolean {
    return this.progress.completedChapters.has(chapterId);
  }

  markLevelCompleted(levelId: string): void {
    this.progress.completedLevels.add(levelId);
    this.saveProgress();
  }

  isLevelCompleted(levelId: string): boolean {
    return this.progress.completedLevels.has(levelId);
  }

  getCompletedChapters(): string[] {
    return Array.from(this.progress.completedChapters);
  }

  getCompletedLevels(): string[] {
    return Array.from(this.progress.completedLevels);
  }

  markChapterAsRead(chapterId: string): void {
    this.progress.readChapters.add(chapterId);
    this.saveProgress();
  }

  isChapterRead(chapterId: string): boolean {
    return this.progress.readChapters.has(chapterId);
  }

  getReadChapters(): string[] {
    return Array.from(this.progress.readChapters);
  }

  resetProgress(): void {
    this.progress.completedChapters.clear();
    this.progress.completedLevels.clear();
    this.progress.readChapters.clear();
    localStorage.removeItem(this.STORAGE_KEY);
  }
}