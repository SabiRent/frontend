import cedar from "@/assets/images/properties/cedar.png";
import emerald from "@/assets/images/properties/emerald.png";
import hillcrest from "@/assets/images/properties/hillcrest.png";
import maple from "@/assets/images/properties/maple.png";
import peace from "@/assets/images/properties/peace.png";
import sunshine from "@/assets/images/properties/sunshine.png";

export const properties = [
  {
    image: sunshine,
    name: "Sunshine Apartments",
    type: "Apartment Building",
    addressLine1: "12 Palm Street",
    addressLine2: "Gbagada, Lagos",
    units: 12,
    occupied: 9,
    vacant: 3,
  },
  {
    image: peace,
    name: "Peace Estate",
    type: "Residential Estate",
    addressLine1: "23 Unity Road",
    addressLine2: "Ikeja, Lagos",
    units: 16,
    occupied: 12,
    vacant: 4,
  },
  {
    image: hillcrest,
    name: "Hillcrest Apartments",
    type: "Apartment Building",
    addressLine1: "4 Johnson Avenue",
    addressLine2: "Yaba, Lagos",
    units: 8,
    occupied: 5,
    vacant: 3,
  },
  {
    image: cedar,
    name: "Cedar Court",
    type: "Apartment Building",
    addressLine1: "7 Green Drive",
    addressLine2: "Lekki, Lagos",
    units: 12,
    occupied: 10,
    vacant: 2,
  },
  {
    image: maple,
    name: "Maple Heights",
    type: "Apartment Building",
    addressLine1: "22 Admiralty Way",
    addressLine2: "Lekki Phase 1",
    units: 16,
    occupied: 14,
    vacant: 2,
  },
  {
    image: emerald,
    name: "Emerald Court",
    type: "Residential Apartment",
    addressLine1: "15 Wuse Zone 4",
    addressLine2: "Abuja",
    units: 8,
    occupied: 6,
    vacant: 2,
  },
];

export const upcomingPayments = [
  {
    tenant: "Judith Unanka",
    property: "Sunshine Apt.",
    unit: "Unit 2",
    dueDate: "Aug 17, 2026",
    amount: "N130,000",
    highlighted: true,
  },
  {
    tenant: "Lilian Anayo",
    property: "Cedar Court",
    unit: "Unit 7",
    dueDate: "Aug 27, 2026",
    amount: "N250,000",
    highlighted: false,
  },
  {
    tenant: "Emanuel Ugwoke",
    property: "Cedar Court",
    unit: "Unit 5",
    dueDate: "Sept 27, 2026",
    amount: "N280,000",
    highlighted: false,
  },
  {
    tenant: "Miracle Chike",
    property: "Cedar Court",
    unit: "Unit 7",
    dueDate: "Aug 27, 2026",
    amount: "N250,000",
    highlighted: false,
  },
];

export const recentActivities = [
  {
    activity: "Payment received from Jane Okoh",
    date: "June 17, 2026",
    amount: "N130,000",
  },
  {
    activity: "New tenant added: Tobe Aki",
    date: "May 27, 2026",
  },
  {
    activity: "New tenant added: Chuka Anaga",
    date: "May 03, 2026",
  },
  {
    activity: "Property Added - Franklass Estate",
    date: "Sept 27, 2025",
  },
  {
    activity: "Property Added - Franklass Estate",
    date: "Sept 27, 2025",
  },
];
