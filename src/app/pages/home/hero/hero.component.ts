import { AfterViewInit, Component } from '@angular/core';
import { SupabaseService } from '../../../services/supabase.service';
import { Book } from '../../../models/book';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  
})

export class HeroComponent  {
  slides: {
    imgs: string;
    title: string;
    subtitle: string;
    sub2:string;
    text: string;
  }[] = [
    {
      imgs: 'assets/images/hs6.png',
      title: 'الدليل المرجعي للمصادر المرئية',
      subtitle: ' الأول للمعرفة استكشف، تعلم، تميز',
      sub2:"مرجعك",
      text: 'في عالم يمضي بسرعة، نمنحك لحظة مع الحرف الهادئ'
    },
    {
      imgs: 'assets/images/hs1.png',
      title: 'الدليل المرجعي للمصادر المرئية',
      subtitle: ' موثوقة لباحثين طموحين',
      sub2:"مراجع",
      text: 'نظّم مراجعك، أنشئ قائمة مصادر، واستفد من أدوات الاستشهاد المتقدمة'
    },
    {
      imgs: 'assets/images/hs2.png',
      title: 'الدليل المرجعي للمصادر المرئية',
      subtitle: 'الباحثين والمهتمين بالعلم والمعرفة',
      sub2:"منصة",
      text: 'اختر تخصصك، وابحث في مراجع مختارة بعناية لكل مستوى علمي'
    }

  ];


  searchedBooks: Book[] = [];
  isSearching = false;
  searchQuery = '';


  constructor(private supabaseService: SupabaseService) {}

  onSearch() {
    if (!this.searchQuery.trim()) return;
  
    this.isSearching = true;
    this.supabaseService.searchBooks(this.searchQuery).then(results => {
      this.searchedBooks = results;
      this.isSearching = false;
    });
  }
  

}