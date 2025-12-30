import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonsService, Lesson, Chapter, Exercise } from '../services/lessons.service';
import { ProgressService } from '../services/progress.service';

interface DisplayChapter extends Chapter {
  read?: boolean;
}

@Component({
  standalone: true,
  selector: 'app-lesson',
  imports: [IonicModule, TranslateModule, CommonModule],
  templateUrl: './lesson.page.html',
  styleUrls: ['./lesson.page.scss'],
})
export class LessonPage implements OnInit {
  lesson: Lesson | null = null;
  chapters: DisplayChapter[] = [];
  exercises: Exercise[] = [];
  currentLang: string = 'en';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lessonsService: LessonsService,
    private progressService: ProgressService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.currentLang = this.translate.currentLang || this.translate.defaultLang || 'en';
    const lessonId = this.route.snapshot.paramMap.get('id');
    if (lessonId) {
      this.loadLesson(lessonId);
    }
  }

  private loadLesson(lessonId: string) {
    this.lessonsService.loadLessons().subscribe(data => {
      // Find the lesson across all levels
      for (const levelKey of Object.keys(data.levels)) {
        const level = data.levels[levelKey];
        const foundLesson = level.lessons.find(l => l.id === lessonId);
        if (foundLesson) {
          this.lesson = foundLesson;
          this.chapters = foundLesson.chapters.map(chapter => ({
            ...chapter,
            read: this.progressService.isChapterRead(chapter.id)
          }));
          this.exercises = foundLesson.exercises || [];
          break;
        }
      }
    });
  }

  getLessonTitle(): string {
    return this.lesson?.translations[this.currentLang]?.title ||
           this.lesson?.translations['en']?.title || '';
  }

  getLessonDescription(): string {
    return this.lesson?.translations[this.currentLang]?.description ||
           this.lesson?.translations['en']?.description || '';
  }

  getChapterTitle(chapter: DisplayChapter): string {
    return chapter.translations[this.currentLang]?.title ||
           chapter.translations['en']?.title || '';
  }

  getChapterDescription(chapter: DisplayChapter): string {
    return chapter.translations[this.currentLang]?.description ||
           chapter.translations['en']?.description || '';
  }

  getChapterContent(chapter: DisplayChapter): string {
    return chapter.translations[this.currentLang]?.content ||
           chapter.translations['en']?.content || '';
  }

  getExerciseTitle(exercise: Exercise): string {
    return exercise.translations[this.currentLang]?.title ||
           exercise.translations['en']?.title || '';
  }

  getExerciseDescription(exercise: Exercise): string {
    return exercise.translations[this.currentLang]?.description ||
           exercise.translations['en']?.description || '';
  }

  getExerciseCode(exercise: Exercise): string {
    return exercise.translations[this.currentLang]?.code ||
           exercise.translations['en']?.code || '';
  }

  getExerciseExpectedOutput(exercise: Exercise): string {
    return exercise.translations[this.currentLang]?.expected_output ||
           exercise.translations['en']?.expected_output || '';
  }

  markChapterAsRead(chapter: DisplayChapter) {
    if (!chapter.read) {
      this.progressService.markChapterAsRead(chapter.id);
      chapter.read = true;
    }
  }

  goBack() {
    this.router.navigate(['/lessons']);
  }

  goToIde(exercise?: Exercise) {
    if (this.lesson) {
      const queryParams: any = { lesson: this.lesson.id };
      if (exercise) {
        queryParams.exercise = exercise.id;
        queryParams.code = this.getExerciseCode(exercise);
      }
      this.router.navigate(['/ide'], { queryParams });
    }
  }
}