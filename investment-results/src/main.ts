import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// Bootstrapping AppModule ensures FormsModule (via UserInputModule) is loaded -> ngModel works with signals bridge.
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
