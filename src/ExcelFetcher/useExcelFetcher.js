import React, { useEffect, useState } from "react";
import Papa from "papaparse";

const ENTITIES_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vT57zBNc5Bg6Oudh3NsGDutIq9ba3qpGssvWKHn2aSkg3OGBMA8MdEtVD9-6euqeYd-qMKpMW-KMBve/pub?gid=2083679397&single=true&output=csv";
const HOLDINGS_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vT57zBNc5Bg6Oudh3NsGDutIq9ba3qpGssvWKHn2aSkg3OGBMA8MdEtVD9-6euqeYd-qMKpMW-KMBve/pub?gid=0&single=true&output=csv";

const useExcelFetcher = () => {
  const [holdings, setHoldings] = useState(null);
  const [entities, setEntities] = useState(null);
  const [error, setError] = useState(null);
  const [holdingLoading, setHoldingLoading] = useState(true);
  const [entitiesLoading, setEntitiesLoading] = useState(true);

  useEffect(function fetchHoldings() {
    Papa.parse(HOLDINGS_URL, {
      download: true,
      header: true,
      complete: function (results) {
        setHoldings(results.data);
        setHoldingLoading(false);
      },
      error: function (err) {
        setError(true);
        setHoldingLoading(false);
        console.log("holdings", holdings);
        console.log(err);
      }
    });
  }, []);

  useEffect(function fetchEntities() {
    Papa.parse(ENTITIES_URL, {
      download: true,
      header: true,
      complete: function (results) {
        setEntities(results.data);
        setEntitiesLoading(false);
        console.log("entities", entities);
      },
      error: function (err) {
        setError(true);
        setEntitiesLoading(false);
        console.log(err);
      }
    });
  }, []);

  return {
    holdings,
    entities,
    error,
    loading: holdingLoading || entitiesLoading
  };
};

export default useExcelFetcher;
