import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../../services/supabase.service';
import { Book } from '../../../models/book';

@Component({
  selector: 'app-last-books',
  templateUrl: './last-books.component.html',
  styleUrls: ['./last-books.component.css']
})
export class LastBooksComponent implements OnInit {
  latestBooks: Book[] = [];
  isLoading = true;

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    try {
      this.latestBooks = await this.supabaseService.getLatestBooks();
      console.log(this.latestBooks);
      
    } catch (error) {
      console.error('Error fetching latest books:', error);
    } finally {
      this.isLoading = false;
    }
  }
}