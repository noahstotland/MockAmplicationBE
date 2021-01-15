import { ArgsType, Field } from "@nestjs/graphql";
import { DocumentsWhereInput } from "./DocumentsWhereInput";

@ArgsType()
class FindManyDocumentsArgs {
  @Field(() => DocumentsWhereInput, { nullable: true })
  where?: DocumentsWhereInput;
}

export { FindManyDocumentsArgs };
