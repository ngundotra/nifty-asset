/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Context,
  Pda,
  PublicKey,
  Signer,
  TransactionBuilder,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  mapSerializer,
  struct,
  u8,
} from '@metaplex-foundation/umi/serializers';
import {
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  getAccountMetasAndSigners,
} from '../shared';
import {
  DelegateInput,
  DelegateInputArgs,
  getDelegateInputSerializer,
} from '../types';

// Accounts.
export type RevokeInstructionAccounts = {
  /** Asset account */
  asset: PublicKey | Pda;
  /** Current owner of the asset or delegate */
  signer?: Signer;
};

// Data.
export type RevokeInstructionData = {
  discriminator: number;
  delegateInput: DelegateInput;
};

export type RevokeInstructionDataArgs = { delegateInput: DelegateInputArgs };

export function getRevokeInstructionDataSerializer(): Serializer<
  RevokeInstructionDataArgs,
  RevokeInstructionData
> {
  return mapSerializer<RevokeInstructionDataArgs, any, RevokeInstructionData>(
    struct<RevokeInstructionData>(
      [
        ['discriminator', u8()],
        ['delegateInput', getDelegateInputSerializer()],
      ],
      { description: 'RevokeInstructionData' }
    ),
    (value) => ({ ...value, discriminator: 6 })
  ) as Serializer<RevokeInstructionDataArgs, RevokeInstructionData>;
}

// Args.
export type RevokeInstructionArgs = RevokeInstructionDataArgs;

// Instruction.
export function revoke(
  context: Pick<Context, 'identity' | 'programs'>,
  input: RevokeInstructionAccounts & RevokeInstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'asset',
    'AssetGtQBTSgm5s91d1RAQod5JmaZiJDxqsgtqrZud73'
  );

  // Accounts.
  const resolvedAccounts = {
    asset: {
      index: 0,
      isWritable: true as boolean,
      value: input.asset ?? null,
    },
    signer: {
      index: 1,
      isWritable: false as boolean,
      value: input.signer ?? null,
    },
  } satisfies ResolvedAccountsWithIndices;

  // Arguments.
  const resolvedArgs: RevokeInstructionArgs = { ...input };

  // Default values.
  if (!resolvedAccounts.signer.value) {
    resolvedAccounts.signer.value = context.identity;
  }

  // Accounts in order.
  const orderedAccounts: ResolvedAccount[] = Object.values(
    resolvedAccounts
  ).sort((a, b) => a.index - b.index);

  // Keys and Signers.
  const [keys, signers] = getAccountMetasAndSigners(
    orderedAccounts,
    'programId',
    programId
  );

  // Data.
  const data = getRevokeInstructionDataSerializer().serialize(
    resolvedArgs as RevokeInstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
