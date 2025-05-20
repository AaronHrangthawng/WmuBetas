import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Line from './models/Line.js'; // 👈 must end in .js
dotenv.config();


const lines = [
    {
      title: "F O U N D I N G L I N E",
      date: "L.E. - April 3, 1988 @ 12:45 AM",
      image: "",
      members: [
        "1. Juan De Dios Vega",
        "2. Eddie \"Pepe\" Balderramas",
        "3. Martin Camarillo"
      ],
      me: "Baltazar Medoza-Madrigal"
    },
    {
      title: "ALPHA LINE",
      date: "L.C. - October 21, 1988",
      members: [
        "4. Primo Garcia",
        "5. Marcos De La Rosa"
      ],
      me: "Juan De Dios Vega"
    },
    {
      title: "BETA LINE",
      date: "",
      members: [
        "6. Danny Martinez",
        "7. Julio Erazos"
      ],
      me: "Juan De Dios Vega"
    },
    {
      title: "GAMMA LINE",
      date: "L.C. - January 27, 1993 @ 11:45 PM",
      members: [
        "8. Henry \"Larajan\" Del Valle",
        "9. Aaron \"Ren\" Del Valle"
      ],
      me: "Juan De Dios Vega"
    },
    {
      title: "DELTA LINE",
      date: "April 4, 1993 @ 7 PM",
      members: [
        "10. Robert De Leon",
        "11. Robert Alonzo"
      ],
      me: "Henry and Aaron Del Valle"
    },
    {
      title: "EPSILON LINE",
      date: "December 15, 1993 @ 9:05:01 PM",
      members: [
        "12. Reymall \"Escojido\" Myles"
      ],
      me: "Bobby De Leon"
    },
    {
      title: "ZETA LINE",
      date: "L.M. - April 1994",
      members: [
        "13. Riad \"Ali\" Asmat",
        "14. Angel \"The Rican\" Lozada",
        "15. Mior Zaharin Mior \"Olin\""
      ],
      me: "Bobby De Leon and Robert Alonzo"
    },
    {
      title: "ETA LINE",
      date: "December 15, 1994",
      members: [
        "16. Barney \"Tun-Tun\" Rodriguez",
        "17. Gus Martinez",
        "18. Sam \"Cantinflas\" Warnock"
      ],
      me: "Bobby De Leon"
    },
    {
      title: "THETA LINE",
      date: "December 13, 1995",
      members: [
        "19. NA",
        "20. NA",
        "21. NA",
        "22. Celso \"Half-Pint\" Garza"
      ],
      me: "Robert Alonzo"
    },
    {
      title: "IOTA LINE",
      date: "The Resurrection - L.S.D.N. - April 17, 1999 @ 6:01:26 AM",
      members: [
        "23. Sam \"Cruceño\" Centellas",
        "24. Victor \"Agüeybana\" Rivera",
        "25. Steven \"El Principe\" Kapala",
        "26. Sammy \"Hatuey\" Publes",
        "27. Jose Alex \"Taino\" Diaz-Nunci",
        "28. Geo \"Sarpum\" Athappilly"
      ],
      me: "Angelo \"Cisco Kidd\" Cisneros and Reymall Myles"
    },
    {
        title: "KAPPA LINE",
        date: "E.X.O.D.U.S. - March 17, 2000 @ 10:16:13 PM",
        members: [
          "29. Rodolfo \"Calmado\" Martinez",
          "30. Orlando \"Martí\" Rodríguez"
        ],
        me: "Steven Kapala"
      },
      {
        title: "LAMBDA LINE",
        date: "S.D.I. - November 18, 2000 @ 4:53:20 AM",
        members: [
          "31. Gary \"El Ejemplo\" Galvan"
        ],
        me: "Geo Athappilly"
      },
      {
        title: "MU LINE",
        date: "B.U.T.C.H. - December 6, 2003 @ 4:35:31 AM",
        members: [
          "32. Ismael \"Mecanico\" Vargas"
        ],
        me: "Rudy Martinez"
      },
      {
        title: "NU LINE",
        date: "N.U.V.I.S.I.O.N. - June 18, 2004 @ 10:20:56 PM",
        members: [
          "33. Raul \"El Razon\" Galvan",
          "34. Steve \"El Padre\" Galvan"
        ],
        me: "Rudy Martinez",
        ame: "Gary Galvan and Sam Centellas"
      },
      {
        title: "XI LINE",
        date: "P.O.O.M. - December 4th, 2004 @ 2:54:50 AM",
        members: [
          "35. Ben \"Talaria\" Jackson"
        ],
        me: "Rudy Martinez",
        ame: "Ismael Vargas"
      },
      {
        title: "OMICRON LINE",
        date: "I.M.B. - December 10th, 2005 @ 3:23:12 AM",
        members: [
          "36. Jeph \"Pagtakas\" Barrios",
          "37. Adrian \"Amparo\" Martinez",
          "38. Milan \"Alquilo\" Bird"
        ],
        me: "Ismael Vargas",
        ame: "Ben Jackson and Geo Athappilly"
      },
      {
        title: "PI LINE",
        date: "S.N.A.K.T.A.T.K.. - March 29, 2008 @ 1:21:03 AM",
        members: [
          "39. Adarsh \"Shuuyou\" Anand",
          "40. William \"Taita\" Dunn-Sarmiento",
          "41. Arjun \"Indran\" Sarathy"
        ],
        me: "Jeph Barrios",
        ame: "Adrian Martinez & Milan Bird"
      },
      {
        title: "RHO LINE",
        date: "G.R.I.N.D. - March 22, 2009 @ 1:33:00 AM",
        members: [
          "42. Perris \"Tumbao\" Williams",
          "43. Martin \"Un-mei\" Bragalone",
          "44. Julio \"Lato\" Linares",
          "45. Marco \"P.R.\" Ferreira"
        ],
        me: "Jeph Barrios",
        ame: "Adrian Martinez"
      },
      {
        title: "SIGMA LINE",
        date: "U.H.F. CROSSED MARCH 26th, 2010 @ 4:34:35 AM",
        image: "",
        members: [
          "46. Eddie \"Ghazi\" Moses",
          "47. Raul \"Atrevido\" Lozano",
          "48. Luis \"Diestro\" Acajabon",
          "49. Brigido \"Relativo\" Acajabon",
          "50. Gustavo \"Galan\" Almanza"
        ],
        me: "William Dunn-Sarmiento",
        ame: "Milancito Bird"
      },
      {
        title: "TAU LINE",
        date: "T.R.I.U.M.P.H. CROSSED December 11, 2010 @ 2:48:49 AM",
        image: "",
        members: [
          "51. Robert \"Faux-Pas\" Jeffery",
          "52. Marcus \"Corifeo\" Jackson",
          "53. Alejandro \"Chano\" Huerta"
        ],
        me: "Eddie Moses",
        ame: "Marco Ferreira"
      },
      {
        title: "UPSILON LINE",
        date: "D.S.H. CROSSED December 9, 2011 @ 1:14:15 AM",
        members: [
          "54. Miguel \"Throth\" Gomez",
          "55. Miguel \"Entregado\" Flores",
          "56. Salomon \"Tonauac\" Caballero"
        ],
        me: "Robert Jeffery",
        ame: "Raul Lozano"
      },
      {
        title: "PHI LINE",
        date: "D.C.U.F. CROSSED November 30, 2014 @ 1:52:59 AM",
        image: "",
        members: [
          "57. Christopher \"Grandiose\" Moore",
          "58. Levi \"Iluminado\" Soto",
          "59. Kyle \"Veneno\" Wehrmeister",
          "60. Emanuel \"Xbalanque\" Magallon"
        ],
        me: "Raul Lozano",
        ame: "Gustavo Almanza"
      },
      {
        title: "CHI LINE",
        date: "X.M.E.N. CROSSED March 21, 2015 @ 1:10:05 AM",
        image: "",
        members: [
          "61. Gabe \"Legado\" Balderramas",
          "62. Jose \"Vencedor\" Alexis Mejia",
          "63. Jose \"Guerrero\" Antonio Camacho Reyes"
        ],
        me: "Salomon Caballero",
        ame: "Emanuel Magallon"
      },
      {
        title: "PSI LINE",
        date: "D.A.L.E. CROSSED October 24, 2015 @ 10:34:46 PM",
        image: "",
        members: [
          "64. Valentin \"Bandolero\" Rosas",
          "65. Jose \"Salvaje\" Rodriguez"
        ],
        me: "Levi Soto",
        ame: "Kyle Wehrmeister"
      },
      {
        title: "ALPHA ALPHA LINE",
        date: "G.M.F.B CROSSED April 16, 2016 @ 1:54:07 AM",
        image: "",
        members: [
          "66. Miguel \"Alquiles\" Paniagua",
          "67. Sergio \"Apoyo\" Garcia",
          "68. Oscar \"Invencible\" Rodarte",
          "69. Caesar \"Triunfador\" Rincon"
        ],
        me: "Levi Soto",
        ame: "Jose Alexis Mejia"
      },
      {
        title: "ALPHA BETA LINE",
        date: "RESILIENCE CROSSED March 31, 2017 @ 10:40:53 PM",
        image: "",
        members: [
          "70. Ivan \"Fortunato\" Salazar",
          "71. Andy \"Águila\" Garcia",
          "72. Gerardo \"Silencío\" Hernandez",
          "73. Caesar \"Zamar\" Ortiz",
          "74. Luis \"Hephaestus\" Carranza"
        ],
        me: "Jose \"Salvaje\" Rodriguez",
        ame: "Miguel \"Alquiles\" Paniagua"
      },
      {
        title: "ALPHA GAMMA LINE",
        date: "K.I.N.G.S CROSSED December 8, 2017 @ 11:36:11 PM",
        image: "",
        members: [
          "75. Fredrick \"Murciélago\" Dukhie",
          "76. Andres \"Pollux\" Diaz",
          "77. Carlos \"Implacable\" Rodriguez",
          "78. Juan \"Castor\" Diaz",
          "79. Daniel \"Ambessa\" Abraha"
        ],
        me: "Jose \"Vencedor\" Mejia",
        ame: "Andy \"Águila\" Garcia & Jose \"Salvaje\" Rodriguez"
      },
      {
        title: "ALPHA DELTA LINE",
        date: "A.P.H.P.S. CROSSED November 24, 2019 @ 12:12:12 AM",
        image: "",
        members: [
          "80. Luis \"Único\" Sanchez",
          "81. Alejandro \"Guardián\" Ortiz",
          "82. Valdomero \"Risueño\" Ruiz",
          "83. Eduardo \"Volador\" Perez"
        ],
        me: "Miguel \"Alquiles\" Paniagua",
        ame: "Carlos \"Implacable\" Rodriguez"
      },
      {
        title: "ALPHA EPSILON LINE",
        date: "1.N.F.1.N.1.T.E CROSSED May 1, 2021 @ 12:21:11 AM",
        members: [
          "84. Cristian \"Derivido\" Vasquez"
        ],
        me: "Eduardo \"Volador\" Perez",
        ame: "Juan \"Castor\" Diaz"
      },
      {
        title: "ALPHA ZETA LINE",
        date: "O.N.E.F.O.R.A.L.L. CROSSED April 22, 2023 @ 12:04:26 AM",
        members: [
          "85. Erik \"Unido\" Reyes"
        ],
        me: "Jose \"Guerrero\" Camacho",
        ame: "Jose \"Salvaje\" Rodriguez"
      },
      {
        title: "ALPHA ETA LINE",
        date: "E.E.C.C.U.S. CROSSED December 16th, 2023 @ 10:36:48 PM",
        image: "",
        members: [
          "86. Javier \"Erudito\" Carrillo",
          "87. Marcos \"Ares\" Gomez",
          "88. Adrian \"Visionario\" Flores",
          "89. Isaac \"El Araña\" Lussier",
          "90. Andy \"Sombreado\" Sustaita",
          "91. Joel \"Σmpulso\" Soto"
        ],
        me: "Carlos \"Implacable\" Rodriguez",
        ame: "Gabe \"Legado\" Balderramas & Eduardo \"Volador\" Perez"
      },
      {
        title: "ALPHA THETA LINE",
        date: "S.S.L.C.S.Y.O. CROSSED December 1st, 2024 @ 1:35:35 AM",
        image: "",
        members: [
          "92. Juan-Luis \"Creador\" Gutierrez",
          "93. Aaron \"Laimi\" Hrangthawng",
          "94. Juan \"Acción\" Moreno",
          "95. Kevin \"MilagroZ\" Parra",
          "96. Jose \"Viento\" Silva",
          "97. Jose \"Arrigado\" Perez",
          "98. Aaron \"Ascendente\" Lopez-Robles"
        ],
        me: "Andy \"Sombreado\" Sustaita",
        ame: "Javier \"Erudito\" Carrillo & Adrian \"Visionario\" Flores"
      }
    ];
    
    
    
  


async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // ✅ Automatically add sortOrder
    const linesWithSortOrder = lines.map((line, i) => ({
      ...line,
      sortOrder: i + 1
    }));

    await Line.deleteMany({});
    await Line.insertMany(linesWithSortOrder);

    console.log("✅ Lines collection seeded.");
    process.exit();
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
}

seed();