import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import {
  FindOneDocumentsArgs,
  FindManyDocumentsArgs,
  DocumentsCreateArgs,
  DocumentsUpdateArgs,
  DocumentsDeleteArgs,
  Subset,
} from "@prisma/client";

@Injectable()
export class DocumentsService {
  constructor(private readonly prisma: PrismaService) {}
  findMany<T extends FindManyDocumentsArgs>(
    args: Subset<T, FindManyDocumentsArgs>
  ) {
    return this.prisma.documents.findMany(args);
  }
  findOne<T extends FindOneDocumentsArgs>(
    args: Subset<T, FindOneDocumentsArgs>
  ) {
    return this.prisma.documents.findOne(args);
  }
  create<T extends DocumentsCreateArgs>(args: Subset<T, DocumentsCreateArgs>) {
    return this.prisma.documents.create<T>(args);
  }
  update<T extends DocumentsUpdateArgs>(args: Subset<T, DocumentsUpdateArgs>) {
    return this.prisma.documents.update<T>(args);
  }
  delete<T extends DocumentsDeleteArgs>(args: Subset<T, DocumentsDeleteArgs>) {
    return this.prisma.documents.delete(args);
  }
}
