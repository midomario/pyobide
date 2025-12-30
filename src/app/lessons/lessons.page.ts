import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { LessonsService, Lesson, Level } from '../services/lessons.service';

interface DisplayLesson {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  icon: string;
  level: string;
  completed: boolean;
}

@Component({
  standalone: true,
  selector: 'app-lessons',
  imports: [IonicModule, TranslateModule, CommonModule, NgFor],
  templateUrl: './lessons.page.html',
  styleUrls: ['./lessons.page.scss'],
})
export class LessonsPage implements OnInit {
  lessons: DisplayLesson[] = [];
  levels: { [key: string]: DisplayLesson[] } = {};

  constructor(
    private router: Router,
    private lessonsService: LessonsService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.loadLessons();
  }

  private loadLessons() {
    this.lessonsService.loadLessons().subscribe(data => {
      const currentLang = this.translate.currentLang || this.translate.defaultLang || 'en';
      this.levels = {};

      Object.keys(data.levels).forEach(levelKey => {
        const level = data.levels[levelKey];
        this.levels[levelKey] = level.lessons.map(lesson => ({
          id: lesson.id,
          title: lesson.translations[currentLang]?.title || lesson.translations['en'].title,
          description: lesson.translations[currentLang]?.description || lesson.translations['en'].description,
          difficulty: levelKey,
          icon: this.getIconForLevel(levelKey),
          level: levelKey,
          completed: this.lessonsService.isLevelCompleted(levelKey)
        }));
      });

      // Flatten for backward compatibility if needed
      this.lessons = Object.values(this.levels).flat();
    });
  }

  private getIconForLevel(level: string): string {
    switch (level) {
      case 'beginner': return 'school-outline';
      case 'intermediate': return 'construct-outline';
      case 'advanced': return 'rocket-outline';
      default: return 'book-outline';
    }
  }

  getDifficultyColor(difficulty: string): string {
    switch (difficulty) {
      case 'beginner': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'danger';
      default: return 'primary';
    }
  }

  openLesson(lesson: DisplayLesson) {
    // Navigate to lesson detail page
    this.router.navigate(['/lesson', lesson.id]);
  }

  getLevelKeys(): string[] {
    return Object.keys(this.levels);
  }

  getLessonsForLevel(level: string): DisplayLesson[] {
    return this.levels[level] || [];
  }
}
