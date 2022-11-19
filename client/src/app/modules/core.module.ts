import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
    imports: [
        CommonModule,
        BsDropdownModule.forRoot(),
        ToastrModule.forRoot({ // this module takes some configuration
          positionClass:'toast-bottom-right'
        })
        
    ],
    exports: [
        BsDropdownModule,
        ToastrModule
    ],
    declarations: [],
    providers: [],
})
export class CoreModule { }
