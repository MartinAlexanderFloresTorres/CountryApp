// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Components
import { HeaderComponent } from './components/header/header.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [HeaderComponent, SearchBoxComponent, LoadingSpinnerComponent],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, SearchBoxComponent, LoadingSpinnerComponent],
})
export class SharedModule {}
