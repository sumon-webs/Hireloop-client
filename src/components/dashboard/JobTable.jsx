import React from 'react';
import { Table, Tooltip } from '@heroui/react';
// Importing standard icons for View, Edit, and Delete
import { Eye, Edit2, Trash2 } from 'lucide-react';

export default function JobsTable({ jobs }) {
  // Defensive check: Handle cases where jobs might be undefined or empty
  if (!jobs || jobs.length === 0) {
    return <p className="p-4 text-center text-gray-500">No jobs available.</p>;
  }

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Jobs List Table">
          <Table.Header>
            <Table.Column>Title</Table.Column>
            <Table.Column>Job Type</Table.Column>
            <Table.Column>Location</Table.Column>
            <Table.Column>Salary</Table.Column>
            <Table.Column>Experience</Table.Column>
            <Table.Column>Vacancies</Table.Column>
            <Table.Column>Status</Table.Column>
            {/* Added Actions Column Header */}
            <Table.Column align="center">Actions</Table.Column>
          </Table.Header>
          
          <Table.Body>
            {jobs.map((job) => (
              <Table.Row key={job._id}>
                <Table.Cell className="font-medium">{job.title}</Table.Cell>
                <Table.Cell>{job.jobType}</Table.Cell>
                <Table.Cell>{job.location}</Table.Cell>
                <Table.Cell>{job.salary}</Table.Cell>
                <Table.Cell>{job.experience}</Table.Cell>
                <Table.Cell>{job.vacancies}</Table.Cell>
                <Table.Cell>
                  <span className={job.status === "active" ? "text-success" : "text-danger"}>
                    {job.status}
                  </span>
                </Table.Cell>
                
                {/* Added Action Icons with Tooltips */}
                <Table.Cell>
                  <div className="relative flex items-center gap-3 justify-center">
                    <Tooltip content="View job details">
                      <span className="text-lg text-default-400 cursor-pointer active:opacity-50 hover:text-default-600 transition-colors">
                        <Eye size={18} />
                      </span>
                    </Tooltip>
                    <Tooltip content="Edit job">
                      <span className="text-lg text-default-400 cursor-pointer active:opacity-50 hover:text-warning transition-colors">
                        <Edit2 size={18} />
                      </span>
                    </Tooltip>
                    <Tooltip content="Delete job">
                      <span className="text-lg text-danger cursor-pointer active:opacity-50 hover:text-danger-600 transition-colors">
                        <Trash2 size={18} />
                      </span>
                    </Tooltip>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
      <Table.Footer />
    </Table>
  );
}