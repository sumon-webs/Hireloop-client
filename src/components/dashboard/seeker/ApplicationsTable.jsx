"use client";

import React from 'react';
import { Table, Tooltip } from '@heroui/react';
import { Eye, FileText, ExternalLink, Mail, Briefcase } from 'lucide-react';

export default function ApplicationsTable({ applications }) {
  if (!applications || applications.length === 0) {
    return <p className="p-4 text-center text-gray-500">No applications found.</p>;
  }

  return (
    <Table aria-label="Applications table">
      <Table.ScrollContainer>
        <Table.Content>
          <Table.Header>
            <Table.Column>Applicant</Table.Column>
            <Table.Column>Job Info</Table.Column>
            <Table.Column>Apply Date</Table.Column>
            <Table.Column>Documents</Table.Column>
            <Table.Column align="center">Actions</Table.Column>
          </Table.Header>
          <Table.Body>
            {applications.map((app) => (
              <Table.Row key={app._id}>
                {/* Applicant Info */}
                <Table.Cell>
                  <div className="flex flex-col">
                    <span className="font-semibold">{app.fullName}</span>
                    <span className="text-xs text-neutral-500">{app.email}</span>
                  </div>
                </Table.Cell>

                {/* Job Info */}
                <Table.Cell>
                  <div className="flex flex-col">
                    <span className="font-medium text-primary">{app.jobTitle}</span>
                    <span className="text-xs text-neutral-500">{app.compnayName} • {app.jobType}</span>
                  </div>
                </Table.Cell>

                {/* Apply Date */}
                <Table.Cell>{new Date(app.applyDate).toLocaleDateString()}</Table.Cell>
                
                {/* Documents */}
                <Table.Cell>
                  <a 
                    href={app.resume} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-primary hover:underline flex items-center gap-1 text-sm"
                  >
                    <FileText size={16} /> View Resume
                  </a>
                </Table.Cell>

                {/* Actions */}
                <Table.Cell>
                  <div className="flex items-center gap-3 justify-center">
                    <Tooltip content={
                      <div className="max-w-xs p-2">
                        <p className="font-bold mb-1">Cover Letter:</p>
                        <p className="text-xs">{app.coverLetter}</p>
                      </div>
                    }>
                      <span className="text-default-400 cursor-pointer hover:text-primary">
                        <Mail size={18} />
                      </span>
                    </Tooltip>
                    
                    <Tooltip content="Visit Portfolio">
                      <a 
                        href={app.portfolio} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-default-400 hover:text-primary"
                      >
                        <ExternalLink size={18} />
                      </a>
                    </Tooltip>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}