import { getSplSystemProgramId } from '@metaplex-foundation/mpl-toolbox';
import {
  Context,
  OptionOrNullable,
  TransactionBuilder,
  none,
} from '@metaplex-foundation/umi';
import { TypedExtension, getExtensionSerializerFromType } from './extensions';
import { ExtensionInputArgs } from './generated';
import {
  UpdateInstructionAccounts,
  UpdateInstructionArgs,
  update as baseUpdate,
} from './generated/instructions/update';

export function update(
  context: Pick<
    Context,
    'eddsa' | 'identity' | 'payer' | 'programs' | 'transactions'
  >,
  input: UpdateInstructionAccounts &
    Omit<UpdateInstructionArgs, 'extension'> & { extension?: TypedExtension }
): TransactionBuilder {
  let extension: OptionOrNullable<ExtensionInputArgs> = none();

  if (input.extension) {
    const data = getExtensionSerializerFromType(input.extension.type).serialize(
      input.extension
    );
    extension = {
      extensionType: input.extension.type,
      length: data.length,
      data,
    };
  }

  return baseUpdate(context, {
    ...input,
    systemProgram: getSplSystemProgramId(context),
    extension,
  });
}