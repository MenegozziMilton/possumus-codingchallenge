import { Component } from '@angular/core';
import { Category } from '../../core/models/category.model';
import { TriviaService } from '../../core/rest/services/trivia.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  categories: Array<Category> = [];
  selectedCategoryId: number | undefined;
  selectedDifficulty: string | undefined;
  difficulties = ['easy' , 'medium' , 'hard'];
  icons = [
    'sports_esports', 'fitness_center', 'school', 'book', 'computer', 'music_note',
    'camera', 'local_dining', 'computer', 'gamepad', 'shopping_cart', 'home',
    'emoji_events', 'language', 'supervisor_account', 'shopping_basket',
    'create', 'movie', 'pets', 'groups', 'construction', 'thumb_up', 'access_alarm', 'alarm'
  ];

  constructor(
    public triviaService: TriviaService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadCategories();
    this.categories = this.categories.map((category) => ({
      ...category,
      icon: this.getRandomIcon()
    }));
  }

  getRandomIcon(): string {
    return this.icons[Math.floor(Math.random() * this.icons.length)];
  }

  async loadCategories(): Promise<void> {
    this.categories = await firstValueFrom(this.triviaService.getAllCategories());
  }

  selectCategory(categoryId: number) {
    this.selectedCategoryId = categoryId;
  }

  selectDifficulty(difficulty: string) {
    this.selectedDifficulty = difficulty;
  }
  
  startQuiz() {
    if (this.selectedCategoryId && this.selectedDifficulty) {
      this.router.navigate(['/questions', this.selectedCategoryId], {
        queryParams: {difficulty: this.selectedDifficulty},
      });
    }
  }
}
