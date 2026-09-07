const capaProgram = [
  // Miércoles · Salón D
  { day: "wednesday", room: "D", time: "09:00–09:30", name: "Apertura", company: "CAPA 2026", category: "GE", mode: "presencial", language: "ES" },
  { day: "wednesday", room: "D", time: "09:35–10:20", name: "UNSAM", company: "Universidad Nacional de San Martín", category: "UN", mode: "presencial", language: "ES" },
  { day: "wednesday", room: "D", time: "10:20–10:50", name: "Break", kind: "pause" },
  { day: "wednesday", room: "D", time: "10:50–11:20", name: "Aleph Farms", company: "Aleph Farms", category: "CA", mode: "remoto", language: "EN" },
  { day: "wednesday", room: "D", time: "12:00–12:30", name: "Eduardo Bittencourt", company: "Typcal", category: "FE", mode: "remoto", language: "PT", photo: "/speakers/eduardosydney.jpeg" },
  { day: "wednesday", room: "D", time: "12:30–14:00", name: "Lunch", kind: "pause" },
  { day: "wednesday", room: "D", time: "14:00–14:30", detailsId: "celeste-marin-calidad" },
  { day: "wednesday", room: "D", time: "14:35–15:05", detailsId: "mariana-sanchez-innovacion-vegetal" },
  { day: "wednesday", room: "D", time: "15:10–15:40", name: "Inês Palolo", company: "Sticta Biologicals", category: "FE", mode: "remoto", language: "ES" },
  { day: "wednesday", room: "D", time: "15:40–16:10", name: "Break", kind: "pause" },
  { day: "wednesday", room: "D", time: "16:10–16:40", name: "Eugenia Maciero", company: "Consultora", category: "PP", mode: "presencial", language: "ES" },
  { day: "wednesday", room: "D", time: "16:45–17:15", name: "BIBA", company: "BIBA", category: "PB", mode: "presencial", language: "ES" },
  { day: "wednesday", room: "D", time: "17:20–17:50", name: "Agustín Belloso", company: "Tomorrow Foods", category: "PB", mode: "presencial", language: "ES", photo: "/speakers/agustin_belloso.jpg" },

  // Miércoles · Salón E
  { day: "wednesday", room: "E", time: "09:35–10:20", name: "UADE", company: "Universidad Argentina de la Empresa", category: "UN", mode: "presencial", language: "ES" },
  { day: "wednesday", room: "E", time: "10:20–10:50", name: "Break", kind: "pause" },
  { day: "wednesday", room: "E", time: "10:50–11:20", detailsId: "chris-bryant-politica-publica", mode: "remoto" },
  { day: "wednesday", room: "E", time: "12:00–12:30", detailsId: "valeria-bosio-ingenieria-tejidos" },
  { day: "wednesday", room: "E", time: "12:30–14:00", name: "Lunch", kind: "pause" },
  { day: "wednesday", room: "E", time: "14:00–14:30", name: "Francisco Romero", company: "Amande", category: "PB", mode: "presencial", language: "ES" },
  { day: "wednesday", room: "E", time: "14:35–15:05", name: "Carla Molento", company: "UFPR · ZOOCEL / ABAC", category: "CA", mode: "presencial", language: "PT", country: "Brasil", photo: "/speakers/carla_molento.jpg" },
  { day: "wednesday", room: "E", time: "15:10–15:40", name: "Fabio Zon", company: "Chunk Foods", category: "FE", mode: "presencial", language: "ES", country: "Israel", photo: "/speakers/fabio_zon.jpg" },
  { day: "wednesday", room: "E", time: "15:40–16:10", name: "JBS", company: "JBS", category: "GE", mode: "presencial", language: "ES" },
  { day: "wednesday", room: "E", time: "16:45–17:15", detailsId: "pancho-pinero-plant-based-argentina" },
  { day: "wednesday", room: "E", time: "17:20–17:50", detailsId: "martin-blasco-escalado-bioprocesos" },

  // Jueves · Salón D
  { day: "thursday", room: "D", time: "09:00–09:30", name: "Tobias Leenaert", company: "ProVeg International", category: "AD", mode: "remoto", language: "EN" },
  { day: "thursday", room: "D", time: "09:35–10:20", name: "Cell Ag Argentina · Brasil · Chile", company: "Panel regional", category: "CA", mode: "presencial", language: "ES" },
  { day: "thursday", room: "D", time: "10:20–10:50", name: "Break", kind: "pause" },
  { day: "thursday", room: "D", time: "10:50–11:55", name: "Dr. Michael Greger", company: "NutritionFacts.org", category: "AD", mode: "remoto", language: "EN" },
  { day: "thursday", room: "D", time: "12:00–12:30", detailsId: "celina-moreno-marco-regulatorio" },
  { day: "thursday", room: "D", time: "12:30–14:00", name: "Lunch", kind: "pause" },
  { day: "thursday", room: "D", time: "14:00–14:30", detailsId: "martin-sabatini-fermentacion" },
  { day: "thursday", room: "D", time: "14:35–15:05", name: "Lucía Cragnza", company: "Sartorius", category: "IS", mode: "presencial", language: "ES", photo: "/speakers/fotoLC.jpg" },
  { day: "thursday", room: "D", time: "15:10–15:40", detailsId: "maria-laura-matos-bioprocesos" },
  { day: "thursday", room: "D", time: "15:40–16:10", name: "Believer Meats", company: "Believer Meats", category: "CA", mode: "presencial", language: "EN" },
  { day: "thursday", room: "D", time: "16:10–16:40", name: "Clúster de Proteínas Vegetales", company: "Clúster de Proteínas Vegetales", category: "PB", mode: "presencial", language: "ES" },

  // Jueves · Salón E
  { day: "thursday", room: "E", time: "09:35–10:20", name: "UNAHUR", company: "Universidad Nacional de Hurlingham", category: "UN", mode: "presencial", language: "ES" },
  { day: "thursday", room: "E", time: "10:20–10:50", name: "Break", kind: "pause" },
  { day: "thursday", room: "E", time: "10:50–11:20", detailsId: "rodrigo-ledesma-bioproduccion" },
  { day: "thursday", room: "E", time: "11:25–11:55", name: "Onego Bio", company: "Onego Bio", category: "FE", mode: "remoto", language: "EN" },
  { day: "thursday", room: "E", time: "12:00–12:30", detailsId: "bruno-rosolem-cashew" },
  { day: "thursday", room: "E", time: "12:30–14:00", name: "Lunch", kind: "pause" },
  { day: "thursday", room: "E", time: "14:00–14:30", name: "Juan Martín Oteiza", company: "CIATI", category: "IS", mode: "presencial", language: "ES", country: "Argentina", photo: "/speakers/martin_oteiza.JPG" },
  { day: "thursday", room: "E", time: "15:10–15:40", name: "Leonardo Vieira", company: "Future Cow", category: "FE", mode: "presencial", language: "PT", country: "Brasil" },
  { day: "thursday", room: "E", time: "16:10–16:40", detailsId: "kris-blanchard-biomanufactura" },
  { day: "thursday", room: "E", time: "16:45–17:15", name: "SENARA", company: "SENARA", category: "GE", mode: "presencial", language: "ES" },
  { day: "thursday", room: "E", time: "17:20–17:50", name: "MITA", company: "MITA", category: "GE", mode: "presencial", language: "ES" },

  // Viernes · Salón D
  { day: "friday", room: "D", time: "09:00–09:30", detailsId: "mark-post-mosa-meat" },
  { day: "friday", room: "D", time: "09:35–10:20", name: "UNLP · CIProVe", company: "Universidad Nacional de La Plata", category: "UN", mode: "presencial", language: "ES" },
  { day: "friday", room: "D", time: "10:20–10:50", name: "Break", kind: "pause" },
  { day: "friday", room: "D", time: "11:25–11:55", name: "The EVERY Company", company: "EVERY", category: "FE", mode: "remoto", language: "EN" },
  { day: "friday", room: "D", time: "12:00–12:30", name: "Prospectiva", company: "Prospectiva", category: "GE", mode: "presencial", language: "ES" },
  { day: "friday", room: "D", time: "12:30–14:00", name: "Lunch", kind: "pause" },
  { day: "friday", room: "D", time: "14:00–14:30", name: "Kerry", company: "Kerry", category: "IS", mode: "presencial", language: "ES" },
  { day: "friday", room: "D", time: "14:35–15:05", name: "DuPont", company: "DuPont", category: "IS", mode: "presencial", language: "ES" },
  { day: "friday", room: "D", time: "15:10–15:40", name: "NotCo", company: "NotCo", category: "PB", mode: "presencial", language: "ES" },
  { day: "friday", room: "D", time: "16:10–16:40", name: "Ingredion", company: "Ingredion", category: "IS", mode: "presencial", language: "ES" },

  // Viernes · Salón E
  { day: "friday", room: "E", time: "09:00–09:30", name: "Ajinomoto", company: "Ajinomoto", category: "CA", mode: "remoto", language: "EN" },
  { day: "friday", room: "E", time: "09:35–10:20", name: "Lorena Pinho · Alysson Soares", company: "GFI Brasil", category: "PP", mode: "presencial", language: "PT", country: "Brasil" },
  { day: "friday", room: "E", time: "10:20–10:50", name: "Break", kind: "pause" },
  { day: "friday", room: "E", time: "12:00–12:30", name: "David Kaplan", company: "Tufts University", category: "CA", mode: "remoto", language: "EN" },
  { day: "friday", room: "E", time: "12:30–14:00", name: "Lunch", kind: "pause" },
  { day: "friday", room: "E", time: "14:00–14:30", name: "Molinos", company: "Molinos", category: "IS", mode: "presencial", language: "ES" },
  { day: "friday", room: "E", time: "14:35–15:05", name: "PI", company: "PI", category: "IS", mode: "presencial", language: "ES" },
  { day: "friday", room: "E", time: "15:10–15:40", name: "Merck", company: "Merck", category: "IS", mode: "presencial", language: "ES" },
];

export default capaProgram;
