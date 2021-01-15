import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { DocumentsList } from "./DocumentsList";
import { CreateDocuments } from "./CreateDocuments";
import { Documents } from "./Documents";

export const DocumentsIndex = (): React.ReactElement => {
  useBreadcrumbs("/documents/", "Documents");

  return (
    <Switch>
      <PrivateRoute exact path={"/documents/"} component={DocumentsList} />
      <PrivateRoute path={"/documents/new"} component={CreateDocuments} />
      <PrivateRoute path={"/documents/:id"} component={Documents} />
    </Switch>
  );
};
