import * as React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { Formik } from "formik";
import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { Documents } from "../api/documents/Documents";
import { DocumentsCreateInput } from "../api/documents/DocumentsCreateInput";

const INITIAL_VALUES = {} as DocumentsCreateInput;

export const CreateDocuments = (): React.ReactElement => {
  useBreadcrumbs("/documents/new", "Create Documents");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Documents,
    AxiosError,
    DocumentsCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/documents", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/documents"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: DocumentsCreateInput) => {
      void create(values);
    },
    [create]
  );
  return (
    <>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form
          formStyle={EnumFormStyle.Horizontal}
          formHeaderContent={
            <FormHeader title={"Create Documents"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        ></Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
