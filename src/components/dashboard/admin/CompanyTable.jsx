"use client";
import { updateAproval } from "@/lib/action/updateAproval";
import React from "react";

const CompanyTable = ({ companies }) => {
  // setCompanies স্টেট আপডেট করার জন্য পাস করতে হবে

  // ডিলিট ফাংশন
  const handleDelete = async (id) => {
    const data = await updateAproval(id, {
      status: "rejected",
    });
  };

  // অ্যাপ্রুভ ফাংশন
  const handleApprove = async (id) => {
    const data = await updateAproval(id, {
      status: "approved",
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (!companies || companies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-neutral-500 border border-neutral-800 rounded-2xl bg-[#121214]">
        <p>Currently, no company data is available to display.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-[#121214] border border-neutral-800 rounded-2xl shadow-lg">
      <table className="w-full text-left text-sm text-neutral-300">
        <thead className="text-xs uppercase bg-neutral-900/50 text-neutral-400">
          <tr>
            <th className="px-6 py-4">Company Name</th>
            <th className="px-6 py-4">Created At</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800">
          {companies.map((company) => (
            <tr
              key={company._id}
              className="hover:bg-neutral-800/30 transition"
            >
              <td className="px-6 py-4 font-medium text-white">
                {company.companyName}
              </td>
              <td className="px-6 py-4 text-neutral-400">
                {company.createData ? formatDate(company.createData) : "N/A"}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${
                    company.status === "approved"
                      ? "bg-emerald-950 text-emerald-400 border-emerald-500"
                      : company.status === "rejected"
                        ? "bg-rose-950 text-rose-400 border-rose-900"
                        : "bg-amber-950 text-amber-400 border-amber-900"
                  }`}
                >
                  {company.status}
                </span>
              </td>
              <td className="px-6 py-4 text-right space-x-3">
                {(company.status === "pending" ||
                  company.status === "rejected") && (
                  <button
                    onClick={() => handleApprove(company._id)}
                    className="text-emerald-500 hover:text-emerald-400 font-semibold text-xs transition"
                  >
                    Approve
                  </button>
                )}

                <button
                  onClick={() => handleDelete(company._id)}
                  className="text-rose-500 hover:text-rose-400 font-semibold text-xs transition"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyTable;
