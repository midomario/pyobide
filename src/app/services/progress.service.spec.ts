import { TestBed } from '@angular/core/testing';
import { ProgressService } from './progress.service';

describe('ProgressService', () => {
  let service: ProgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgressService);
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should mark chapter as completed', () => {
    service.markChapterCompleted('chapter_001');
    expect(service.isChapterCompleted('chapter_001')).toBeTrue();
  });

  it('should mark chapter as read', () => {
    service.markChapterAsRead('chapter_001');
    expect(service.isChapterRead('chapter_001')).toBeTrue();
  });

  it('should return read chapters', () => {
    service.markChapterAsRead('chapter_001');
    service.markChapterAsRead('chapter_002');
    const read = service.getReadChapters();
    expect(read).toContain('chapter_001');
    expect(read).toContain('chapter_002');
  });

  it('should persist read progress in localStorage', () => {
    service.markChapterAsRead('chapter_001');
    service.markLevelCompleted('beginner');

    // Create new service instance to test loading
    const newService = new ProgressService();
    expect(newService.isChapterRead('chapter_001')).toBeTrue();
  });

  it('should return completed chapters', () => {
    service.markChapterCompleted('chapter_001');
    service.markChapterCompleted('chapter_002');
    const completed = service.getCompletedChapters();
    expect(completed).toContain('chapter_001');
    expect(completed).toContain('chapter_002');
  });

  it('should return completed levels', () => {
    service.markLevelCompleted('beginner');
    service.markLevelCompleted('intermediate');
    const completed = service.getCompletedLevels();
    expect(completed).toContain('beginner');
    expect(completed).toContain('intermediate');
  });

  it('should persist progress in localStorage', () => {
    service.markChapterCompleted('chapter_001');
    service.markLevelCompleted('beginner');

    // Create new service instance to test loading
    const newService = new ProgressService();
    expect(newService.isChapterCompleted('chapter_001')).toBeTrue();
    expect(newService.isLevelCompleted('beginner')).toBeTrue();
  });

  it('should reset progress', () => {
    service.markChapterCompleted('chapter_001');
    service.markLevelCompleted('beginner');
    service.markChapterAsRead('chapter_002');
    service.resetProgress();

    expect(service.isChapterCompleted('chapter_001')).toBeFalse();
    expect(service.isLevelCompleted('beginner')).toBeFalse();
    expect(service.isChapterRead('chapter_002')).toBeFalse();
    expect(service.getCompletedChapters()).toEqual([]);
    expect(service.getCompletedLevels()).toEqual([]);
    expect(service.getReadChapters()).toEqual([]);
  });
});