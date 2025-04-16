import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit ,OnDestroy  {
  items: CarouselItem[] = [
    { title: 'أطالس', link: '/atlas', background: 'bg1' },
    { title: 'مستخلصات', link: '/extracts', background: 'bg2' },
    { title: 'معاجم', link: '/dictionaries', background: 'bg3' },
    { title: 'موسوعات', link: '/encyclopedias', background: 'bg4' },
    { title: 'بيلوجراف', link: '/biography', background: 'bg5' },
    { title: 'تراجم', link: '/translations', background: 'bg6' },
    { title: 'الكتب السنوية', link: '/yearbooks', background: 'bg7' },
    { title: 'موجزات ارشادية', link: '/guidance-notes', background: 'bg8' },
  ];
  duplicatedItems: CarouselItem[] = [];
  visibleItems = 4;
  currentIndex = 0;
  currentTranslate = 0;
  moveInterval: any;

  ngOnInit(): void {
    this.setResponsiveItems();
    window.addEventListener('resize', this.setResponsiveItems.bind(this));
    this.duplicatedItems = [...this.items, ...this.items.slice(0, this.visibleItems)];
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    clearInterval(this.moveInterval);
    window.removeEventListener('resize', this.setResponsiveItems.bind(this));
  }

  setResponsiveItems() {
    const width = window.innerWidth;
    if (width < 576) {
      this.visibleItems = 1;
    } else if (width < 992) {
      this.visibleItems = 2;
    } else {
      this.visibleItems = 4;
    }

    // Recalculate duplicated items and reset translate to avoid bugs
    this.duplicatedItems = [...this.items, ...this.items.slice(0, this.visibleItems)];
    this.currentIndex = 0;
    this.currentTranslate = 0;
  }

  startAutoSlide() {
    this.moveInterval = setInterval(() => {
      this.slideNext();
    }, 4000);
  }

  slideNext() {
    this.currentIndex++;
    this.currentTranslate = this.currentIndex * (100 / this.visibleItems);

    if (this.currentIndex >= this.items.length + 1 - this.visibleItems) {
      setTimeout(() => {
        this.currentIndex = 0;
        this.currentTranslate = 0;
      }, 1000); // match transition duration
    }
  }
}
interface CarouselItem {
  title: string;
  link: string;
  background: string;
}