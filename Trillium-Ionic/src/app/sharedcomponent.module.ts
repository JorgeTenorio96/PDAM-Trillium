import {NgModule} from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { PostCardComponent } from './components/post-card/post-card.component'
@NgModule({
  declarations: [PostCardComponent],
  imports:[IonicModule],
  exports: [PostCardComponent]
})
export class SharedComponentModule{}
