import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import {TabsModule } from 'ngx-bootstrap/tabs';


@NgModule({
    imports: [
        CommonModule,
        BsDropdownModule.forRoot(),
        ToastrModule.forRoot({ // this module takes some configuration
          positionClass:'toast-bottom-right'
        }),
        TooltipModule.forRoot(),
        ModalModule.forRoot(),
        TabsModule.forRoot()
        
    ],
    exports: [
        BsDropdownModule,
        ToastrModule,
        TooltipModule,
        ModalModule,
        TabsModule
    ],
    declarations: [],
    providers: [],
})
export class CoreModule { }
