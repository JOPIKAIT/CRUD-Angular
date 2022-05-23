import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { FotosService } from 'src/app/services/fotos.service';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-edituser.component.html',
  styleUrls: ['./add-tutorial.component.css']
})
export class AddEditUserComponent implements OnInit {

  formAddUsuario!: FormGroup;
  isAddMode!: boolean;
  loading = false;
  submitted = false;
  id!: string;
  shortLink!: string;
  file: any;

  constructor(
    private fb: FormBuilder,
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private router: Router,
    private fileUploadService: FotosService
  ) { }

  get f() { return this.formAddUsuario.controls; }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    // password not required in edit mode
    const passwordValidators = [Validators.minLength(6)];
    if (this.isAddMode) {
      passwordValidators.push(Validators.required);
    }

    // const formOptions: AbstractControlOptions = { validators: MustMatch('password', 'confirmPassword') };

    this.formAddUsuario = this.fb.group({
      title: ['', Validators.required],
      nome: ['', Validators.required],
      apelido: ['', Validators.required],
      photo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      password: ['', [Validators.minLength(6), this.isAddMode ? Validators.required : Validators.nullValidator]],
      confirmPassword: ['', this.isAddMode ? Validators.required : Validators.nullValidator]

    })

    if (!this.isAddMode) {
      // alert("Aqui")
      this.tutorialService.get(this.id)
        .pipe(first())
        .subscribe(x => this.formAddUsuario.patchValue(x));
    }
  }

  onChange(event:any) {
    this.file = event.target.files[0];
  }

  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    this.fileUploadService.upload(this.file).subscribe(
      (event: any) => {
        if (typeof(event) === 'object') {

          // Short link via api response
          this.shortLink = event.link;
          this.loading = false; // Flag variable 
        }
      }
    );
  }

  saveUsuario(): void {

    this.submitted = true;
    this.alertService.clear();

    if (this.formAddUsuario.invalid) {
      return;
    }

    this.loading = true;

    if (this.isAddMode) {
      this.createUser();
    } else {
      this.updateUser();
    }

  }

  private createUser() {
    this.tutorialService.create(this.formAddUsuario.value).pipe(
      first()).subscribe(() => {
        this.alertService.success('Usuario registado', { keepAfterRouteChange: true });
        // this.router.navigate(['../'], relativeTo: this.route)
        this.router.navigate([''])
      })
      .add(() => this.loading = false);
  }

  private updateUser() {
    this.tutorialService.update(this.id, this.formAddUsuario.value).pipe(
      first()).subscribe(() => {
        this.alertService.success('Usuario atualizado', { keepAfterRouteChange: true });
        this.router.navigate([''])
      })
      .add(() => this.loading = false);
  }

}
