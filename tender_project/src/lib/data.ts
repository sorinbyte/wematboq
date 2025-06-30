// lib/data.ts

// lib/data.ts

export type UserRole = "admin" | "contractor" | "subcontractor";

export interface User {
  id: number;
  email: string;
  password?: string; // optional if you're not mocking auth
  role: UserRole;
  firstName: string;
  lastName: string;
  companyName?: string; // for contractors & subcontractors
  subcontractorId?: number; // link to subcontractor profile if relevant
  createdAt: string;
  uniqueId?: string; // for contractors & subcontractors
  companyAddress?: {
    country: string;
    cityState: string;
    addressLine: string;
  }; // for contractors & subcontractors
  phone?: string; // optional phone number
  jobTitle?: string; // optional job title for contractors
}

export const users: User[] = [
  {
    id: 1,
    email: "admin@yourapp.com",
    role: "admin",
    firstName: "Ana",
    lastName: "Admin",
    createdAt: "2025-06-01T08:00:00Z",
  },
  {
    id: 2,
    email: "mihai@contractor1.com",
    role: "contractor",
    firstName: "Mihai",
    lastName: "Ionescu",
    companyName: "ConstructDev SRL",
    uniqueId: "RO22334455",
    phone: "+40 700 000 001",
    jobTitle: "Project Manager",
    companyAddress: {
      country: "Romania",
      cityState: "București, Sector 1",
      addressLine: "Asta e o adresă de test",
    },
    createdAt: "2025-06-10T12:30:00Z",
  },
  {
    id: 3,
    email: "elena@sub1.com",
    role: "subcontractor",
    firstName: "Elena",
    lastName: "Popescu",
    companyName: "FinishPro Interiors",
    uniqueId: "RO56789012",
    companyAddress: {
      country: "Romania",
      cityState: "Cluj-Napoca, Cluj",
      addressLine: "Asta e o adresă de test",
    },
    subcontractorId: 5,
    createdAt: "2025-06-11T09:15:00Z",
  },
];

