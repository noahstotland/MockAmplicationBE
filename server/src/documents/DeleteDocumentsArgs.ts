import { ArgsType, Field } from "@nestjs/graphql";
import { DocumentsWhereUniqueInput } from "./DocumentsWhereUniqueInput";

@ArgsType()
class DeleteDocumentsArgs {
  @Field(() => DocumentsWhereUniqueInput, { nullable: false })
  where!: DocumentsWhereUniqueInput;
}

export { DeleteDocumentsArgs };
