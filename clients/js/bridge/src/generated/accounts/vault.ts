/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Account,
  Context,
  Pda,
  PublicKey,
  RpcAccount,
  RpcGetAccountOptions,
  RpcGetAccountsOptions,
  assertAccountExists,
  deserializeAccount,
  gpaBuilder,
  publicKey as toPublicKey,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  mapSerializer,
  publicKey as publicKeySerializer,
  string,
  struct,
  u8,
} from '@metaplex-foundation/umi/serializers';
import {
  Discriminator,
  DiscriminatorArgs,
  State,
  StateArgs,
  getDiscriminatorSerializer,
  getStateSerializer,
} from '../types';

export type Vault = Account<VaultAccountData>;

export type VaultAccountData = {
  discriminator: Discriminator;
  state: State;
  bump: number;
  mint: PublicKey;
  assetBump: number;
};

export type VaultAccountDataArgs = {
  state: StateArgs;
  bump: number;
  mint: PublicKey;
  assetBump: number;
};

export function getVaultAccountDataSerializer(): Serializer<
  VaultAccountDataArgs,
  VaultAccountData
> {
  return mapSerializer<VaultAccountDataArgs, any, VaultAccountData>(
    struct<VaultAccountData>(
      [
        ['discriminator', getDiscriminatorSerializer()],
        ['state', getStateSerializer()],
        ['bump', u8()],
        ['mint', publicKeySerializer()],
        ['assetBump', u8()],
      ],
      { description: 'VaultAccountData' }
    ),
    (value) => ({ ...value, discriminator: Discriminator.Vault })
  ) as Serializer<VaultAccountDataArgs, VaultAccountData>;
}

export function deserializeVault(rawAccount: RpcAccount): Vault {
  return deserializeAccount(rawAccount, getVaultAccountDataSerializer());
}

export async function fetchVault(
  context: Pick<Context, 'rpc'>,
  publicKey: PublicKey | Pda,
  options?: RpcGetAccountOptions
): Promise<Vault> {
  const maybeAccount = await context.rpc.getAccount(
    toPublicKey(publicKey, false),
    options
  );
  assertAccountExists(maybeAccount, 'Vault');
  return deserializeVault(maybeAccount);
}

export async function safeFetchVault(
  context: Pick<Context, 'rpc'>,
  publicKey: PublicKey | Pda,
  options?: RpcGetAccountOptions
): Promise<Vault | null> {
  const maybeAccount = await context.rpc.getAccount(
    toPublicKey(publicKey, false),
    options
  );
  return maybeAccount.exists ? deserializeVault(maybeAccount) : null;
}

export async function fetchAllVault(
  context: Pick<Context, 'rpc'>,
  publicKeys: Array<PublicKey | Pda>,
  options?: RpcGetAccountsOptions
): Promise<Vault[]> {
  const maybeAccounts = await context.rpc.getAccounts(
    publicKeys.map((key) => toPublicKey(key, false)),
    options
  );
  return maybeAccounts.map((maybeAccount) => {
    assertAccountExists(maybeAccount, 'Vault');
    return deserializeVault(maybeAccount);
  });
}

export async function safeFetchAllVault(
  context: Pick<Context, 'rpc'>,
  publicKeys: Array<PublicKey | Pda>,
  options?: RpcGetAccountsOptions
): Promise<Vault[]> {
  const maybeAccounts = await context.rpc.getAccounts(
    publicKeys.map((key) => toPublicKey(key, false)),
    options
  );
  return maybeAccounts
    .filter((maybeAccount) => maybeAccount.exists)
    .map((maybeAccount) => deserializeVault(maybeAccount as RpcAccount));
}

export function getVaultGpaBuilder(context: Pick<Context, 'rpc' | 'programs'>) {
  const programId = context.programs.getPublicKey(
    'bridge',
    'BridgezKrNugsZwTcyAMYba643Z93RzC2yN1Y24LwAkm'
  );
  return gpaBuilder(context, programId)
    .registerFields<{
      discriminator: DiscriminatorArgs;
      state: StateArgs;
      bump: number;
      mint: PublicKey;
      assetBump: number;
    }>({
      discriminator: [0, getDiscriminatorSerializer()],
      state: [1, getStateSerializer()],
      bump: [2, u8()],
      mint: [3, publicKeySerializer()],
      assetBump: [35, u8()],
    })
    .deserializeUsing<Vault>((account) => deserializeVault(account))
    .whereField('discriminator', Discriminator.Vault);
}

export function findVaultPda(
  context: Pick<Context, 'eddsa' | 'programs'>,
  seeds: {
    /** The address of the mint account */
    mint: PublicKey;
  }
): Pda {
  const programId = context.programs.getPublicKey(
    'bridge',
    'BridgezKrNugsZwTcyAMYba643Z93RzC2yN1Y24LwAkm'
  );
  return context.eddsa.findPda(programId, [
    string({ size: 'variable' }).serialize('vault'),
    publicKeySerializer().serialize(seeds.mint),
  ]);
}

export async function fetchVaultFromSeeds(
  context: Pick<Context, 'eddsa' | 'programs' | 'rpc'>,
  seeds: Parameters<typeof findVaultPda>[1],
  options?: RpcGetAccountOptions
): Promise<Vault> {
  return fetchVault(context, findVaultPda(context, seeds), options);
}

export async function safeFetchVaultFromSeeds(
  context: Pick<Context, 'eddsa' | 'programs' | 'rpc'>,
  seeds: Parameters<typeof findVaultPda>[1],
  options?: RpcGetAccountOptions
): Promise<Vault | null> {
  return safeFetchVault(context, findVaultPda(context, seeds), options);
}