export const projectsData = [
  {
    id: "proj-1",
    projectname: "Northgate Complex",
    client: "Constructo S.A.",
    added: "15 Sep 2025",
    status: "closed",
    projectvalue: "€1M+",
    projectstart: "15 Jan 2025",
    projectend: "30 Sep 2025",
    address: {
      country: "Romania",
      city: "Cluj-Napoca",
      addressLine: "Bd. Eroilor 23"
    },  
    variantDetails: [
      { packagename: "Architecture", status: "Sent", author: "Gigel Ninel", created: "22 Apr 2025" },
      { packagename: "Electrical", status: "Draft", author: "Gigel Ninel", created: "22 Jun 2024" },
      { packagename: "Fire Safety", status: "Sent", author: "Gigel Ninel", created: "16 Jan 2024" }
    ]
  },
  {
    id: "proj-2",
    projectname: "Northgate Complex",
    client: "MegaStruct",
    added: "15 Mar 2025",
    status: "draft",
    offers: { available: 7, total: 10 },
    projectvalue: "< €100k",
    projectstart: "Q4 2024",
    projectend: "30 Sep 2025",
    address: {
      country: "Romania",
      city: "Cluj-Napoca",
      addressLine: "Bd. Eroilor 23"
    }, 
    variantDetails: [
      { packagename: "Plumbing", status: "Sent", author: "Gigel Ninel", created: "08 Jun 2024" },
      { packagename: "Architecture", status: "Draft", author: "Gigel Ninel", created: "10 Nov 2025" },
      { packagename: "Concrete", status: "Draft", author: "Gigel Ninel", created: "21 Aug 2024" }
    ]
  },
  {
    id: "proj-3",
    projectname: "Eastline Residentials",
    client: "ACME Corp",
    added: "02 Jun 2024",
    status: "closed",
    offers: { available: 6, total: 10 },
    projectvalue: "€500k–€1M",
    projectstart: "Q1 2024",
    projectend: "30 Sep 2025",
    address: {
      country: "Romania",
      city: "Cluj-Napoca",
      addressLine: "Bd. Eroilor 23"
    }, 
    variantDetails: [
      { packagename: "Plumbing", status: "Draft", author: "Gigel Ninel", created: "24 Apr 2024" },
      { packagename: "HVAC", status: "Sent", author: "Gigel Ninel", created: "31 Jan 2024" },
      { packagename: "Electrical", status: "Draft", author: "Gigel Ninel", created: "20 Dec 2025" }
    ]
  },
  {
    id: "proj-4",
    projectname: "Green Tower Offices",
    client: "BuildPro Inc.",
    added: "14 Feb 2025",
    status: "closed",
    offers: { available: 6, total: 10 },
    projectvalue: "€100k–€250k",
    projectstart: "Q2 2026",
    projectend: "30 Sep 2025",
    address: {
      country: "Romania",
      city: "Cluj-Napoca",
      addressLine: "Bd. Eroilor 23"
    }, 
    variantDetails: [
      { packagename: "Electrical", status: "Draft", author: "Gigel Ninel", created: "21 Oct 2025" },
      { packagename: "Architecture", status: "Draft", author: "Gigel Ninel", created: "10 Aug 2025" },
      { packagename: "HVAC", status: "Sent", author: "Gigel Ninel", created: "05 Nov 2025" }
    ]
  },
  {
    id: "proj-5",
    projectname: "Harborview Terminal",
    client: "NextPhase Group",
    added: "10 Aug 2024",
    status: "bidding",
    offers: { available: 2, total: 10 },
    projectvalue: "€1M+",
    projectstart: "Q2 2024",
    projectend: "30 Sep 2025",
    address: {
      country: "Romania",
      city: "Cluj-Napoca",
      addressLine: "Bd. Eroilor 23"
    }, 
    variantDetails: [
      { packagename: "Fire Safety", status: "Sent", author: "Gigel Ninel", created: "13 Nov 2025" },
      { packagename: "Concrete", status: "Sent", author: "Gigel Ninel", created: "13 Jul 2024" },
      { packagename: "HVAC", status: "Sent", author: "Gigel Ninel", created: "04 May 2025" }
    ]
  },
  {
    id: "proj-6",
    projectname: "Eastline Residentials",
    client: "Nordic Construct",
    added: "15 Sep 2024",
    status: "bidding",
    offers: { available: 6, total: 10 },
    projectvalue: "€100k–€250k",
    projectstart: "Q1 2024",
    projectend: "30 Sep 2025",
    address: {
      country: "Romania",
      city: "Cluj-Napoca",
      addressLine: "Bd. Eroilor 23"
    }, 
    variantDetails: [
      { packagename: "Fire Safety", status: "Draft", author: "Gigel Ninel", created: "15 Feb 2025" },
      { packagename: "Concrete", status: "Sent", author: "Gigel Ninel", created: "21 Apr 2024" },
      { packagename: "Architecture", status: "Draft", author: "Gigel Ninel", created: "26 Jul 2024" }
    ]
  },
  {
    id: "proj-7",
    projectname: "Skyline Business Hub",
    client: "Nordic Construct",
    added: "08 Dec 2024",
    status: "closed",
    offers: { available: 3, total: 10 },
    projectvalue: "€1M+",
    projectstart: "Q1 2026",
    projectend: "30 Sep 2025",
    address: {
      country: "Romania",
      city: "Cluj-Napoca",
      addressLine: "Bd. Eroilor 23"
    }, 
    variantDetails: [
      {
        packagename: "HVAC", available: "", format: "Standard", label: "Engineering", country: "RO", cat: "PKG-310", year: "14 Oct 2025",
        status: "Sent", author: "Gigel Ninel", created: "25 Nov 2024"
      },
      {
        packagename: "Fire Safety", available: "", format: "Standard", label: "Engineering", country: "RO", cat: "PKG-228", year: "25 Feb 2024",
        status: "Draft", author: "Gigel Ninel", created: "01 Apr 2025"
      },
      {
        packagename: "Electrical", available: "", format: "Standard", label: "Engineering", country: "RO", cat: "PKG-891", year: "24 Jul 2024",
        status: "Draft", author: "Gigel Ninel", created: "07 Oct 2025"
      }
    ]
  },
  {
    id: "proj-8",
    projectname: "Green Tower Offices",
    client: "Constructo S.A.",
    added: "11 Apr 2024",
    status: "closed",
    offers: { available: 8, total: 10 },
    projectvalue: "€500k–€1M",
    projectstart: "Q4 2026",
    projectend: "30 Sep 2025",
    address: {
      country: "Romania",
      city: "Cluj-Napoca",
      addressLine: "Bd. Eroilor 23"
    }, 
    variantDetails: [
      {
        packagename: "Architecture", available: "", format: "Standard", label: "Engineering", country: "RO", cat: "PKG-777", year: "27 Jun 2025",
        status: "Sent", author: "Gigel Ninel", created: "10 Jun 2025"
      },
      {
        packagename: "Concrete", available: "", format: "Standard", label: "Engineering", country: "RO", cat: "PKG-998", year: "28 Oct 2025",
        status: "Sent", author: "Gigel Ninel", created: "01 Feb 2024"
      },
      {
        packagename: "Plumbing", available: "", format: "Standard", label: "Engineering", country: "RO", cat: "PKG-195", year: "18 Jun 2025",
        status: "Sent", author: "Gigel Ninel", created: "26 Dec 2025"
      }
    ]
  },
  {
    id: "proj-9",
    projectname: "Green Tower Offices",
    client: "MegaStruct",
    added: "25 Nov 2024",
    status: "closed",
    offers: { available: 1, total: 10 },
    projectvalue: "€1M+",
    projectstart: "Q2 2025",
    projectend: "30 Sep 2025",
    address: {
      country: "Romania",
      city: "Cluj-Napoca",
      addressLine: "Bd. Eroilor 23"
    }, 
    variantDetails: [
      {
        packagename: "Electrical", available: "", format: "Standard", label: "Engineering", country: "RO", cat: "PKG-362", year: "23 Jan 2024",
        status: "Draft", author: "Gigel Ninel", created: "10 Oct 2025"
      },
      {
        packagename: "HVAC", available: "", format: "Standard", label: "Engineering", country: "RO", cat: "PKG-737", year: "04 Dec 2024",
        status: "Draft", author: "Gigel Ninel", created: "01 Dec 2025"
      },
      {
        packagename: "Architecture", available: "", format: "Standard", label: "Engineering", country: "RO", cat: "PKG-808", year: "25 Jun 2025",
        status: "Sent", author: "Gigel Ninel", created: "07 Jan 2024"
      }
    ]
  },
  {
    id: "proj-10",
    projectname: "Metro Center Upgrade",
    client: "Tecton Developers",
    added: "24 Aug 2024",
    status: "draft",
    offers: { available: 2, total: 10 },
    projectvalue: "< €100k",
    projectstart: "Q2 2024",
    projectend: "30 Sep 2025",
    address: {
      country: "Romania",
      city: "Cluj-Napoca",
      addressLine: "Bd. Eroilor 23"
    }, 
    variantDetails: [
      {
        packagename: "Architecture", available: "", format: "Standard", label: "Engineering", country: "RO", cat: "PKG-188", year: "14 Aug 2025",
        status: "Sent", author: "Gigel Ninel", created: "09 Mar 2025"
      },
      {
        packagename: "Concrete", available: "", format: "Standard", label: "Engineering", country: "RO", cat: "PKG-801", year: "25 Apr 2024",
        status: "Draft", author: "Gigel Ninel", created: "14 Mar 2024"
      },
      {
        packagename: "Electrical", available: "", format: "Standard", label: "Engineering", country: "RO", cat: "PKG-821", year: "17 Jul 2024",
        status: "Sent", author: "Gigel Ninel", created: "27 Mar 2024"
      }
    ]
  }
];

