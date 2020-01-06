export interface ITransaction {
  id: number;
  amount: number;
  payer: {
    firstname: string;
    lastname: string;
    businessName: string | null;
  };
  receiver: {
    firstname: string;
    lastname: string;
    businessName: string | null;
  };
  message: string;
  date: string;
  status: string;
  isPro: boolean;
}
