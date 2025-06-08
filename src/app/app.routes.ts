import { Routes } from '@angular/router';
import { VisualizerComponent } from './components/visualizer/visualizer.component';

export const routes: Routes = [
  {
    path: '**',
    component: VisualizerComponent,
  },
];