export const subcontractorsData = [
  {
    id: 1,
    companyName: "SC ElectroInstal SRL",
    uniqueId: "RO12345678",
    specialties: ["420", "440"],
    address: {
      addressLine: "Str. Electricității 10",
      city: "București",
      state: "Sector 3",
      country: "România",
    },
    contact: {
      firstName: "Ion",
      lastName: "Popescu",
      email: "ion.popescu@electroinstal.ro",
      phone: "+40 721 000 111",
    },
  },
  {
    id: 2,
    companyName: "Construct Alpha",
    uniqueId: "RO23456789",
    specialties: ["310", "320"],
    address: {
      addressLine: "Bd. Constructorilor 45",
      city: "Cluj-Napoca",
      state: "Cluj",
      country: "România",
    },
    contact: {
      firstName: "Maria",
      lastName: "Ionescu",
      email: "maria.ionescu@constructalpha.ro",
      phone: "+40 722 111 222",
    },
  },
  {
    id: 3,
    companyName: "Delta HVAC Solutions",
    uniqueId: "RO34567890",
    specialties: ["430", "410"],
    address: {
      addressLine: "Str. Ventilației 22",
      city: "Timișoara",
      state: "Timiș",
      country: "România",
    },
    contact: {
      firstName: "Alexandru",
      lastName: "Georgescu",
      email: "alex.georgescu@deltahvac.ro",
      phone: "+40 723 222 333",
    },
  },
  {
    id: 4,
    companyName: "GreenRoof Systems",
    uniqueId: "RO45678901",
    specialties: ["330", "340", "210"],
    address: {
      addressLine: "Str. Ecologiei 9",
      city: "Brașov",
      state: "Brașov",
      country: "România",
    },
    contact: {
      firstName: "Elena",
      lastName: "Marin",
      email: "elena.marin@greenroof.ro",
      phone: "+40 724 333 444",
    },
  },
  {
    id: 5,
    companyName: "FinishPro Interiors",
    uniqueId: "RO56789012",
    specialties: ["350", "360", "220"],
    address: {
      addressLine: "Calea Finisajelor 33",
      city: "Iași",
      state: "Iași",
      country: "România",
    },
    contact: {
      firstName: "Cristian",
      lastName: "Dumitrescu",
      email: "cristian.d@finishpro.ro",
      phone: "+40 725 444 555",
    },
  },
];

