import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { BookCategory } from '../../models/book-category';
import { Book } from '../../models/book';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  newBook: Partial<Book> = {
    BookName: '',
    AuthorName: '',
    Image: '',
    Description: '',
    URL: '',
    YoutubeLink: '',
    Category: ''
  };

  editingBookId: number | null = null;

  selectedImageFile: File | null = null;
  bookCategories = Object.values(BookCategory);
  books: Book[] = [];

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit() {
    this.loadBooks();
  }

  async loadBooks() {
    this.books = await this.supabaseService.getAllBooks();
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImageFile = input.files[0];
    }
  }

  async addBook() {
    try {
      if (this.selectedImageFile) {
        const uploadedUrl = await this.supabaseService.uploadImage(this.selectedImageFile);
        if (uploadedUrl) {
          this.newBook.Image = uploadedUrl;
        } else {
          alert('Failed to upload image.');
          return;
        }
      }
  
      if (this.editingBookId) {
        // Update existing book
        const updated = await this.supabaseService.updateBook(this.editingBookId, this.newBook);
        if (updated) {
          alert('Book updated!');
        } else {
          alert('Failed to update book.');
        }
      } else {
        // Insert new book
        const success = await this.supabaseService.addBook(this.newBook);
        if (success) {
          alert('Book added successfully!');
        } else {
          alert('Failed to add book.');
        }
      }
  
      this.resetForm();
      this.loadBooks();
  
    } catch (error) {
      console.error('Error saving book:', error);
    }
  }
  

  async deleteBook(bookId: number) {
    const confirmed = confirm('Are you sure you want to delete this book?');
    if (!confirmed) return;

    const success = await this.supabaseService.deleteBook(bookId);
    if (success) {
      alert('Book deleted.');
      this.loadBooks();
    } else {
      alert('Failed to delete book.');
    }
  }

  editBook(book: Book) {
    this.newBook = { ...book };
    this.editingBookId = book.id; // 🔥 THIS LINE IS IMPORTANT!
    this.selectedImageFile = null;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  resetForm() {
    this.newBook = {
      BookName: '',
      AuthorName: '',
      Image: '',
      Description: '',
      URL: '',
      YoutubeLink: '',
      Category: ''
    };
    this.editingBookId = null;
    this.selectedImageFile = null;
  }
  
}