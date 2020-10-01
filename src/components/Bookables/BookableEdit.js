import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {queryCache, useMutation, useQuery} from "react-query";

import useFormState from "./useFormState";
import getData, {editItem, deleteItem} from "../../utils/api";

import BookableForm from "./BookableForm";
import PageSpinner from "../UI/PageSpinner";

export default function BookableEdit() {
  const {id} = useParams();
  const {data} = useBookable(id);
  const formState = useFormState(data);

  const [updateBookable, {
    isLoading: isUpdating,
    isError: isUpdateError,
    error: updateError
  }] = useUpdateBookable();

  const [deleteBookable, {
    isLoading: isDeleting,
    isError: isDeleteError,
    error: deleteError
  }] = useDeleteBookable();

  function handleDelete() {
    if (window.confirm("Are you sure you want to delete the bookable?")) {
      deleteBookable(formState.state);
    }
  }

  function handleSubmit() {
    updateBookable(formState.state);
  }

  if (isUpdateError || isDeleteError) {
    return <p>{updateError?.message || deleteError.message}</p>
  }

  if (isUpdating || isDeleting) {
    return <PageSpinner/>
  }

  return (
    <BookableForm
      formState={formState}
      handleSubmit={handleSubmit}
      handleDelete={handleDelete}
    />
  );
}

function useBookable(id) {
  return useQuery(
    ["bookable", id],
    () => getData(`http://localhost:3001/bookables/${id}`),
    {
      suspense: true,
      refetchOnWindowFocus: false,
      initialData: queryCache
        .getQueryData("bookables")
        ?.find(b => b.id === parseInt(id))
    }
  );
}

function useUpdateBookable() {
  const navigate = useNavigate();
  return useMutation(
    item => editItem(`http://localhost:3001/bookables/${item.id}`, item),
    {
      onSuccess: bookable => {
        updateBookablesCache(bookable);
        queryCache.setQueryData(["bookable", String(bookable.id)], bookable);
        navigate(`/bookables/${bookable.id}`);
      }
    }
  );
}

function updateBookablesCache(bookable) {
  const bookables = queryCache.getQueryData("bookables") || [];
  const bookableIndex = bookables.findIndex(b => b.id === bookable.id);

  if (bookableIndex !== -1) {
    bookables[bookableIndex] = bookable;
    queryCache.setQueryData("bookables", bookables);
  }
}

function useDeleteBookable () {
  const navigate = useNavigate();
  return useMutation(
    bookable => deleteItem(`http://localhost:3001/bookables/${bookable.id}`),
    {
      onSuccess: (response, bookable) => {
        const bookables = queryCache.getQueryData("bookables") || [];

        queryCache.setQueryData(
          "bookables",
          bookables.filter(b => b.id !== bookable.id)
        );

        navigate(`/bookables/${getIdForFirstInGroup(bookables, bookable) || ""}`);
      }
    }
  );
}

function getIdForFirstInGroup (bookables, excludedBookable) {
  const {id, group} = excludedBookable;
  const bookableInGroup = bookables.find(b => b.group === group && b.id !== id);
  return bookableInGroup?.id;
}