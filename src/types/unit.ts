export interface Unit {
  unitName: string;
  property: string;
  status: "Occupied" | "Active" | "Vacant";
  tenant: string;
  rent: string;
}
