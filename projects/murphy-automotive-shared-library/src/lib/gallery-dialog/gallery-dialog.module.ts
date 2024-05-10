import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { GalleryDialogComponent } from './gallery-dialog.component';
import { GalleryDialogService } from './gallery-dialog.service';
import { GalleryModule } from '../gallery/gallery.module';

@NgModule({
    declarations: [
        GalleryDialogComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        GalleryModule
    ],
    providers: [
        GalleryDialogService
    ],
    exports: [
        GalleryDialogComponent
    ]
})
class GalleryDialogModule {}

export {
	GalleryDialogModule,
	GalleryDialogService
};
