const weekdayHours = {
  "@type": "OpeningHoursSpecification",
  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  opens: "08:00",
  closes: "16:30",
};

const data = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HomeAndConstructionBusiness",
      "@id": "#lake-city",
      name: "Sound View Window & Door Lake City Showroom",
      telephone: "+1-206-572-3411",
      address: {
        "@type": "PostalAddress",
        streetAddress: "12301 Lake City Way NE",
        addressLocality: "Seattle",
        addressRegion: "WA",
        postalCode: "98125",
        addressCountry: "US",
      },
      openingHoursSpecification: [weekdayHours],
    },
    {
      "@type": "HomeAndConstructionBusiness",
      "@id": "#queen-anne",
      name: "Sound View Window & Door West Queen Anne Showroom",
      telephone: "+1-206-402-4229",
      address: {
        "@type": "PostalAddress",
        streetAddress: "921 Elliott Ave W",
        addressLocality: "Seattle",
        addressRegion: "WA",
        postalCode: "98119",
        addressCountry: "US",
      },
      openingHoursSpecification: [weekdayHours],
    },
    {
      "@type": "HomeAndConstructionBusiness",
      "@id": "#bellevue",
      name: "Sound View Window & Door Bellevue Showroom",
      telephone: "+1-425-417-3005",
      address: {
        "@type": "PostalAddress",
        streetAddress: "13555 NE Bel Red Rd Ste 207",
        addressLocality: "Bellevue",
        addressRegion: "WA",
        postalCode: "98005",
        addressCountry: "US",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          description: "Open Monday through Friday by Appointment Only",
        },
      ],
    },
  ],
};

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
