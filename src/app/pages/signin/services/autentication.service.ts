import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, catchError, from, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutenticationService {
  constructor(private auth: AngularFireAuth) {}

  signIn(params: SignIn): Observable<any> {
    return from(
      this.auth.signInWithEmailAndPassword(params.email, params.password)
    ).pipe(
      catchError((error: FirebaseError) =>
        throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
      )
    );
  }

  private translateFirebaseErrorMessage({ code, message }: FirebaseError) {
    if (code === 'auth/user-not-found') {
      return 'User not found.';
    }
    if (code === 'auth/wrong-password') {
      return 'User not found.';
    }
    return message;
  }
}

type SignIn = {
  email: string;
  password: string;
};

type FirebaseError = {
  code: string;
  message: string;
};
