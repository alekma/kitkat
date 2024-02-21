import { Component, HostListener } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CatFactsService } from './services/cat-facts.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

interface CatFact {
  fact: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, MatButtonModule, MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  facts: CatFact[] = [];
  private initialLoad = true;
  private scrollDebounceTimer: any;

  constructor(private catFactsService: CatFactsService) {
    this.loadFacts(true);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    clearTimeout(this.scrollDebounceTimer);
    this.scrollDebounceTimer = setTimeout(() => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        this.loadFacts();
      }
    }, 100);
  }

  loadFacts(initialLoad: boolean = false) {
    const factsToLoad = initialLoad ? 15 : 3;

    for (let i = 0; i < factsToLoad; i++) {
      this.catFactsService.getFacts().subscribe((fact) => {
        if (!this.facts.some((item) => item.fact === fact)) {
          this.facts.push({ fact });
        }
      });
    }

    if (initialLoad) this.initialLoad = false;
  }
}
