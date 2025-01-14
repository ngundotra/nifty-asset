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
import { Strategy, StrategyArgs, getStrategySerializer } from '../types';

// Accounts.
export type ResizeInstructionAccounts = {
  /** Asset account */
  asset: PublicKey | Pda;
  /** The authority of the asset */
  authority?: Signer;
  /** The account paying for the storage fees */
  payer?: PublicKey | Pda | Signer;
  /** The system program */
  systemProgram?: PublicKey | Pda;
};

// Data.
export type ResizeInstructionData = {
  discriminator: number;
  strategy: Strategy;
};

export type ResizeInstructionDataArgs = { strategy: StrategyArgs };

export function getResizeInstructionDataSerializer(): Serializer<
  ResizeInstructionDataArgs,
  ResizeInstructionData
> {
  return mapSerializer<ResizeInstructionDataArgs, any, ResizeInstructionData>(
    struct<ResizeInstructionData>(
      [
        ['discriminator', u8()],
        ['strategy', getStrategySerializer()],
      ],
      { description: 'ResizeInstructionData' }
    ),
    (value) => ({ ...value, discriminator: 17 })
  ) as Serializer<ResizeInstructionDataArgs, ResizeInstructionData>;
}

// Args.
export type ResizeInstructionArgs = ResizeInstructionDataArgs;

// Instruction.
export function resize(
  context: Pick<Context, 'identity' | 'payer' | 'programs'>,
  input: ResizeInstructionAccounts & ResizeInstructionArgs
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
    authority: {
      index: 1,
      isWritable: false as boolean,
      value: input.authority ?? null,
    },
    payer: {
      index: 2,
      isWritable: true as boolean,
      value: input.payer ?? null,
    },
    systemProgram: {
      index: 3,
      isWritable: false as boolean,
      value: input.systemProgram ?? null,
    },
  } satisfies ResolvedAccountsWithIndices;

  // Arguments.
  const resolvedArgs: ResizeInstructionArgs = { ...input };

  // Default values.
  if (!resolvedAccounts.authority.value) {
    resolvedAccounts.authority.value = context.identity;
  }
  if (!resolvedAccounts.payer.value) {
    resolvedAccounts.payer.value = context.payer;
  }
  if (!resolvedAccounts.systemProgram.value) {
    if (resolvedAccounts.payer.value) {
      resolvedAccounts.systemProgram.value = context.programs.getPublicKey(
        'systemProgram',
        '11111111111111111111111111111111'
      );
      resolvedAccounts.systemProgram.isWritable = false;
    }
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
  const data = getResizeInstructionDataSerializer().serialize(
    resolvedArgs as ResizeInstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
