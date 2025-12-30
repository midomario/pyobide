import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ProgressService } from './progress.service';

export interface Translation {
  title: string;
  description: string;
  content?: string;
  code?: string;
  expected_output?: string;
}

export interface Chapter {
  id: string;
  translations: { [lang: string]: Translation };
  completed?: boolean;
}

export interface Exercise {
  id: string;
  translations: { [lang: string]: Translation };
}

export interface Lesson {
  id: string;
  translations: { [lang: string]: Translation };
  chapters: Chapter[];
  exercises?: Exercise[];
}

export interface Level {
  lessons: Lesson[];
}

export interface LessonsData {
  meta: {
    version: string;
    language_default: string;
  };
  levels: { [level: string]: Level };
}

@Injectable({
  providedIn: 'root'
})
export class LessonsService {
  private lessonsData: LessonsData | null = null;

  constructor(
    private http: HttpClient,
    private progressService: ProgressService
  ) {}

  loadLessons(): Observable<LessonsData> {
    return this.http.get<LessonsData>('assets/data/lessons.json').pipe(
      map(data => {
        this.lessonsData = data;
        this.enrichWithProgress();
        return data;
      })
    );
  }

  private enrichWithProgress(): void {
    if (!this.lessonsData) return;

    Object.keys(this.lessonsData.levels).forEach(levelKey => {
      const level = this.lessonsData!.levels[levelKey];
      level.lessons.forEach(lesson => {
        lesson.chapters.forEach(chapter => {
          chapter.completed = this.progressService.isChapterCompleted(chapter.id);
        });
      });
    });
  }

  getLessonsData(): LessonsData | null {
    return this.lessonsData;
  }

  getLevelKeys(): string[] {
    return this.lessonsData ? Object.keys(this.lessonsData.levels) : [];
  }

  getLessonsForLevel(level: string): Lesson[] {
    return this.lessonsData?.levels[level]?.lessons || [];
  }

  markChapterCompleted(chapterId: string): void {
    this.progressService.markChapterCompleted(chapterId);
    this.updateChapterCompletion(chapterId, true);
    this.checkLevelCompletion();
  }

  private updateChapterCompletion(chapterId: string, completed: boolean): void {
    if (!this.lessonsData) return;

    Object.keys(this.lessonsData.levels).forEach(levelKey => {
      const level = this.lessonsData!.levels[levelKey];
      level.lessons.forEach(lesson => {
        const chapter = lesson.chapters.find(c => c.id === chapterId);
        if (chapter) {
          chapter.completed = completed;
        }
      });
    });
  }

  private checkLevelCompletion(): void {
    if (!this.lessonsData) return;

    Object.keys(this.lessonsData.levels).forEach(levelKey => {
      const level = this.lessonsData!.levels[levelKey];
      const allChaptersCompleted = level.lessons.every(lesson =>
        lesson.chapters.every(chapter => chapter.completed)
      );
      if (allChaptersCompleted && !this.progressService.isLevelCompleted(levelKey)) {
        this.progressService.markLevelCompleted(levelKey);
      }
    });
  }

  isLevelCompleted(level: string): boolean {
    return this.progressService.isLevelCompleted(level);
  }
}