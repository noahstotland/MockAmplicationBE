import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Documents } from "../api/documents/Documents";

type Props = { id: string };

export const DocumentsTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Documents,
    AxiosError,
    [string, string]
  >(["get-/api/documents", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/documents"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/documents"}/${id}`} className="entity-id">
      {data?.id && data?.id.length ? data.id : data?.id}
    </Link>
  );
};
