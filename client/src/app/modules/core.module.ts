import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { TooltipModule } from 'ngx-bootstrap/tooltip';


@NgModule({
    imports: [
        CommonModule,
        BsDropdownModule.forRoot(),
        ToastrModule.forRoot({ // this module takes some configuration
          positionClass:'toast-bottom-right'
        }),
        TooltipModule.forRoot(),
        
    ],
    exports: [
        BsDropdownModule,
        ToastrModule,
        TooltipModule
    ],
    declarations: [],
    providers: [],
})
export class CoreModule { }
