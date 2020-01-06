export interface IUser {
  id: number;
  firstname: string;
  lastname: string;
  isPro: boolean;
  businessName: string | null;
  currentBallance: number;
  image: string;
  isFraudster: boolean;
  dob: string;
  pob: string;
}
