export class Establishment {
  name: string;
  address: string;

  // API DATA
  id?: string;
  index?: number;
  guid?: string;
  picture?: string;
  email?: string;
  phone?: string;
  registered?: string;
  latitude?: string;
  longitude?: string;

  // FORM FIGMA DATA
  city?: string;
  bank?: string;
  account_type?: string;
  document_number?: string;
  agency?: string;
  agency_digit?: string;
  account?: string;
  account_digit?: string;
  automatic_withdrawal?: boolean;
}
