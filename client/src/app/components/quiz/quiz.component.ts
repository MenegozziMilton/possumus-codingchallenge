import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TriviaService } from '../../core/rest/services/trivia.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  selectedCategoryId: string = '';
  selectedDifficulty: string = '';
  questions: any
  currentQuestionIndex: number = 0;
  currentQuestion: any = null;
  processedQuestions: any[] = [];
  totalScore: number = 0;
  showResults: boolean = false;
  nextEnabled = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private triviaService: TriviaService
  ) {}

  async ngOnInit(): Promise<void> {
    this.selectedCategoryId = this.route.snapshot.paramMap.get('categoryId') || '';
    this.selectedDifficulty = this.route.snapshot.queryParamMap.get('difficulty') || '';
    await this.loadQuestions();
  }

  async loadQuestions(): Promise<void> {
    try {
      const data = await firstValueFrom(
        this.triviaService.getQuestionsByCategory(this.selectedCategoryId, this.selectedDifficulty)
      );
      this.questions = this.processQuestions(data);
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    } catch (error) {
      console.error('Error loading questions:', error);
    }
  }

  processQuestions(questions: any[]): any[] {
    return questions.map((question) => {
      const allAnswers = [...question.incorrect_answers, question.correct_answer];
      const mingledAnswers = this.miggleArray(allAnswers);
      return {
        ...question,
        allAnswers: mingledAnswers,
        correctAnswer: question.correct_answer
      };
    });
  }

  miggleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  nextQuestion() {
    if (this.nextEnabled) {
      this.currentQuestionIndex++;
      if (this.currentQuestionIndex === 5) {
        this.onToggleResults();
      } else {
        this.currentQuestion = this.questions[this.currentQuestionIndex];
        this.nextEnabled = false;
      }
    }
  }

  onToggleResults(): void {
    this.showResults = !this.showResults;
  }

  selectAnswer(question: any, option: string) {
    this.nextEnabled = true;
    if (!question.selectedAnswer) {
      question.selectedAnswer = option;

      if (option === question.correctAnswer) {
        this.totalScore += 20;
      }
    }
  }

  exit() {
    this.router.navigate(['/']);
  }

  restartQuiz() {
    window.location.reload();
  }
}
