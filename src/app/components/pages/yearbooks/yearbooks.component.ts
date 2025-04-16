import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../../services/supabase.service';
import { Book } from '../../../models/book';

@Component({
  selector: 'app-yearbooks',
  templateUrl: './yearbooks.component.html',
  styleUrls: ['./yearbooks.component.css']
})
export class YearbooksComponent implements OnInit{
  atlasBooks: Book[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    try {
      // Try both 'Atlas' and 'أطالس' to ensure we catch the category
      const books = await this.supabaseService.getBooksByCategory('الكتب السنوية') || 
                    await this.supabaseService.getBooksByCategory('Yearbooks');
      
      if (!books || books.length === 0) {
        this.errorMessage = 'No Atlas books found';
      } else {
        this.atlasBooks = books;
      }
    } catch (error) {
      console.error('Error fetching Atlas books:', error);
      this.errorMessage = 'Failed to load books';
    } finally {
      this.isLoading = false;
    }
  }
}
