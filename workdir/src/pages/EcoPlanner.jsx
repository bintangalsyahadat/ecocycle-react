/* Updated EcoPlanner.jsx using CSS variable --main-color (#01A3B0) */

import Navbar from "../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import LoadingScreen from "./LoadingScreen";
import FooterPortal from "../components/footer/FooterPortal";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { createPlanner, fetchPlanner } from "../utils/api";

export default function EcoPlanner() {
  const { currentUser, userLoggedIn, loading } = useAuth();
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [creatingPlanner, setCreatingPlanner] = useState(false);

  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [totalCount, setTotalCount] = useState(0);
  const totalPages = Math.ceil(totalCount / pageSize);

  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const Spinner = () => (
    <div className="flex justify-center py-10">
      <div className="w-10 h-10 border-4 border-[var(--main-color)] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  async function fetchHistory() {
    setLoadingHistory(true);

    const data = await fetchPlanner(currentUser?.id, page, pageSize);
    if (!data) return;

    setHistory(data.result);
    setTotalCount(data?.result_info?.total_count || 0);

    setLoadingHistory(false);
  }

  useEffect(() => {
    if (currentUser?.id) fetchHistory();
  }, [page, currentUser]);

  async function createPlannerUser() {
    if (!selectedDate) return alert("Please select a date first!");

    setCreatingPlanner(true);
    try {
      await createPlanner({ date: selectedDate, partner_id: currentUser.id });
      setSelectedDate("");
      setShowModal(false);
      fetchHistory();
    } finally {
      setCreatingPlanner(false);
    }
  }

  const nextPage = () => {
    if (!loadingHistory && page < totalPages) setPage(page + 1);
  };

  const prevPage = () => {
    if (!loadingHistory && page > 1) setPage(page - 1);
  };

  return (
    <div className="relative">
      {LoadingScreen(loading || !currentUser)}

      <div className={`bg-[#F5F7FA] min-h-screen ${loading || !currentUser ? "hidden" : ""}`}>
        <Navbar />

        <div className="mx-auto max-w-7xl px-4 sm:px-4 lg:px-8 mt-6">

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="text-[var(--main-color)] text-3xl hover:opacity-70 transition"
            >
              <FaCircleChevronLeft className="text-xl text-[var(--main-color)]" />
            </button>

            <div>
              <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">EcoPlanner</h1>
              <p className="text-gray-500 text-sm">Let's schedule your waste selling!</p>
            </div>
          </div>

          <div className="px-4 mt-5">
            <button
              onClick={() => setShowModal(true)}
              className="w-full bg-[var(--main-color)] text-white font-semibold rounded-xl py-3 mt-6 hover:opacity-80 cursor-pointer shadow-md transition"
            >
              + Add New Planner
            </button>
          </div>

          {/* <div className="px-4 mt-5">
            <input
              type="text"
              placeholder="Search your EcoPlanner history..."
              className="w-full border-gray-300 rounded-xl px-4 py-3 text-gray-700 shadow-sm focus:ring-2 focus:ring-[var(--main-color)] focus:outline-none bg-white"
            />
          </div> */}

          <div className="px-4 mt-6">

            <div className="bg-white rounded-2xl shadow-md overflow-hidden order-2 lg:order-1 lg:col-span-2">

              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-[#E8F4F4] text-gray-700 uppercase text-sm font-semibold">
                      <th className="p-4">Date</th>
                      <th className="p-4">Transaction</th>
                      <th className="p-4">Points</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {loadingHistory ? (

                      <tr>
                        <td colSpan="4" className="text-center p-6">
                          <Spinner />
                        </td>
                      </tr>
                    ) : history?.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center p-6 text-gray-500">
                          No planner history found.
                        </td>
                      </tr>
                    ) : (
                      history?.map((item, i) => (
                        <tr key={i} className="border-b border-gray-200 px-3 hover:bg-gray-50 transition text-sm">
                          <td className="p-4 text-center font-medium">{item.date || "-"}</td>

                          <td className="p-4 font-medium text-gray-700 text-center">
                            <span className="text-gray-400 italic">
                              {item.purchase_transaction_id?.name || "No transaction"}
                            </span>
                          </td>

                          <td
                            className={`p-4 font-bold flex justify-center items-center gap-1 ${(item.point_rewarded ?? 0) < 0 ? "text-red-500" : "text-[var(--main-color)]"
                              }`}
                          >
                            <img src="/images/ecopoint/point.png" className="w-8" />
                            {item.point_rewarded ?? 0}
                          </td>

                          <td className="p-4 text-gray-600 text-center">
                            <span
                              className={`
                                inline-flex items-center rounded-md px-2 py-1 text-xs font-medium
                                inset-ring inset-ring-blue-700/10
                                ${
                                  item.state === "done"
                                    ? "bg-[var(--main-color)] text-white"
                                    : item.state === "expired"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-blue-50 text-blue-700"
                                }
                              `}
                            >
                              {item.state}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center py-4 gap-2 text-gray-600 bg-white">
                  <button
                    onClick={prevPage}
                    disabled={page === 1 || loadingHistory}
                    className={`p-2 rounded-xl transition ${page === 1 || loadingHistory ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"
                      }`}
                  >
                    <FaCircleChevronLeft className="text-xl text-[var(--main-color)]" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                    <button
                      key={num}
                      onClick={() => !loadingHistory && setPage(num)}
                      className={`px-4 py-2 rounded-xl font-semibold transition ${num === page ? "bg-[var(--main-color)] text-white shadow" : "hover:bg-gray-100"
                        }`}
                      disabled={loadingHistory}
                    >
                      {num}
                    </button>
                  ))}

                  <button
                    onClick={nextPage}
                    disabled={page === totalPages || loadingHistory}
                    className={`p-2 rounded-xl transition ${page === totalPages || loadingHistory
                      ? "opacity-40 cursor-not-allowed"
                      : "hover:bg-gray-100"
                      }`}
                  >
                    <FaCircleChevronRight className="text-xl text-[var(--main-color)]" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="h-20" />
        </div>

        <FooterPortal />
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Create New Planner</h2>

            <label className="text-gray-700 font-medium">Select Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="mt-2 w-full border rounded-xl px-4 py-2 bg-gray-50 shadow-sm focus:ring-2 focus:ring-[var(--main-color)] outline-none"
            />

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={createPlannerUser}
                disabled={creatingPlanner}
                className={`px-4 py-2 rounded-xl bg-[var(--main-color)] text-white font-semibold transition
                  ${creatingPlanner ? "opacity-60 cursor-not-allowed" : "hover:opacity-80"}
                `}
              >
                {creatingPlanner ? "Processing..." : "Create Planner"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
