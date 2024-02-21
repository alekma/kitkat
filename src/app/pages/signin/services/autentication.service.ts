import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { catchError, from, throwError } from 'rxjs';

type User = {
  email: string;
  password: string;
};

type FirebaseError = {
  code: string;
  message: string;
};

@Injectable({
  providedIn: 'root',
})
export class AutenticationService {
  currentUser$ = authState(this.auth);

  constructor(private auth: Auth) {}

  public signInWithEmailAndPassword(user: User) {
    return from(
      signInWithEmailAndPassword(this.auth, user.email, user.password)
    ).pipe(
      catchError((error: FirebaseError) =>
        throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
      )
    );
  }

  public logout() {
    return from(this.auth.signOut());
  }

  private translateFirebaseErrorMessage({ code, message }: FirebaseError) {
    if (code === 'auth/user-not-found') {
      return 'User not found.';
    }
    if (code === 'auth/invalid-credential') {
      return 'User not found.';
    }
    if (code === 'auth/wrong-password') {
      return 'User not found.';
    }
    if (code === 'auth/invalid-email') {
      return 'User not found.';
    }
    return message;
  }
}
