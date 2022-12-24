import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { Estudiante } from 'src/app/models/estudiante';
import { EstudianteService } from 'src/app/services/estudiante.service';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {

  estudiantes :Estudiante[] = []
  estudiante :Estudiante


  ngOnInit():void{
     this.obtenerEstudiantes()
  }

  constructor(
    private fb: FormBuilder,
    private servicioEstudiante: EstudianteService)
  
  {

  }

  estudianteForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    cedula: ['', [Validators.required]],
    correo: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    curso: ['', [Validators.required]],
  })

  obtenerEstudiantes(){
    this.servicioEstudiante.obtenerEstudiantes().pipe(
      map(changes =>
        changes.map(c =>
          ({ Id: c.payload.doc.id,
            Nombre : c.payload.doc.data()['nombre'],
            Apellido : c.payload.doc.data()['apellido'],
            Cedula: c.payload.doc.data()['cedula'],
            Correo: c.payload.doc.data()['correo'],
            Curso: c.payload.doc.data()['curso'],
            Telefono: c.payload.doc.data()['telefono'],
            Descripcion: c.payload.doc.data()['descripcion']
          })
        )
      )
    ).subscribe(data => {
      this.estudiantes = data;
      console.log(this.estudiantes)
    });
  }

  agregarActualizar(){
    if(this.estudiante == null){
      this.servicioEstudiante.agregarEstudiante(this.estudianteForm.value as Estudiante)
    }else{
      console.log(this.estudiante.Id)
      this.servicioEstudiante.actualizarEstudiante(this.estudiante.Id, this.estudianteForm.value as Estudiante)
    }
  }

  eliminar(id){
    this.servicioEstudiante.eliminarEstudiante(id)
  }

  agregar(){
    this.estudiante = null
    this.estudianteForm.controls['nombre'].setValue('')
    this.estudianteForm.controls['apellido'].setValue('')
    this.estudianteForm.controls['cedula'].setValue('')
    this.estudianteForm.controls['correo'].setValue('')
    this.estudianteForm.controls['curso'].setValue('')
    this.estudianteForm.controls['telefono'].setValue('')
    this.estudianteForm.controls['descripcion'].setValue('')
  }

  editar(estudiante:Estudiante){
    this.estudiante = estudiante
    this.estudianteForm.controls['nombre'].setValue(estudiante.Nombre)
    this.estudianteForm.controls['apellido'].setValue(estudiante.Apellido)
    this.estudianteForm.controls['cedula'].setValue(estudiante.Cedula)
    this.estudianteForm.controls['correo'].setValue(estudiante.Correo)
    this.estudianteForm.controls['curso'].setValue(estudiante.Curso)
    this.estudianteForm.controls['telefono'].setValue(estudiante.Telefono)
    this.estudianteForm.controls['descripcion'].setValue(estudiante.Descripcion)
  }



}
