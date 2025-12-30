import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LessonsService } from './lessons.service';
import { ProgressService } from './progress.service';

describe('LessonsService', () => {
  let service: LessonsService;
  let httpMock: HttpTestingController;
  let progressService: jasmine.SpyObj<ProgressService>;

  const mockLessonsData = {
    meta: {
      version: '1.0',
      language_default: 'en'
    },
    levels: {
      beginner: {
        lessons: [
          {
            id: 'lesson_001',
            translations: {
              en: { title: 'Python Basics', description: 'Learn basics' }
            },
            chapters: [
              { id: 'chapter_001', translations: { en: { title: 'What is Python?', description: 'Intro', content: 'Content' } } }
            ]
          }
        ]
      }
    }
  };

  beforeEach(() => {
    const progressSpy = jasmine.createSpyObj('ProgressService', [
      'isChapterCompleted', 'markChapterCompleted', 'isLevelCompleted', 'markLevelCompleted'
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LessonsService,
        { provide: ProgressService, useValue: progressSpy }
      ]
    });

    service = TestBed.inject(LessonsService);
    httpMock = TestBed.inject(HttpTestingController);
    progressService = TestBed.inject(ProgressService) as jasmine.SpyObj<ProgressService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load lessons and enrich with progress', () => {
    progressService.isChapterCompleted.and.returnValue(true);

    service.loadLessons().subscribe(data => {
      expect(data).toEqual(mockLessonsData);
      expect(service.getLessonsData()).toEqual(mockLessonsData);
      expect(data.levels.beginner.lessons[0].chapters[0].completed).toBeTrue();
    });

    const req = httpMock.expectOne('assets/data/lessons.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockLessonsData);
  });

  it('should get level keys', () => {
    service.loadLessons().subscribe(() => {
      expect(service.getLevelKeys()).toEqual(['beginner']);
    });

    httpMock.expectOne('assets/data/lessons.json').flush(mockLessonsData);
  });

  it('should get lessons for level', () => {
    service.loadLessons().subscribe(() => {
      const lessons = service.getLessonsForLevel('beginner');
      expect(lessons).toEqual(mockLessonsData.levels.beginner.lessons);
    });

    httpMock.expectOne('assets/data/lessons.json').flush(mockLessonsData);
  });

  it('should mark chapter completed and check level completion', () => {
    progressService.isChapterCompleted.and.returnValue(false);
    progressService.isLevelCompleted.and.returnValue(false);

    service.loadLessons().subscribe(() => {
      service.markChapterCompleted('chapter_001');

      expect(progressService.markChapterCompleted).toHaveBeenCalledWith('chapter_001');
      expect(progressService.markLevelCompleted).toHaveBeenCalledWith('beginner');
    });

    httpMock.expectOne('assets/data/lessons.json').flush(mockLessonsData);
  });
});