import { Card } from "@heroui/react";
import Link from "next/link";

export default function CompanyCard({ company }) {
  // Destructure with fallbacks to avoid crashes if any data is missing
  const {
    companyName = "Unknown Company",
    industry = "N/A",
    logoUrl = "https://placehold.co/48",
    description = "",
    location = "No Location Specified",
    employeeCount = "0",
    websiteUrl = "Nan"
  } = company || {};

  return (
    <Card className="max-w-lg w-full bg-[#121212] text-white p-6 rounded-xl border border-neutral-800">
      {/* Card Header */}
      <Card.Header className="flex justify-between items-start gap-4 pb-4">
        <div className="flex gap-4">
          <img 
            src={logoUrl} 
            alt={`${companyName} Logo`} 
            className="w-12 h-12 rounded-lg object-cover bg-white"
          />
          <div className="flex flex-col">
            <Card.Title className="text-xl font-semibold text-white">
              {companyName}
            </Card.Title>
            <Card.Description className="text-sm text-neutral-400 capitalize">
              {industry}
            </Card.Description>
          </div>
        </div>
        
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-950/50 text-emerald-400 border border-emerald-800/60 uppercase tracking-wider">
         {company.status}
        </span>
      </Card.Header>

      {/* Card Content */}
      <Card.Content className="py-2 text-sm text-neutral-300 leading-relaxed">
        {description}
      </Card.Content>

      {/* Card Footer */}
      <Card.Footer className="flex flex-col gap-4 pt-6 mt-4 border-t border-neutral-800/50 text-xs text-neutral-400">
        <div className="flex justify-between items-center w-full">
          {/* Location */}
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{location}</span>
          </div>

          {/* Employee Range */}
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>{employeeCount} range</span>
          </div>
        </div>

        {/* Website Link (Hidden if empty or "Nan") */}
        {websiteUrl && websiteUrl !== "Nan" && (
          <div className="w-full pt-2">
            <a 
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1.5 text-neutral-200 hover:text-white transition-colors font-medium"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              Visit Website
            </a>
          </div>
        )}
        <Link href={''}>
        Apply now
        </Link>
      </Card.Footer>
    </Card>
  );
}