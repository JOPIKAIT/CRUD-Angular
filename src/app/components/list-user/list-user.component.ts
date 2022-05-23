import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { first, Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { ExcellService } from 'src/app/services/excell.service';
import { TutorialService } from 'src/app/services/tutorial.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './list-user.component.html',
  styleUrls: ['./tutorials-list.component.css']
})
export class ListUserComponent implements OnInit {

  usuarios!: any[];
  statusUser: boolean = false;
  title: string = "Listagem de usuarios";
  isMainSel!: boolean;
  checkedCategoryList: any;
  primeiroNome: string = "";
  Usuario!: User;

  @ViewChild('htmlData') htmlData!: ElementRef;

  constructor(
    private tutorialService: TutorialService, 
    private router: Router, 
    private excelSevice: ExcellService
    ) { this.isMainSel = false; }

  ngOnInit(): void {
    this.tutorialService.getAll()
            .pipe(first())
            .subscribe(users => this.usuarios = users);
            
  }

  // allUsers(): void {
  //   this.tutorialService.getAll().subscribe(
  //     data => {
  //       this.usuarios = data;
  //     },
  //     erro => {
  //      console.error("Falha ao listar usuario", erro) ;
  //     }
  //   )
  // }

  getUserId(id: string): void{
    this.tutorialService.get(id).subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log("ERRO: ",error)
      }
    )
  }

  deleteUsers(id: number): void{
    this.tutorialService.deleteAll().subscribe(
      data => {
        console.log(data);
        this.router.navigate(['']);
        // this.allUsers();
      },
      error => {
        console.log(error)
      }
    )}

  deleteOne(id: string){
    this.tutorialService.delete(id).subscribe(
      data => {
        this.router.navigate(['']);
      },
      error => {
        console.log(error)
      }
    )
  }

  exportExcell(): void{
    this.excelSevice.exportAsExcelFile(this.usuarios, this.title)
  }

  public downloadAsPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('lista-de-usuarios.pdf');
    });
  }

  onCheckBoxChangeAll(){
    for(var i=0; i<=this.usuarios.length; i++){
      this.usuarios[i].isSelected = this.isMainSel;
    }
    // this.getCheckedItem();
  }

  isAllSelected(){
    this.isMainSel = this.usuarios.every(function(item: any){
      return item.isSelected == true;
    })
    // this.getCheckedItem();
  }

  getCheckedItem(){
    this.checkedCategoryList = [];
    for(var i=0; i<=this.usuarios.length; i++){
      if(this.usuarios[i].isSelected){
        this.checkedCategoryList.push(this.usuarios[i])
      }
      this.checkedCategoryList = JSON.stringify(this.checkedCategoryList);
    }
  }

  searchUser(valor: string){
  
    this.tutorialService.findByFirstName(valor).subscribe(
      data => {
        // console.log(data[0])
        for(let i=0; i<=this.usuarios.length; i++){
          if(this.usuarios[i] == data[valor]){
            console.log("Encontrado o nome: ",valor);
          }else{
            console.log("Nada encontrado");
          }
        }
        // this.Usuario.firstName = data;
      },
      error => {
        console.log(error);
      }
    )
  }

}
