import { ArgsType, Field } from "@nestjs/graphql";
import { DocumentsWhereUniqueInput } from "./DocumentsWhereUniqueInput";

@ArgsType()
class FindOneDocumentsArgs {
  @Field(() => DocumentsWhereUniqueInput, { nullable: false })
  where!: DocumentsWhereUniqueInput;
}

export { FindOneDocumentsArgs };
