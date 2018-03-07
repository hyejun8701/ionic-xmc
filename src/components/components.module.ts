import { NgModule } from '@angular/core';
import { TopComponent } from './top/top';
import { SharedTopComponent } from './shared-top/shared-top';
@NgModule({
	declarations: [TopComponent,
    SharedTopComponent],
	imports: [],
	exports: [TopComponent,
    SharedTopComponent]
})
export class ComponentsModule {}
