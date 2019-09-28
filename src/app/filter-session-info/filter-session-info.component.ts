import { Component,  Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-filter-session-info',
  templateUrl: './filter-session-info.component.html',
  styleUrls: ['./filter-session-info.component.css']
})
export class FilterSessionInfoComponent  {

  constructor(dialogRef: MatDialogRef<FilterSessionInfoComponent>,
    @Inject(MAT_DIALOG_DATA) data: string)
     { }



}
