import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import * as gqlUserRoles from "../auth/gqlUserRoles.decorator";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import { DocumentsService } from "./documents.service";
import { DeleteDocumentsArgs } from "./DeleteDocumentsArgs";
import { FindManyDocumentsArgs } from "./FindManyDocumentsArgs";
import { FindOneDocumentsArgs } from "./FindOneDocumentsArgs";
import { Documents } from "./Documents";

@graphql.Resolver(() => Documents)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class DocumentsResolver {
  constructor(
    private readonly service: DocumentsService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Documents])
  @nestAccessControl.UseRoles({
    resource: "Documents",
    action: "read",
    possession: "any",
  })
  async documents(
    @graphql.Args() args: FindManyDocumentsArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Documents[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Documents",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Documents, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Documents",
    action: "read",
    possession: "own",
  })
  async documents(
    @graphql.Args() args: FindOneDocumentsArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Documents | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Documents",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Documents)
  @nestAccessControl.UseRoles({
    resource: "Documents",
    action: "delete",
    possession: "any",
  })
  async deleteDocuments(
    @graphql.Args() args: DeleteDocumentsArgs
  ): Promise<Documents | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}
