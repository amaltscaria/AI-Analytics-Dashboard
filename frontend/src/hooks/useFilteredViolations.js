import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useAuth } from "./useAuth";

export const useFilteredViolations = () => {
  const { token } = useAuth();
  const [allViolations, setAllViolations] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    droneId: "",
    date: "",
    violationType: "",
  });

  // Fetch all violations
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [violationsResponse, statsResponse] = await Promise.all([
        axios.get("http://localhost:3000/api/violations", {
          headers: { Authorization: `Bearer ${token}` },
          params: { limit: 1000 }, // Get all violations for client-side filtering
        }),
        axios.get("http://localhost:3000/api/violations/stats", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setAllViolations(violationsResponse.data.violations || []);
      setStats(statsResponse.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.response?.data?.error || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  // Filter violations based on current filters
  const filteredViolations = useMemo(() => {
    return allViolations.filter((violation) => {
      const matchesDrone =
        !filters.droneId || violation.droneId === filters.droneId;
      const matchesDate = !filters.date || violation.date === filters.date;
      const matchesType =
        !filters.violationType ||
        violation.violationType === filters.violationType;

      return matchesDrone && matchesDate && matchesType;
    });
  }, [allViolations, filters]);

  // Get available filter options
  const availableFilters = useMemo(() => {
    const droneIds = [...new Set(allViolations.map((v) => v.droneId))].sort();
    const dates = [...new Set(allViolations.map((v) => v.date))].sort();
    const violationTypes = [
      ...new Set(allViolations.map((v) => v.violationType)),
    ].sort();

    return { droneIds, dates, violationTypes };
  }, [allViolations]);

  // Calculate filtered stats
  const filteredStats = useMemo(() => {
    const totalViolations = filteredViolations.length;
    const violationsByType = [
      ...new Set(filteredViolations.map((v) => v.violationType)),
    ];
    const violationsByDrone = [
      ...new Set(filteredViolations.map((v) => v.droneId)),
    ];
    const violationsByDate = filteredViolations.reduce((acc, violation) => {
      const date = violation.date;
      const existing = acc.find((item) => item.date === date);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push({ date, count: 1 });
      }
      return acc;
    }, []);

    return {
      totalViolations,
      violationsByType: violationsByType.map((type) => ({
        type,
        count: filteredViolations.filter((v) => v.violationType === type)
          .length,
      })),
      violationsByDrone: violationsByDrone.map((droneId) => ({
        droneId,
        count: filteredViolations.filter((v) => v.droneId === droneId).length,
      })),
      violationsByDate
    };
  }, [filteredViolations]);

  return {
    violations: filteredViolations,
    allViolations,
    stats: filteredStats,
    originalStats: stats,
    loading,
    error,
    filters,
    setFilters,
    availableFilters,
    refreshData: fetchData,
  };
};