export const workCategories = [
  { value: "210", label: "Dezafectare" },
  { value: "220", label: "Pregătirea construcției" },
  { value: "310", label: "Construcții de bază" },
  { value: "320", label: "Structura" },
  { value: "330", label: "Fațade" },
  { value: "340", label: "Tâmplărie" },
  { value: "350", label: "Finisaje interioare" },
  { value: "360", label: "Alte construcții" },
  { value: "410", label: "Instalații sanitare" },
  { value: "420", label: "Instalații electrice" },
  { value: "430", label: "Încălzire, ventilație" },
  { value: "440", label: "Sisteme de comunicație" },
  { value: "450", label: "Automatizări" },
  { value: "460", label: "Alte instalații" },
  { value: "510", label: "Spații verzi" },
  { value: "520", label: "Drumuri și parcări" },
];

export const workCategoryStyles: Record<
  string,
  { bg: string; text: string; ring: string }
> = {
  "210": { bg: "bg-red-100", text: "text-red-800", ring: "ring-red-300" },
  "220": { bg: "bg-orange-100", text: "text-orange-800", ring: "ring-orange-300" },
  "310": { bg: "bg-yellow-100", text: "text-yellow-800", ring: "ring-yellow-300" },
  "320": { bg: "bg-green-100", text: "text-green-800", ring: "ring-green-300" },
  "330": { bg: "bg-teal-100", text: "text-teal-800", ring: "ring-teal-300" },
  "340": { bg: "bg-cyan-100", text: "text-cyan-800", ring: "ring-cyan-300" },
  "350": { bg: "bg-blue-100", text: "text-blue-800", ring: "ring-blue-300" },
  "360": { bg: "bg-indigo-100", text: "text-indigo-800", ring: "ring-indigo-300" },
  "410": { bg: "bg-purple-100", text: "text-purple-800", ring: "ring-purple-300" },
  "420": { bg: "bg-pink-100", text: "text-pink-800", ring: "ring-pink-300" },
  "430": { bg: "bg-rose-100", text: "text-rose-800", ring: "ring-rose-300" },
  "440": { bg: "bg-lime-100", text: "text-lime-800", ring: "ring-lime-300" },
  "450": { bg: "bg-emerald-100", text: "text-emerald-800", ring: "ring-emerald-300" },
  "460": { bg: "bg-fuchsia-100", text: "text-fuchsia-800", ring: "ring-fuchsia-300" },
  "510": { bg: "bg-sky-100", text: "text-sky-800", ring: "ring-sky-300" },
  "520": { bg: "bg-violet-100", text: "text-violet-800", ring: "ring-violet-300" },
};
