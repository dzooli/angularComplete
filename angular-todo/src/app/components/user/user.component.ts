import {
  Component,
  OnInit,
  Input,
  signal,
  input,
  computed,
  output,
  Output,
  EventEmitter,
} from '@angular/core';
import { DUMMY_USERS } from '../../dunmmy-users';
import { type User } from '../../models/user.interface';
import { CardComponent } from '../shared/card/card.component';

@Component({
  selector: 'app-user',
  imports: [CardComponent],
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  // ! means, this will never be undefined (TypeScript)
  @Input({ required: true }) user!: User;
  @Input({ required: true }) selected: boolean = false;
  /* Alternative input definition using input function from Angular. A bit cleaner code. */
  // avatar = input.required<string>();
  // id = input.required<string>();
  // name = input.required<string>();

  // @Output() select = new EventEmitter<string>();
  // Alternative and more future-proof approach is using the output function. Creates a custom event we can emit.
  // We do not need to use Output decoreators anymore and the cration of EventEmitter is
  // also unnecessary with this possiblity.
  select = output<string>();

  selectedUser = signal(DUMMY_USERS[0]);

  /*
   as a getter. this property is usable without
   calling the function (like a property as usual)
  */
  get imagePath() {
    return 'users/' + this.user.avatar;
  }
  /* Using computed values */
  // imagePath = computed(() => {
  //   return 'users/' + this.avatar();
  // });

  ngOnInit(): void {}

  onSelectUser(e: Event) {
    let userid = (<HTMLButtonElement>e.target)?.getAttribute('data-userid');
    let foundUser = DUMMY_USERS.find((user) => user.id == userid);
    this.selectedUser.set(foundUser ? foundUser : DUMMY_USERS[0]);

    this.select.emit(this.selectedUser().id);
  }
}
