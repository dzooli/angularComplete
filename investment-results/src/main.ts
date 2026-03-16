import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

try {
    await bootstrapApplication(AppComponent);
} catch (error) {
    console.error(error);
}
