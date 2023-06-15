import {NgModule} from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { PostCardComponent } from './components/post-card/post-card.component'
import { PostDetailsComponent } from './components/post-details/post-details.component'
import { CommonModule } from '@angular/common'
@NgModule({
  declarations: [PostCardComponent, PostDetailsComponent],
  imports:[IonicModule, CommonModule],
  exports: [PostCardComponent, PostDetailsComponent]
})
export class SharedComponentModule{}
