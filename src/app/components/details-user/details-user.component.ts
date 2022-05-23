import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './details-user.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class DetailsUserComponent implements OnInit {

  @Input() recebeUsuario: any;

  constructor() { }

  ngOnInit(): void {
    // this.getUsuario(this.route.snapshot.paramMap.get('id'));
  }

}
