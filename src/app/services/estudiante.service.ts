import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Estudiante } from '../models/estudiante';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  constructor(private firestore: AngularFirestore ) { }


  obtenerEstudiantes() {
    return this.firestore.collection('Estudiantes').snapshotChanges()
  }

  agregarEstudiante(estudiante:Estudiante ) {
    return this.firestore.collection('Estudiantes').add(estudiante)
  }

  actualizarEstudiante(id: string,estudiante:Estudiante ) {
    console.log(estudiante)
    return this.firestore.collection('Estudiantes').doc(id).set(estudiante)
  }

  eliminarEstudiante(id:string) {
    return this.firestore.collection('Estudiantes').doc(id).delete()
  }


}
