import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from 'firebase/auth';

class AuthService {
  constructor() {
    this.auth = getAuth();
    this.googleProvider = new GoogleAuthProvider();
    this.githubProvider = new GithubAuthProvider();
  }

  login = providerName => {
    const provider = this.getProvider(providerName);
    return signInWithPopup(this.auth, provider);
  };

  getProvider(providerName) {
    switch (providerName) {
      case 'Google':
        return this.googleProvider;
      case 'Github':
        return this.githubProvider;
      default:
        throw new Error(`not supported provider: ${providerName}`);
    }
  }
}

export default AuthService;
