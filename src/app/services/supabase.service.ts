import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, Session, User } from '@supabase/supabase-js';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://ndbwfeostqbwewxuuxwp.supabase.co', // replace with your Supabase project URL
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kYndmZW9zdHFid2V3eHV1eHdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1NDA2ODEsImV4cCI6MjA2MDExNjY4MX0.1KQOJSVwaL7tcbzywCgKTHIdaQ1IeTL5hf78DXEZf-E' // replace with your Supabase anon/public key
    );
  }

   // 🔹 Get the current session (if logged in)
   getSession(): Promise<{ data: { session: Session | null }, error: any }> {
    return this.supabase.auth.getSession(); // Explicitly typing the return value
  }
  async signUp(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password
    });
  
    if (error) {
      console.error('Error signing up:', error);
      return { user: null, session: null, error };
    }
  
    return { user: data.user, session: data.session, error: null };
  }
  
  // 🔹 Sign in the user
  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error('Error signing in:', error);
      return null;
    }

    const user: User | null = data?.user || null;
    const session: Session | null = data?.session || null;

    // Return the user and session objects
    return { user, session };
  }

  // 🔹 Sign out the user
  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    }
  }

  // 🔹 Get books by category
  async getBooksByCategory(category: string): Promise<Book[]> {
    const { data, error } = await this.supabase
      .from('books')
      .select('*')
      .eq('Category', category);

    if (error) {
      console.error('Error fetching books:', error);
      return [];
    }

    return data as Book[];
  }

  // 🔹 Get the latest 4 books (any category)
  async getLatestBooks(): Promise<Book[]> {
    const { data, error } = await this.supabase
      .from('books')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(4);

    if (error) {
      console.error('Error fetching latest books:', error);
      return [];
    }

    return data as Book[];
  }
  async addBook(book: Partial<Book>): Promise<boolean> {
    const { error } = await this.supabase.from('books').insert([book]);
    return !error;
  }
  async uploadImage(file: File): Promise<string | null> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `book-images/${fileName}`;
  
    const { error } = await this.supabase.storage
      .from('books') // 👈 this is your Supabase storage bucket name
      .upload(filePath, file);
  
    if (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  
    const { data } = this.supabase.storage
      .from('books')
      .getPublicUrl(filePath);
  
    return data.publicUrl;
  }
  async getAllBooks(): Promise<Book[]> {
    const { data, error } = await this.supabase.from('books').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error('Error loading books:', error);
      return [];
    }
    return data as Book[];
  }
  async deleteBook(bookId: number): Promise<boolean> {
    const { error } = await this.supabase.from('books').delete().eq('id', bookId);
    if (error) {
      console.error('Error deleting book:', error);
      return false;
    }
    return true;
  }
  async updateBook(bookId: number, updatedData: Partial<Book>): Promise<boolean> {
    const { error } = await this.supabase
      .from('books')
      .update(updatedData)
      .eq('id', bookId);
  
    if (error) {
      console.error('Error updating book:', error);
      return false;
    }
  
    return true;
  }
  // 🔹 Search books by title or author
  async searchBooks(query: string): Promise<Book[]> {
    const { data, error } = await this.supabase
      .from('books')
      .select('*')
      .or(`BookName.ilike.%${query}%,AuthorName.ilike.%${query}%`);      
  
    if (error) {
      console.error('Error searching books:', error);
      return [];
    }
  
    return data as Book[];
  }
  

}
