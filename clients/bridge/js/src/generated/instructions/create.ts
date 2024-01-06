/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import { findMetadataPda } from '@metaplex-foundation/mpl-token-metadata';
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
import { resolveBridgeAsset } from '../../hooked';
import { findVaultPda } from '../accounts';
import {
  PickPartial,
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  expectPublicKey,
  getAccountMetasAndSigners,
} from '../shared';

// Accounts.
export type CreateInstructionAccounts = {
  /** Asset account of the mint (pda of `['nifty::bridge::asset', mint pubkey]`) */
  asset?: PublicKey | Pda;
  /** Bridge account for the asset (pda of `['nifty::bridge::vault', mint pubkey]`) */
  vault?: PublicKey | Pda;
  /** Mint account of the token */
  mint: PublicKey | Pda;
  /** Metadata account of the collection */
  metadata?: PublicKey | Pda;
  /** Update authority of the metadata */
  updateAuthority?: Signer;
  /** Asset account of the collection (pda of `['nifty::bridge::asset', collection mint pubkey]`) */
  collection?: PublicKey | Pda;
  /** The account paying for the storage fees */
  payer?: Signer;
  /** System program */
  systemProgram?: PublicKey | Pda;
  /** Nifty Asset program */
  niftyAssetProgram?: PublicKey | Pda;
};

// Data.
export type CreateInstructionData = { discriminator: number };

export type CreateInstructionDataArgs = {};

export function getCreateInstructionDataSerializer(): Serializer<
  CreateInstructionDataArgs,
  CreateInstructionData
> {
  return mapSerializer<CreateInstructionDataArgs, any, CreateInstructionData>(
    struct<CreateInstructionData>([['discriminator', u8()]], {
      description: 'CreateInstructionData',
    }),
    (value) => ({ ...value, discriminator: 1 })
  ) as Serializer<CreateInstructionDataArgs, CreateInstructionData>;
}

// Extra Args.
export type CreateInstructionExtraArgs = { version: number };

// Args.
export type CreateInstructionArgs = PickPartial<
  CreateInstructionExtraArgs,
  'version'
>;

// Instruction.
export function create(
  context: Pick<Context, 'eddsa' | 'identity' | 'payer' | 'programs'>,
  input: CreateInstructionAccounts & CreateInstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'bridge',
    'BridgezKrNugsZwTcyAMYba643Z93RzC2yN1Y24LwAkm'
  );

  // Accounts.
  const resolvedAccounts = {
    asset: {
      index: 0,
      isWritable: true as boolean,
      value: input.asset ?? null,
    },
    vault: {
      index: 1,
      isWritable: true as boolean,
      value: input.vault ?? null,
    },
    mint: { index: 2, isWritable: false as boolean, value: input.mint ?? null },
    metadata: {
      index: 3,
      isWritable: false as boolean,
      value: input.metadata ?? null,
    },
    updateAuthority: {
      index: 4,
      isWritable: false as boolean,
      value: input.updateAuthority ?? null,
    },
    collection: {
      index: 5,
      isWritable: false as boolean,
      value: input.collection ?? null,
    },
    payer: {
      index: 6,
      isWritable: true as boolean,
      value: input.payer ?? null,
    },
    systemProgram: {
      index: 7,
      isWritable: false as boolean,
      value: input.systemProgram ?? null,
    },
    niftyAssetProgram: {
      index: 8,
      isWritable: false as boolean,
      value: input.niftyAssetProgram ?? null,
    },
  } satisfies ResolvedAccountsWithIndices;

  // Arguments.
  const resolvedArgs: CreateInstructionArgs = { ...input };

  // Default values.
  if (!resolvedAccounts.asset.value) {
    resolvedAccounts.asset = {
      ...resolvedAccounts.asset,
      ...resolveBridgeAsset(
        context,
        resolvedAccounts,
        resolvedArgs,
        programId,
        true
      ),
    };
  }
  if (!resolvedAccounts.vault.value) {
    resolvedAccounts.vault.value = findVaultPda(context, {
      mint: expectPublicKey(resolvedAccounts.mint.value),
    });
  }
  if (!resolvedAccounts.metadata.value) {
    resolvedAccounts.metadata.value = findMetadataPda(context, {
      mint: expectPublicKey(resolvedAccounts.mint.value),
    });
  }
  if (!resolvedAccounts.payer.value) {
    resolvedAccounts.payer.value = context.payer;
  }
  if (!resolvedAccounts.systemProgram.value) {
    resolvedAccounts.systemProgram.value = context.programs.getPublicKey(
      'splSystem',
      '11111111111111111111111111111111'
    );
    resolvedAccounts.systemProgram.isWritable = false;
  }
  if (!resolvedAccounts.niftyAssetProgram.value) {
    resolvedAccounts.niftyAssetProgram.value = context.programs.getPublicKey(
      'niftyAsset',
      'AssetGtQBTSgm5s91d1RAQod5JmaZiJDxqsgtqrZud73'
    );
    resolvedAccounts.niftyAssetProgram.isWritable = false;
  }
  if (!resolvedArgs.version) {
    resolvedArgs.version = 1;
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
  const data = getCreateInstructionDataSerializer().serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
