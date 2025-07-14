import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  imports: [],
  templateUrl: './title.html',
  styleUrls: ['./title.css']
})
export class Title {
  @Input()
  title = "";

  @Input()
  sub_title="";

  @Input()
  h3_title="";

  @Input()
  tit_pos="left";
  @Input()
  sub_tit_pos="left";
}
