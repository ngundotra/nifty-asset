/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/kinobi-so/kinobi
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

// Accounts.
export type TransferInstructionAccounts = {
  /** Asset account */
  asset: PublicKey | Pda;
  /** Current owner of the asset or transfer delegate */
  signer?: Signer;
  /** The recipient of the asset */
  recipient: PublicKey | Pda;
  /** The asset defining the group, if applicable */
  group?: PublicKey | Pda;
};

// Data.
export type TransferInstructionData = { discriminator: number };

export type TransferInstructionDataArgs = {};

export function getTransferInstructionDataSerializer(): Serializer<
  TransferInstructionDataArgs,
  TransferInstructionData
> {
  return mapSerializer<
    TransferInstructionDataArgs,
    any,
    TransferInstructionData
  >(
    struct<TransferInstructionData>([['discriminator', u8()]], {
      description: 'TransferInstructionData',
    }),
    (value) => ({ ...value, discriminator: 7 })
  ) as Serializer<TransferInstructionDataArgs, TransferInstructionData>;
}

// Instruction.
export function transfer(
  context: Pick<Context, 'identity' | 'programs'>,
  input: TransferInstructionAccounts
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
    recipient: {
      index: 2,
      isWritable: false as boolean,
      value: input.recipient ?? null,
    },
    group: {
      index: 3,
      isWritable: false as boolean,
      value: input.group ?? null,
    },
  } satisfies ResolvedAccountsWithIndices;

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
  const data = getTransferInstructionDataSerializer().serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
